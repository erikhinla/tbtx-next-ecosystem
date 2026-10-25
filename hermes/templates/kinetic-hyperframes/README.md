# kinetic-hyperframes (TBTX approved video template)

One spec -> hyperframes projects (1080x1920, 1080x1080, optional 1080x1350 stills) -> renders -> `frame_check.py`.
`build.py` exits 1 if any output fails frame_check. Never hand-build layouts or edit generated `index.html`.

    python3 build.py                 # PROOF post 1 defaults (cinematic plate, approved copy)
    python3 build.py spec.json       # see spec.example.json

Modes: `plate` (default, preferred): a cinematic plate behind the type. Use a still from
`hermes/gen_media.py still` (the template pushes in slowly) or ONE Veo clip from `gen_media.py clip`
(reused for every size; 1:1 is a centre crop). No plate given -> build.py generates a still from `plate_prompt`.
`type`: designed graphite base (gradient, brushed-metal grain, light sweep, vignette), no imagery.

Why 1:1 failed before: hyperframes takes the canvas size ONLY from `data-width` / `data-height` on the root
`[data-composition-id]` element (fallback 1920x1080). Hermes' hand-built files put the size in a `<body style>`
and had no root `data-width/height`, so the size was never declared. build.py always writes both attributes.

Output: `<out>/<name>_9x16.mp4`, `<out>/<name>_1x1.mp4`, stills `<out>/<still>_4x5.png`, plus
`*_contact.png` contact sheets from frame_check. Deliver only after `BUILD PASS`.

## Round 2 changes (2026-10-22)
- Spec keys are validated (unknown keys are rejected). `name` is required; output goes to `hermes/out/<name>/` and a `.job` marker stops another job overwriting it.
- `approved_copy`: list of the approved strings; the build fails if beats/main/sub differ word for word. frame_check also compares the rendered HTML text with the spec copy.
- Plates are lit (new gen_media style); a blurred dark panel sits only behind the text block. frame_check fails plates with mean luma < 62 or luma spread < 45 outside the text.
- No opacity fades on text: beats hard-cut in/out and words move by slide/scale only. frame_check fails text with opacity between 0.02 and 0.98.
- 9:16 first beat: one-word rows, scaled to fill >= 50% of frame height (checked).
- Failing outputs are renamed `<file>.FAILED`; passing ones get `<file>.pass.json`.
