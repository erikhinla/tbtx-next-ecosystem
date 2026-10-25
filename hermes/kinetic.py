#!/usr/bin/env python3
"""kinetic.py v5: entry point for TBTX/PROOF kinetic video. Delegates to the approved template
templates/kinetic-hyperframes/build.py (hyperframes render + mandatory frame_check gate).

  python3 kinetic.py                       # no spec: PROOF post 1, approved look, 9:16 + 1:1
  python3 kinetic.py spec.json [out_dir]   # template spec (see templates/kinetic-hyperframes/README.md)

Old v4 specs ({"lines":[...], "seconds":9, "bg":"#111111", "muted":...}) are converted: lines -> beats,
seconds -> duration (clamped 12-15), and bg / fg / muted are IGNORED (no flat #111, no grey support text:
the template's cinematic base and near-white type are the defaults now).
Exit code is non-zero if any render fails frame_check.py. A failed render must never be delivered.
The old PIL renderer (v4) is retired: it cannot pass the frame_check gate. Backup: kinetic.py.bak-*."""
import json, os, subprocess, sys
D = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(D, "templates", "kinetic-hyperframes", "build.py")
def convert(spec):
    if "lines" not in spec: return spec
    fxmap = {"climb": "grow", "rise": "rise", "slam": "rise", "pop": "rise", "stay": "rise", "split": "split"}
    beats = []
    for l in spec["lines"]:
        l = {"text": l} if isinstance(l, str) else l
        beats.append({"text": l["text"], "fx": fxmap.get(l.get("fx", "rise"), l.get("fx", "rise"))})
    new = {k: v for k, v in spec.items() if k not in ("lines", "seconds", "bg", "fg", "muted", "cta", "end", "action", "ads")}
    new["beats"] = beats
    new["duration"] = min(15.0, max(12.0, float(spec.get("seconds", 13.5))))
    for k in ("bg", "fg", "muted"):
        if k in spec: print(f"note: '{k}' ignored (approved base and near-white type are fixed)")
    return new
if __name__ == "__main__":
    spec = {}
    if len(sys.argv) > 1 and sys.argv[1].endswith(".json"): spec = convert(json.load(open(sys.argv[1])))
    if len(sys.argv) > 2: spec["out"] = os.path.abspath(sys.argv[2])
    tmp = "/tmp/kinetic_spec_%d.json" % os.getpid(); json.dump(spec, open(tmp, "w"))
    r = subprocess.run([sys.executable, BUILD, tmp])
    if r.returncode: sys.exit("kinetic.py: FAILED frame_check (or render). Do not deliver; fix the spec and re-run.")
