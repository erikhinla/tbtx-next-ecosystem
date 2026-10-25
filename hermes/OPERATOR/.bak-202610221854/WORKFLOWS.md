# WORKFLOWS

## 0. Before any change
1. `cp FILE FILE.bak-$(date +%Y%m%d%H%M)` (or copy to /root/backups/). Never delete without a backup. Never trash on Drive; archive.
2. For TBTX work: `cd /root/tbtx-brain && git pull --rebase --autostash`, read NOW.md.

## 1. Social batch to Postiz drafts
1. /new session. Read OPERATOR/RULES.md, hermes/COPY-RULES.md, COPY-STYLE-GUIDE.md, HERMES-PROOF-BRIEF.md.
2. Write each post to its own file in hermes/out/<batch>/ (write_file merge overwrites; one file per post).
3. humanizer skill, then copy_check.py until PASS. Read each line as Erik and as a stranger agency owner.
4. CTA: transformby10x.ai/proof in caption only; Instagram "link in bio". Times in PT.
5. Render visuals (workflow 2). Upload media and create posts in Postiz with type draft only. Never schedule or publish.
6. Verify: `postiz-posts FROM TO` lists each draft. Report count found vs intended, in AST and PT.

## 2. Video render (kinetic type)
1. spec.json: 3-4 short lines from approved copy, key word in *stars*, no URL.
2. `cd /root/tbtx-next-ecosystem/hermes && python3 kinetic.py spec.json out/<folder>/postN --check`, then without --check. Outputs postN_1x1.mp4 and postN_9x16.mp4, 30fps, silent.
3. If it reports "accent block", change bg so magenta text passes. Real audio only if Erik supplies it. hyperframes (v0.8.185) is installed for HTML-based motion; no AI video models.
4. Run DESIGN-GUIDE.md pre-flight; extract a frame (`ffmpeg -y -ss 2 -i f.mp4 -frames:v 1 f.png`) and look at it.

## 3. Copy check
`python3 /root/tbtx-next-ecosystem/hermes/copy_check.py draft.txt` exit 0 = PASS. Then manual check for rules it does not encode (Fog, desk, held, vague nouns, rhetorical questions, vendor names, stats).

## 4. Site deploy (production on the VPS)
1. Preview on Vercel only if needed (team erikhbush-8628s-projects).
2. Production: build on the VPS from the git branch Erik approved; nginx config /etc/nginx/sites-enabled/proof. PROOF runs in docker container flow-visualizer-telemetry.
3. Back up the current build/config, deploy, `nginx -t` before reload, verify `curl -sI https://transformby10x.ai/proof` = 200 and look at the page. Report evidence.
4. Commit and push only when Erik asked; push nothing else.

## 5. Thursday digest
- Cron job c4f5d47b8a49 "PROOF AI-ops weekly digest", schedule `0 22 * * 4` in server time (Europe). That is 1 PM PDT until Oct 25. When the server moves to CET (Oct 25) and PT moves to PST (Nov 1), recheck: the target is 1 PM PT; adjust the hour and verify with `hermes cron list`.
- Delivers to telegram:6384054989. Skills competitor-news-monitor, reddit-reading.

## 6. Reporting
Verified (evidence) / Not done (cause) / Needs Erik. Never mark untested work verified.
