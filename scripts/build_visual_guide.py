from io import BytesIO
from pathlib import Path

from PIL import Image, ImageEnhance
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "TBTX_BBAI_VISUAL_SYSTEM_2026-08-31.pdf"
VIS = Path("/Users/test/.codex/visualizations/2026/08/30/01a054d4-0215-7333-985e-15df14720a7f")
W, H = landscape((13.333 * inch, 7.5 * inch))

COLORS = {
    "fog": "#0D1210", "deep": "#070B10", "warm": "#F2F1EA", "brass": "#D6B46E",
    "navy": "#07101A", "field": "#0A1724", "blue": "#71A9DF", "cool": "#F1F4F7",
    "soft": "#A9B7C5", "purple": "#B196E7", "green": "#A8D58A", "route": "#77AEE8",
}

def cover_image(c, path, x, y, w, h, dark=0.0):
    img = Image.open(path).convert("RGB")
    scale = max(w / img.width, h / img.height)
    crop_w, crop_h = int(w / scale), int(h / scale)
    left, top = (img.width - crop_w) // 2, (img.height - crop_h) // 2
    img = img.crop((left, top, left + crop_w, top + crop_h)).resize((int(w), int(h)), Image.Resampling.LANCZOS)
    if dark:
        img = ImageEnhance.Brightness(img).enhance(1 - dark)
    buf = BytesIO(); img.save(buf, format="JPEG", quality=90); buf.seek(0)
    c.drawImage(ImageReader(buf), x, y, w, h, mask="auto")

def text(c, value, x, y, size=12, color="#F1F4F7", font="Helvetica", leading=None, max_chars=None):
    c.setFillColor(HexColor(color)); c.setFont(font, size)
    lines = []
    for paragraph in value.split("\n"):
        words = paragraph.split(); line = ""
        limit = max_chars or max(12, int(74 / max(size / 12, .7)))
        for word in words:
            trial = f"{line} {word}".strip()
            if len(trial) > limit and line:
                lines.append(line); line = word
            else: line = trial
        lines.append(line)
    lead = leading or size * 1.18
    for i, line in enumerate(lines): c.drawString(x, y - i * lead, line)
    return y - len(lines) * lead

def label(c, value, x, y, color=None):
    c.setFillColor(HexColor(color or COLORS["blue"])); c.setFont("Courier-Bold", 7.2)
    c.drawString(x, y, value.upper())

def footer(c, n):
    c.setStrokeColor(Color(1, 1, 1, .18)); c.line(34, 24, W - 34, 24)
    label(c, "CURRENT INTERNAL AUTHORITY / 2026-08-31", 34, 12, COLORS["soft"])
    label(c, f"{n:02d}", W - 52, 12, COLORS["soft"])

def new_page(c, bg, n):
    c.setFillColor(HexColor(bg)); c.rect(0, 0, W, H, fill=1, stroke=0); footer(c, n)

def page_title(c, n, title, subtitle=""):
    label(c, n, 42, H - 48)
    text(c, title, 42, H - 82, 34, COLORS["cool"], "Helvetica-Bold", 35, 30)
    if subtitle: text(c, subtitle, 42, H - 126, 11, COLORS["soft"], leading=15, max_chars=70)

c = canvas.Canvas(str(OUT), pagesize=(W, H))
c.setTitle("TransformBy10X / BizBuilders AI Visual System - 2026-08-31")

# 1 cover
cover_image(c, ROOT / "public/media/fog-to-route.jpg", 0, 0, W, H, .38)
c.setFillColor(Color(0.02, .05, .08, .52)); c.rect(0, 0, W, H, fill=1, stroke=0)
label(c, "TRANSFORMBY10X / BIZBUILDERS AI", 48, H - 54, COLORS["blue"])
text(c, "VISUAL\nSYSTEM", 48, H - 118, 62, COLORS["cool"], "Helvetica-Bold", 57, 18)
text(c, "A current production guide built from the live site and approved launch assets.", 52, 105, 14, COLORS["cool"], leading=18, max_chars=54)
label(c, "EFFECTIVE 2026-08-31 / REVIEW IN 7 DAYS", 52, 60, COLORS["brass"]); footer(c, 1); c.showPage()

# 2 system
new_page(c, COLORS["fog"], 2); page_title(c, "01 / SYSTEM", "One idea. Three surfaces.", "Each surface has a different job and one shared narrative spine.")
cards = [
    ("DIGITAL FOG", "Recognition + category", COLORS["brass"], "Cinematic / human / atmospheric\nAI created a job. Nobody wanted."),
    ("BIZBUILDERS AI", "Business consequence + foundation", COLORS["blue"], "Midnight / steel / routed light\nInfrastructure before acceleration."),
    ("LAUNCH SURFACE", "Internal routing + decisions", COLORS["green"], "Editorial control surface\nRoute. Select. Say. Ship."),
]
for i, (title, role, accent, body) in enumerate(cards):
    x = 42 + i * 300; y = 82; w = 276; h = 285
    c.setFillColor(HexColor("#101A17" if i != 1 else "#0A1724")); c.rect(x, y, w, h, fill=1, stroke=0)
    c.setFillColor(HexColor(accent)); c.rect(x, y + h - 5, w, 5, fill=1, stroke=0)
    label(c, role, x + 18, y + h - 30, accent); text(c, title, x + 18, y + h - 68, 22, COLORS["cool"], "Helvetica-Bold", 24, 18)
    text(c, body, x + 18, y + 112, 11, COLORS["soft"], leading=16, max_chars=34)
c.showPage()

# 3 journey
new_page(c, COLORS["deep"], 3); page_title(c, "02 / JOURNEY", "Recognition becomes momentum.", "Do not introduce the system before the person recognizes the problem.")
steps = ["RECOGNITION", "DIGITAL FOG", "DIGITAL FRICTION", "MOMENTUM MAP", "CONTEXT", "GOVERNED EXECUTION", "MOMENTUM"]
sx, sy, gap = 54, 270, 128
for i, step in enumerate(steps):
    color = COLORS["brass"] if i < 2 else COLORS["blue"] if i < 6 else COLORS["green"]
    c.setFillColor(HexColor(color)); c.circle(sx + i * gap, sy, 7, fill=1, stroke=0)
    if i < len(steps)-1:
        c.setStrokeColor(HexColor(color)); c.setLineWidth(1); c.line(sx + i*gap + 10, sy, sx + (i+1)*gap - 10, sy)
    label(c, f"0{i+1}", sx + i*gap - 5, sy + 24, color)
    text(c, step, sx + i*gap - 42, sy - 34, 9, COLORS["cool"], "Helvetica-Bold", 11, 14)
text(c, "PERSONAL", 54, 115, 13, COLORS["purple"], "Helvetica-Bold"); text(c, "/scan -> Fog-Free Daily", 54, 92, 11, COLORS["soft"])
text(c, "BUSINESS", 368, 115, 13, COLORS["route"], "Helvetica-Bold"); text(c, "/map -> BizBuilders AI", 368, 92, 11, COLORS["soft"])
text(c, "GROWTH", 682, 115, 13, COLORS["green"], "Helvetica-Bold"); text(c, "After operating readiness", 682, 92, 11, COLORS["soft"])
c.showPage()

# 4 visual language
new_page(c, COLORS["navy"], 4); page_title(c, "03 / LANGUAGE", "Color carries the route.", "Public surfaces use one dominant signal. Internal tags can show the full matrix.")
swatches = [("FOG", "#0D1210"), ("DEEP", "#070B10"), ("BRASS", "#D6B46E"), ("BBAI", "#07101A"), ("BLUE", "#71A9DF"), ("COOL", "#F1F4F7"), ("PERSONAL", "#B196E7"), ("APPROVED", "#A8D58A")]
for i,(name,value) in enumerate(swatches):
    x = 48 + (i % 4) * 220; y = 250 - (i // 4) * 115
    c.setFillColor(HexColor(value)); c.rect(x, y, 194, 72, fill=1, stroke=0)
    label(c, name, x, y - 17, value if value not in ("#F1F4F7", "#A8D58A") else COLORS["soft"])
    text(c, value, x + 110, y - 17, 8, COLORS["soft"], "Courier")
text(c, "OUTFIT", 48, 72, 22, COLORS["cool"], "Helvetica-Bold"); text(c, "Editorial display + body", 48, 48, 9, COLORS["soft"])
text(c, "ARCHIVO BLACK", 335, 72, 22, COLORS["cool"], "Helvetica-Bold"); text(c, "Macro campaign statements", 335, 48, 9, COLORS["soft"])
text(c, "JETBRAINS MONO", 680, 72, 16, COLORS["blue"], "Courier-Bold"); text(c, "Labels + routes + diagnostics", 680, 48, 9, COLORS["soft"])
c.showPage()

# 5 public world
new_page(c, COLORS["fog"], 5); page_title(c, "04 / DIGITAL FOG", "Film first. Recognition first.")
cover_image(c, VIS / "tbtx-production.png", 390, 58, 530, 390, .05)
text(c, "AI CREATED A JOB.\nNOBODY WANTED.", 44, 360, 31, COLORS["warm"], "Helvetica-Bold", 31, 19)
text(c, "Dark interior. Human pressure. Fog as a lived condition. Brass appears as the route back to agency.", 44, 238, 12, COLORS["soft"], leading=17, max_chars=42)
label(c, "MOTION", 44, 162, COLORS["brass"]); text(c, "Film loop -> type/fog dissolve -> lived scenes -> doors", 44, 140, 10, COLORS["cool"], max_chars=46)
label(c, "RULE", 44, 96, COLORS["brass"]); text(c, "The hero greets. Stakes earn the next action.", 44, 74, 10, COLORS["cool"], max_chars=42)
c.showPage()

# 6 BBAI world
new_page(c, COLORS["navy"], 6); page_title(c, "05 / BIZBUILDERS AI", "Pressure resolves into infrastructure.")
cover_image(c, VIS / "bbai-live-final.png", 515, 48, 405, 412, .02)
text(c, "AI DIDN'T REMOVE\nTHE WORK.", 44, 365, 31, COLORS["cool"], "Helvetica-Bold", 31, 20)
text(c, "IT MOVED IT\nINTO THE GAPS.", 44, 286, 28, COLORS["blue"], "Helvetica-Bold", 29, 18)
text(c, "Midnight navy, steel blue, cool white, and routed brass light. Fragmented evidence gives way to governed flow.", 44, 182, 11, COLORS["soft"], leading=16, max_chars=46)
label(c, "CORE VISUAL", 44, 104, COLORS["blue"]); text(c, "Scattered systems on the left. Connected infrastructure on the right.", 44, 82, 10, COLORS["cool"], max_chars=54)
c.showPage()

# 7 motion
new_page(c, COLORS["field"], 7); page_title(c, "06 / MOTION", "Motion must reveal the operating truth.")
motions = [
    ("FOG", "Conceals and reveals meaning. Never decorative smoke."),
    ("DRIFT", "Slow camera or image scale creates environmental pressure."),
    ("DISSOLVE", "Type blurs into atmosphere, then returns as clarity."),
    ("ROUTE", "Movement travels from fragmentation toward a destination."),
    ("EVIDENCE", "Hover or scroll reveals proof and a next action."),
    ("ACCESS", "Reduced-motion users receive the same hierarchy without animation."),
]
for i,(title,body) in enumerate(motions):
    x = 48 + (i % 3) * 300; y = 330 - (i // 3) * 150
    label(c, f"0{i+1}", x, y + 48, COLORS["blue"]); text(c, title, x, y + 24, 19, COLORS["cool"], "Helvetica-Bold")
    text(c, body, x, y - 6, 10, COLORS["soft"], leading=14, max_chars=38)
c.showPage()

# 8 asset collage
new_page(c, COLORS["deep"], 8); page_title(c, "07 / ASSETS", "Every image has a job.")
assets = [
    (ROOT/"public/media/bbai-blue-final-folders.jpg", "FRICTION / HUMAN RECONCILIATION"),
    (ROOT/"public/media/bbai-blue-billboard.jpg", "CONSEQUENCE / BUSINESS INTERRUPTION"),
    (ROOT/"public/media/hallway-fog-lift.jpg", "LIFT / RECOVERED MOMENTUM"),
]
for i,(path,name) in enumerate(assets):
    x = 36 + i*308; cover_image(c, path, x, 85, 286, 330, .12); c.setFillColor(Color(.02,.04,.06,.72)); c.rect(x,85,286,45,fill=1,stroke=0); label(c,name,x+12,104,COLORS["cool"])
c.showPage()

# 9 selection
new_page(c, COLORS["fog"], 9); page_title(c, "08 / SELECTION", "Use. Crop. Reject.", "Current assets are chosen for message fit, not because they exist.")
columns = [
    ("USE", COLORS["green"], ["Creates recognition", "Shows hidden coordination", "Makes infrastructure visible", "Clarifies the route"]),
    ("CROP", COLORS["brass"], ["Embedded browser chrome", "Competing navigation", "Weak empty areas", "Platform-specific framing"]),
    ("REJECT", "#D98282", ["Invented claims", "Unreadable generated type", "Generic AI imagery", "No narrative job"]),
]
for i,(title,color,items) in enumerate(columns):
    x=48+i*298; label(c,title,x,350,color); c.setStrokeColor(HexColor(color)); c.line(x,335,x+250,335)
    for j,item in enumerate(items): text(c,f"0{j+1}  {item}",x,295-j*48,12,COLORS["cool"],"Helvetica-Bold",14,28)
text(c, "SEVEN-DAY RULE", 48, 86, 16, COLORS["brass"], "Helvetica-Bold"); text(c, "Older creative becomes reference until it is reviewed against production again.", 238, 86, 11, COLORS["soft"], max_chars=78)
c.showPage()

# 10 gate
new_page(c, COLORS["navy"], 10); page_title(c, "09 / SHIP GATE", "A beautiful asset still needs a job.")
checks = ["Route and audience named", "Message supported by current sources", "Lane assigned", "Desktop and mobile crops checked", "Embedded type reviewed", "Destination visual language matched", "Motion has a narrative job", "CTA lands on the right step", "Human approval recorded"]
for i,item in enumerate(checks):
    col=i%2; row=i//2; x=52+col*440; y=355-row*62
    c.setStrokeColor(HexColor(COLORS["blue"])); c.rect(x,y-8,14,14,fill=0,stroke=1); text(c,item,x+28,y+2,12,COLORS["cool"],"Helvetica-Bold")
text(c, "LIVE SITE > CURRENT ASSETS > THIS GUIDE > HISTORICAL REFERENCE", 52, 66, 13, COLORS["brass"], "Courier-Bold")
c.showPage(); c.save()
print(OUT)
