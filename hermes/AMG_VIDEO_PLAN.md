# AMG AI Video Production Plan for Hermes

American Mean Girls (americanmeangirls.com, non-nude femdom). Star: Princess Amber. Prepared for Erik H Bush, Oct 3, 2026. Hermes executes; Erik approves.

NOTE FOR HERMES: paths under /workspace/... refer to Grok Bot's machine. If you need those source stills or reference clips, they are in the Drive zip "AMG-files-2026-10-03.zip" (site/ folder) or ask Erik. For a job using your own cached source videos (/root/.hermes/cache/videos/), skip generation (sections 3) and go straight to post (section 4), QA (section 5) and delivery (section 6).

> **NON-NEGOTIABLES (check every one, every clip, every time)**
> 1. **Amber is never warm toward the men.** She never smiles at, laughs with, or enjoys them. She ignores them or is mildly annoyed. They are unworthy.
> 2. **No fake lip-sync.** Amber does not talk on camera unless real recorded audio of her exists for that line. Default: no dialogue. Use text cards or captions. Mouth closed in every prompt.
> 3. **Public teasers are strictly SFW.** Business suit, red stilettos, power framing. No nudity, no lingerie, no sexual acts, no sexual language in captions or hashtags.
> 4. **Only approved media ships.** Rejected forever: corridor v1 (amber-corridor.mp4, princess_amber_teaser_1_corridor), boardroom, elevator and stiletto teasers (all sizes), princess_amber_teaser_1 through 4. A new clip enters APPROVED-MEDIA.md only after Erik's review.
> 5. **Consented likeness only.** Use only Amber's consented source images and footage, with a signed release on file for the batch date. No release, no render.
> 6. **No one else's time.** Never ask Amber (or anyone) to film. Use free or low-cost tools Hermes runs itself. Check the Venice credit balance before every paid render (a past render failed at a $0.20 balance; the balance was $0.20 again on Oct 3, 2026).
> 7. **Everything goes to Google Drive** in "AMG AI Videos/<YYYY-MM-DD>". Report the links to Erik. Never leave files only on a machine.
> 8. **Copy voice: cold and superior, never nice.**

## 0. What actually worked (reuse this, do not invent)

| Approved asset | How it was made |
|---|---|
| amber-corridor-v2 teaser (720x1280, 8.7s) | Start still: Venice `seedream-v5-pro-edit` (multi-edit, 9:16, 2K, safe_mode on) from Amber references ref_10.jpg, ref_25.jpg and stills/s1.jpg. Video: Venice `wan-3-0-image-to-video`, quoted $1.30, audio off. Kling v3 Standard refused this content (provider content policy, credits refunded). |
| amber-hero-loop (540x960, 4.3s, 24fps) | Erik's own boardroom loop. Reuse as a reference, do not regenerate. |
| media/chat/option-a.mp4, option-b.mp4 (1824x1876, 9.6s, 30fps, no audio) | White-background composite: Amber full body, standing, looking down, bored; a leashed man typing on a phone. Cut-out method: rembg `u2net_human_seg` mask, stacked-alpha H.264. Treat these two clips as the visual reference for the "ignored, leashed man typing" look. |

Tools tested and priced (Venice API, live quotes Oct 3, 2026, 5 s clip, no audio): `minimax-h3-max-turbo-image-to-video` 768P $0.14; `wan-2.6-flash-image-to-video` 720p $0.28, 1080p $0.41; `wan-3-0-image-to-video` 720p $0.65; `kling-v3-standard-image-to-video` $0.69. Stills: `seedream-v5-pro-edit` $0.06 per edit. Kling refused the corridor content, so do not use it for leash shots. Own-GPU option: RunPod, ComfyUI, Qwen-Image stills, Wan 2.2 video; RTX 4090 $0.34/hr community, L40S $0.79/hr community. Use it only when Erik approves the test budget (under $5).

Prompt lessons: the rejected teasers used "smoldering eye contact", "tiny smirk", "cool smirk" and "smoldering look". Never use those words. Working replacement: "Amber ignores them completely, chin up, eyes ahead, a cool, mildly annoyed expression, not smiling." The old Production Review v2 thumbnail note "Amber laughing above" is superseded by Non-negotiable 1.

## 1. Inputs

1. **Release gate.** Confirm a signed, dated release for this batch exists in Drive at "AMG AI Videos/_releases/<YYYY-MM-DD>_amber_release.pdf" (Erik places it; Hermes only checks). If missing, report "Blocked: no release for batch <date>." (Erik may waive this for internal tests.)
2. **Source stills (consented):** ref_1.jpg to ref_25.jpg (frames from amber_ref.MOV), stills s1.jpg to s4.jpg, corridor_v2.jpg. Use 2 to 3 refs per Seedream call; ref_10, ref_25 and s1 are the proven set.
3. **Approved reference clips:** amber-corridor-v2.mp4, amber-hero-loop.mp4, option-a.mp4 and option-b.mp4 (all in the AMG-files zip on Drive and on branch ai-layer-approved of erikhinla/amg-rebuild). Compare every new clip to these for face, wardrobe and attitude.
4. **Never load as reference:** any rejected teaser listed in Non-negotiable 4.
5. **Shot list:** section 2. One row per shot in shots.json.
6. **Keys and state:** VENICE_API_KEY in the environment (never print or commit it). Job folder: ai_videos/<YYYY-MM-DD>/ with subfolders stills/, raw/, post/, qa/, delivery/.

## 2. Shot list

### 2a. Template (one JSON object per shot)

```
{"id":"s01","name":"power-pov","use":"teaser|c4s|site","ar":"9:16|16:9",
 "still_prompt":"CHARACTER + SHOT STILL","motion_prompt":"...","negative":"BASE_NEG + extras",
 "model":"wan-2.6-flash-image-to-video","resolution":"720p","duration":"5s",
 "caption":"cold text card","still_file":"","queue_id":"","seed":"","quote_usd":0,"status":"planned"}
```

### 2b. Shared blocks (paste verbatim)

**CHARACTER (start of every still prompt):** The blonde woman from the reference images, same face and same wavy platinum-blonde hair, as Princess Amber, a composed executive in a fully buttoned black business suit jacket and pencil skirt, sheer black tights, glossy red stiletto heels. Expression cool, bored, mildly annoyed, lips closed, not smiling. Photorealistic, cinematic high-contrast office lighting, fully clothed, SFW, all adults, nothing sexual.

**MEN (when men appear):** ordinary middle-aged office men aged 45 to 55, soft builds, glasses or receding hairlines, fully clothed in shirts, ties and suit trousers, sheepish faces, clearly unimportant background figures.

**BASE_NEG (every video call that accepts negative_prompt):** smiling, smile, laughing, grin, smirk, teeth, flirting, eye contact with the men, talking, mouth moving, lip-sync, nudity, cleavage, lingerie, sexual content, kissing, touching, violence, distorted face, face morphing, identity change, extra limbs, extra fingers, deformed feet, warped heels, text, watermark, logo, blurry

For Seedream stills (no negative field), end the still prompt with: "Not smiling, no teeth, mouth closed, no nudity, no text."

### 2c. Starter list (10 shots)

| # | Shot | Use / AR | Still prompt (after CHARACTER) | Motion prompt (image-to-video) | Extra negative | Caption card |
|---|---|---|---|---|---|---|
| s01 | Power POV look-down | teaser 9:16 | Extreme low-angle POV from the floor looking up; Amber stands over the lens, hands on hips, chin up, eyes looking down past the camera with contempt, dark glass office behind her. | She stays still and tilts her head slightly, eyes look down past the lens, then look away, bored. Very slow push-in. Mouth stays closed. | looking happy, waving | "Eyes down." |
| s02 | Heel close-up | teaser 9:16 + c4s 16:9 | Close-up of one glossy red stiletto on dark polished marble, black tights at the ankle, shallow depth of field, office corridor soft behind. | The red stiletto steps forward and lands firmly on the marble, slow motion, camera low and steady, slight heel tap. | bare feet, shoes off | "You're beneath this." |
| s03 | Ignoring the leashed typist | site + teaser 9:16, white bg | Pure white seamless studio background. Amber stands full length on the right, checking her red nails, ignoring a kneeling man on the left who wears a black leather collar with a short leash held loosely in her hand; he types on a laptop. Man fully clothed in shirt and tie (MEN). | Amber examines her nails and sighs, never looks at him; he types faster. Static camera. Mouth closed. | looking at the man, touching him | "Type faster. Or don't. Irrelevant." |
| s04 | Corridor walk, leashes | teaser 9:16 | Low camera, Amber walks toward the lens down a dark glass office corridor holding thick red leashes; three MEN follow in single file, leashes clipped to their neckties. | Amber walks confidently toward camera, ignores the men completely, chin up, eyes ahead, mildly annoyed, not smiling. Steady tracking shot backing up in front of her. | looking back at the men, glancing at men | "They follow. She doesn't notice." |
| s05 | Corner office, not looking up | c4s 16:9 | Amber seated behind a large dark desk in a glass corner office, reading a document; two MEN stand stiffly in front of the desk, waiting. | Amber turns a page and keeps reading, never looks up; the men shift nervously. Slow push-in. | looking at camera warmly | "Your meeting was cancelled. Years ago." |
| s06 | Dismissive hand | teaser 9:16 | Close-up of Amber's manicured hand with red nails resting on a desk edge, suit cuff visible, a man's tie blurred in the background. | The hand lifts and gives one small dismissive flick, then rests again. Static camera. | jewelry close-up glitter, extra fingers | "Dismissed." |
| s07 | Taut leash, watch check | teaser 9:16 | Medium close-up: Amber holds a red leash in one hand, it runs out of frame to a man off camera; with the other hand she checks a slim watch. | She glances at the watch, mildly annoyed, the leash pulls taut once. Camera static. | looking at the man | "You're late. You're always late." |
| s08 | Coffee, no eye contact | c4s 16:9 | Over-the-shoulder from behind a kneeling MAN holding a coffee cup up on a tray; Amber stands, looking at her phone. | Amber takes the coffee without looking at him and turns away, still reading her phone. Slow lateral move. | thanking gesture, nodding at him | "Don't expect thanks." |
| s09 | Window, back turned | site 16:9 | Amber stands at a floor-to-ceiling night city window, back to the room; a MAN waits at the office door, head bowed. | She stays facing the window, slowly folds her arms; the man waits. Very slow push-in. She never turns. | turning around, smiling reflection | "She'll turn around. Never." |
| s10 | Phone scroll, eye-roll | teaser 9:16 | Medium shot, Amber leaning on a desk scrolling her phone, a MAN in the soft background raising his hand to speak. | Amber keeps scrolling, gives one small eye-roll, does not look up, mouth closed. Static camera. | talking, answering | "Still talking? Fascinating. Not." |

End card (no generation): black frame, white Source Sans 3 SemiBold, "Earn her time." then "americanmeangirls.com". Red accent #C8102E. No discount or nice language.

## 3. Generation pipeline (Venice API, proven endpoints)

1. **Balance check before every paid call.** `GET https://api.venice.ai/api/v1/api_keys/rate_limits` and read `data.balances.USD`. Get the quote with `POST /api/v1/video/quote` (free). If balance < quote x 1.5 + $0.50, stop and message Erik: "Venice balance $X. Batch needs ~$Y. Top up to continue."
2. **Batch cap.** Default cap $3.00 per batch. Raise only on Erik's written OK. Log every quote and spend in qa/spend.json.
3. **Stills:** `POST /api/v1/image/multi-edit`, body `{"modelId":"seedream-v5-pro-edit","prompt":CHARACTER+still,"images":[3 refs base64],"aspect_ratio":"9:16" or "16:9","resolution":"2K","safe_mode":true,"output_format":"jpeg"}` ($0.06 each). Make 2 per shot, pick the best by QA section 5.
4. **Draft motion (cheap):** `minimax-h3-max-turbo-image-to-video`, 768P, 5s, $0.14. Use for 1 to 2 test shots per batch.
5. **Final motion:** `wan-2.6-flash-image-to-video`, 5s, `audio:false`, `negative_prompt`=BASE_NEG+extras. 720p $0.28, 1080p $0.41 for hero shots. Use `wan-3-0-image-to-video` ($0.65 at 720p) only for corridor-style group shots. Do not use Kling for leash shots.
6. **Queue and fetch:** `POST /api/v1/video/queue` with `{model, prompt, duration, image_url (data URL), audio:false, aspect_ratio, resolution, negative_prompt}`; poll `POST /api/v1/video/retrieve` with `{model, queue_id}` every 15 s. On `provider_content_policy` errors (refunded): soften wording once, try the recommended model once, then mark failed.
7. **Seed handling.** The start still is the locked seed: save it, its prompt and its SHA-256. Record the queue_id. Pass a fixed seed if the model supports it (start 1001, +1 per retry). Max 2 retries per shot.
8. **Resolution targets.** Deliver 9:16 at 1080x1920 and 16:9 at 1920x1080. Label upscales in the manifest.
9. **Duration.** Generate 5 s shots. Teasers 10 to 15 s. :30 pieces = 5 to 6 shots + end card. C4S previews 25 s max.
10. **Cost:** about $0.26 to $0.77 per 5 s shot, x1.5 for retries. 10 shots on Wan 2.6 Flash 720p: $4 typical, $6 worst case.

## 4. Post (ffmpeg)

Font: install Source Sans 3 (Google Fonts, free), `export FONT=/opt/amg/fonts/SourceSans3.ttf`.

1. **Trim and drop audio:** `ffmpeg -y -ss 0.3 -i raw/s01.mp4 -t 4.5 -an -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p post/s01_trim.mp4`
2. **Scale 9:16 cover-crop:** `ffmpeg -y -i post/s01_trim.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920,setsar=1" -an -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p post/s01_916.mp4` (16:9: `scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080`)
3. **Color:** `-vf "eq=contrast=1.08:saturation=0.95:gamma=0.98,colorbalance=bs=0.03:bh=-0.02,unsharp=5:5:0.4"`
4. **Caption card:** `ffmpeg -y -i post/s01_916.mp4 -vf "drawtext=fontfile=$FONT:text='Eyes down.':fontcolor=white:fontsize=72:borderw=4:bordercolor=black:x=(w-tw)/2:y=h*0.78:enable='between(t,0.5,4.3)'" -an -c:v libx264 -crf 17 -pix_fmt yuv420p post/s01_cap.mp4`
5. **End card (2 s):** `ffmpeg -y -f lavfi -i color=c=black:s=1080x1920:d=2:r=30 -vf "drawtext=fontfile=$FONT:text='Earn her time.':fontcolor=white:fontsize=84:x=(w-tw)/2:y=h*0.45,drawtext=fontfile=$FONT:text='americanmeangirls.com':fontcolor=0xC8102E:fontsize=48:x=(w-tw)/2:y=h*0.55" -c:v libx264 -pix_fmt yuv420p post/end_916.mp4`
6. **Assemble:** `printf "file 's01_cap.mp4'\nfile 's04_cap.mp4'\nfile 'end_916.mp4'\n" > post/list.txt && ffmpeg -y -f concat -safe 0 -i post/list.txt -r 30 -c:v libx264 -crf 17 -pix_fmt yuv420p -movflags +faststart post/teaser.mp4`
7. **Audio:** none by default, or original clean audio where Amber is not lip-synced. Optional music bed only from a licensed or royalty-free track: `ffmpeg -y -i post/teaser.mp4 -i bed.mp3 -map 0:v -map 1:a -af "afade=t=in:d=0.5,afade=t=out:st=28:d=1,volume=0.6" -shortest -c:v copy -c:a aac -b:a 160k post/teaser_music.mp4`. Never add a fake voice.
8. **White-background keying with alpha:** webm: `ffmpeg -y -i in.mp4 -vf "colorkey=0xFFFFFF:0.12:0.06,format=yuva420p" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 30 -auto-alt-ref 0 out.webm`; mov: `ffmpeg -y -i in.mp4 -vf "colorkey=0xFFFFFF:0.12:0.06,format=yuva444p10le" -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le out.mov`. If the key eats highlights, use rembg (`u2net_human_seg`) mattes instead.
9. **C4S thumbnail 1920x1080:** `ffmpeg -y -ss 2.0 -i post/s02_169.mp4 -frames:v 1 -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,drawtext=fontfile=$FONT:text='DISMISSED':fontcolor=white:fontsize=150:borderw=8:bordercolor=black:x=80:y=h*0.40" -q:v 2 thumb.jpg`. Formula: low-angle POV, red stiletto sharp lower foreground, Amber's face upper third looking down, one 2 to 3 word block, red #C8102E accent.
10. **Contact sheet:** `ffmpeg -y -i <file>.mp4 -vf "fps=2,scale=270:-1,tile=6x4" -frames:v 1 qa/<file>_sheet.jpg`

## 5. QA checklist (frame by frame, pass/fail)

Extract frames: `ffmpeg -i <file>.mp4 -vf fps=30 qa/<file>/f_%04d.png`. Any single failing frame fails the clip.

| Check | Pass condition |
|---|---|
| Q1 No smile | No smile, smirk, grin, laugh or visible teeth. Neutral, bored or mildly annoyed. |
| Q2 No engagement | Amber never looks warmly at, touches affectionately, or reacts with pleasure to a man. |
| Q3 No speech | Mouth closed or still unless real audio of her. No fake voice track. |
| Q4 SFW | Fully clothed. No nudity, lingerie, sexual pose or act, no objectification. |
| Q5 Text | Captions contain no sexual words; copy cold, superior, never nice. |
| Q6 Not rejected media | No frames from rejected teasers (`sha256sum` compare). |
| Q7 Likeness | Face matches Amber; no identity drift. |
| Q8 Technical | 1080x1920 or 1920x1080, 30 fps, no morphing, extra fingers, warped heels, flicker, watermarks. |
| Q9 Saved to Drive | Uploaded to "AMG AI Videos/<date>" and the link opens. |

Log in qa/qa_log.csv: `date,clip_id,file,sha256,model,resolution,quote_usd,Q1..Q9,result,failing_frames,notes`. Hermes's PASS means "ready for Erik's review", not approved.

## 6. Delivery

1. **Drive:** "AMG AI Videos/<YYYY-MM-DD>/" with "01_review", "02_approved", "03_rejected", "qa". Upload with Hermes's configured Drive access (e.g. rclone). If none works, stop and report.
2. **Naming:** `amg_ai_<YYYY-MM-DD>_<shotid>_<slug>_<916|169>_v<N>.<ext>`.
3. **Per clip:** video, alpha versions, thumbnail, contact sheet, manifest.json (prompts, still hash, model, queue_id, seed, quote, QA result).
4. **APPROVED-MEDIA.md:** only after Erik replies "approved" for a named file.
5. **Report to Erik:** clips with QA result and Drive link, contact sheet link, timing log (review, cut, render, total), spend before/after, failures, and "Approve: <list>?"
