#!/usr/bin/env python3
"""Load the approved week into Postiz through its public API.

Dry run (default): checks the API key, maps the 7 channels, prints every post
with its final UTC time. Nothing is uploaded or created.
--go: uploads each film once and creates every post as SCHEDULED, in date
order. Posts whose slot has already passed go out from now + 10 minutes,
15 minutes apart. A state file makes re-runs skip posts already created.

Env: POSTIZ_API_KEY (Postiz > Settings > Public API)
     POSTIZ_API_URL  (default https://postiz.transformby10x.ai/api)
     CHANNEL_IDS     optional JSON {"x_personal": "<id>", ...} to override mapping
"""
import datetime as dt
import html
import json
import os
import sys
import time
import urllib.error
import urllib.request
import uuid

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST_URL = ("https://raw.githubusercontent.com/erikhinla/tbtx-next-ecosystem/"
                "claude/project-thread-wwukjs/social/2026-10-07/manifest.json")
STATE = os.path.expanduser("~/.postiz_week_2026-10-07.json")
BASE = os.environ.get("POSTIZ_API_URL", "https://postiz.transformby10x.ai/api").rstrip("/") + "/public/v1"
KEY = os.environ.get("POSTIZ_API_KEY", "")
DEFAULTS = {"x": {"who_can_reply_post": "everyone"}, "linkedin": {"post_as_images_carousel": False},
            "linkedin-page": {"post_as_images_carousel": False}}
ROLES = ["x_personal", "x_company", "li_personal", "li_page", "fb", "ig", "yt"]
PROVIDER = {"x_personal": "x", "x_company": "x", "li_personal": "linkedin", "li_page": "linkedin-page",
            "fb": "facebook", "ig": None, "yt": "youtube"}


def api(method, path, body=None, raw=None, ctype="application/json"):
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    for attempt in range(8):
        req = urllib.request.Request(BASE + path, data=data, method=method,
                                     headers={"Authorization": KEY, "Content-Type": ctype})
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                txt = r.read().decode()
                return json.loads(txt) if txt else {}
        except urllib.error.HTTPError as e:
            msg = e.read().decode()[:500]
            if e.code == 429:
                wait = min(600, 60 * (attempt + 1))
                print(f"  rate limited on {path}, waiting {wait}s", flush=True)
                time.sleep(wait)
                continue
            raise SystemExit(f"STOP: {method} {path} -> HTTP {e.code}: {msg}")
    raise SystemExit(f"STOP: {method} {path} still rate limited after 8 tries")


def load_manifest():
    local = os.path.join(HERE, "manifest.json")
    if os.path.exists(local):
        return json.load(open(local))
    with urllib.request.urlopen(MANIFEST_URL, timeout=60) as r:
        return json.loads(r.read().decode())


def map_channels(integrations):
    if os.environ.get("CHANNEL_IDS"):
        ids = json.loads(os.environ["CHANNEL_IDS"])
        by_id = {i["id"]: i for i in integrations}
        return {role: by_id[ids[role]] for role in ROLES}
    live = [i for i in integrations if not i.get("disabled")]
    found = {}

    def label(i):
        return f'{i.get("name", "")} {i.get("profile", "")}'.lower()

    xs = [i for i in live if i.get("identifier") == "x"]
    found["x_personal"] = [i for i in xs if "erikhbush" in label(i).replace(" ", "")]
    found["x_company"] = [i for i in xs if "trnsfrmby10x" in label(i) or "transform" in label(i)]
    found["ig"] = [i for i in live if i.get("identifier") in ("instagram", "instagram-standalone")]
    for role in ("li_personal", "li_page", "fb", "yt"):
        found[role] = [i for i in live if i.get("identifier") == PROVIDER[role]]
    bad = {r: [f'{i.get("name")} ({i.get("profile")})' for i in v] for r, v in found.items() if len(v) != 1}
    if bad:
        print("Connected channels:")
        for i in integrations:
            print(f'  {i.get("id")}  {i.get("identifier")}  {i.get("name")}  @{i.get("profile")}  disabled={i.get("disabled")}')
        raise SystemExit(f"STOP: channel mapping needs exactly one match per role, got {bad}. "
                         "Set CHANNEL_IDS to the right ids and re-run.")
    return {r: v[0] for r, v in found.items()}


def to_html(text):
    return "".join(f"<p>{html.escape(line, quote=False)}</p>" if line else "<p></p>"
                   for line in text.split("\n"))


def plan_times(posts, now):
    """Keep each slot unless it is already past; then that post and the rest of its day run 15 minutes apart."""
    floor = now + dt.timedelta(minutes=10)
    gap = dt.timedelta(minutes=15)
    prev = None
    out = []
    for p in sorted(posts, key=lambda p: p["date"]):
        t = dt.datetime.fromisoformat(p["date"].replace("Z", "+00:00"))
        if t < floor:
            t = floor if prev is None else max(floor, prev + gap)
            prev = t
        elif prev is not None and t.date() == prev.date():
            t = max(t, prev + gap)
            prev = t
        out.append((t, p))
    return out


def upload(url, cache):
    if url in cache:
        return cache[url]
    with urllib.request.urlopen(url, timeout=300) as r:
        blob = r.read()
    name = url.rsplit("/", 1)[1]
    boundary = uuid.uuid4().hex
    body = (f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{name}\"\r\n"
            f"Content-Type: video/mp4\r\n\r\n").encode() + blob + f"\r\n--{boundary}--\r\n".encode()
    res = api("POST", "/upload", raw=body, ctype=f"multipart/form-data; boundary={boundary}")
    if not res.get("path"):
        raise SystemExit(f"STOP: upload of {name} returned no path: {res}")
    cache[url] = {"id": res["id"], "path": res["path"]}
    print(f"  uploaded {name}", flush=True)
    return cache[url]


def main():
    go = "--go" in sys.argv
    if not KEY:
        raise SystemExit("STOP: POSTIZ_API_KEY is not set (Postiz > Settings > Public API).")
    m = load_manifest()
    ch = map_channels(api("GET", "/integrations"))
    print("Channels:")
    for r in ROLES:
        print(f'  {r:12} -> {ch[r].get("name")} (@{ch[r].get("profile")}, {ch[r].get("identifier")})')
    state = json.load(open(STATE)) if os.path.exists(STATE) else {"media": {}, "posts": {}}
    now = dt.datetime.now(dt.timezone.utc)
    plan = plan_times(m["posts"], now)
    print(f"\n{'GO' if go else 'DRY RUN'}: {len(plan)} posts, scheduled (not drafts)\n")
    done, failed = 0, []
    for t, p in plan:
        when = t.strftime("%Y-%m-%dT%H:%M:%S.000Z")
        first = p["text"].split("\n")[0][:60]
        tag = "already created" if p["key"] in state["posts"] else ""
        print(f'{when}  {p["channel"]:11} {p["media"].rsplit("/", 1)[1]:32} {first} {tag}', flush=True)
        if not go or p["key"] in state["posts"]:
            continue
        integ = ch[p["channel"]]
        try:
            media = upload(p["media"], state["media"])
            settings = {"__type": integ["identifier"], **DEFAULTS.get(integ["identifier"], {}), **p["settings"]}
            body = {"type": "schedule", "date": when, "shortLink": False, "tags": [],
                    "posts": [{"integration": {"id": integ["id"]},
                               "value": [{"content": to_html(p["text"]), "image": [media]}],
                               "settings": settings}]}
            res = api("POST", "/posts", body)
            state["posts"][p["key"]] = {"date": when, "response": res}
            done += 1
        except SystemExit as e:
            failed.append({"post": p["key"], "error": str(e)})
            print(f"  FAILED {p['key']}: {e}", flush=True)
        finally:
            json.dump(state, open(STATE, "w"), indent=1)
    if go:
        print(f"\nCreated {done}, already there {len(state['posts']) - done}, failed {len(failed)}")
        for f in failed:
            print(f"  {f['post']}: {f['error']}")
        sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
