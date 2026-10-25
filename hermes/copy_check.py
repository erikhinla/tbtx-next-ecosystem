#!/usr/bin/env python3
"""Flag copy-rule violations. Usage: copy_check.py FILE. Exit 1 on violations."""
import re, sys

RULES = [
    ("reader-directed you/your", r"\b(you|your|you're|youre|yourself|yours|you'll|you've|you'd)\b"),
    ("em dash", r"\u2014"),
    ("trademark symbol", r"[\u2122\u00ae\u2120\u00a9]"),
    ("banned word", r"\b(trace|tracing|leaks?|leaking|leaked|bleeds?|bleeding|breaks? down|completion review|walk with me|readout)\b"),
    ("Context Coordinator as title", r"\bcontext coordinator\b"),
    ("vague promise/puffery", r"\b(better way|smarter way|easier way|new way|right way|the secret|game[- ]?changer|next[- ]level|level up|unlock(s|ed|ing)?|supercharg\w*|seamless(ly)?|effortless(ly)?|revolutioni[sz]\w*|cutting[- ]edge|best[- ]in[- ]class|world[- ]class|skyrocket\w*|10x your|transform your|made (easy|simple)|there'?s a fix|we'?ve got (a|the) fix)\b"),
]

def main():
    if len(sys.argv) != 2:
        print(__doc__); return 2
    text = open(sys.argv[1], encoding="utf-8").read().replace("\u2019", "'")
    bad = 0
    lines = text.splitlines()
    first = next((i for i, l in enumerate(lines, 1) if l.strip()), None)
    for n, line in enumerate(lines, 1):
        st = line.strip()
        is_head = n == first or st.startswith("#") or bool(re.match(r"(?i)^\**\s*(hook|headline|title|subject)\s*[:\-]", st))
        if is_head and "?" in st:
            bad += 1
            print(f"line {n}: question mark in hook/headline | {st[:100]}")
        for name, pat in RULES:
            for m in re.finditer(pat, line, re.I):
                bad += 1
                print(f"line {n}: {name}: '{m.group(0)}' | {line.strip()[:100]}")
    print("FAIL: %d violation(s)" % bad if bad else "PASS")
    return 1 if bad else 0

if __name__ == "__main__":
    sys.exit(main())
