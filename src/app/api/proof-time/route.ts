import { NextResponse } from "next/server";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CAL = "erikhbush@gmail.com";
const TZ = "America/Puerto_Rico";
const OFFSET = "-04:00";
const AGENDA =
  "The friction the Trace made visible. Which work is carrying it. Who absorbed it. What it costs to leave it there.";
const DAYS = new Set(["Tue", "Wed", "Thu"]);
const SLOT_MINUTES = [600, 645, 690, 735, 780, 825, 870, 915];

type Block = { start: number; end: number };
type Slot = { start: string; end: string; day: string; time: string };

function creds() {
  const raw = process.env.GOOGLE_BOOKING_SA;
  if (!raw) throw new Error("missing-key");
  return JSON.parse(raw) as { client_email: string; private_key: string; token_uri: string };
}

async function accessToken() {
  const cred = creds();
  const b64 = (value: string | object) =>
    Buffer.from(typeof value === "string" ? value : JSON.stringify(value)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const header = b64({ alg: "RS256", typ: "JWT" });
  const claim = b64({
    iss: cred.client_email,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: cred.token_uri,
    iat: now,
    exp: now + 3600,
  });
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const assertion = `${header}.${claim}.${signer.sign(cred.private_key, "base64url")}`;
  const res = await fetch(cred.token_uri, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const body = (await res.json()) as { access_token?: string };
  if (!body.access_token) throw new Error("token");
  return body.access_token;
}

function parts(date: Date) {
  const bag: Record<string, string> = {};
  for (const part of new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return bag;
}

function stamp(year: string, month: string, day: string, minutes: number) {
  const hh = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  return `${year}-${month}-${day}T${hh}:${mm}:00${OFFSET}`;
}

function plus45(start: string) {
  const end = parts(new Date(new Date(start).getTime() + 45 * 60 * 1000));
  return `${end.year}-${end.month}-${end.day}T${end.hour}:${end.minute}:00${OFFSET}`;
}

async function busy(token: string, from: Date, to: Date) {
  const res = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
      timeZone: TZ,
      items: [{ id: CAL }],
    }),
  });
  const body = (await res.json()) as {
    calendars?: Record<string, { busy?: { start: string; end: string }[]; errors?: unknown }>;
  };
  const calendar = body.calendars?.[CAL];
  if (!calendar || calendar.errors) throw new Error("calendar");
  return (calendar.busy || []).map((block) => ({
    start: new Date(block.start).getTime(),
    end: new Date(block.end).getTime(),
  }));
}

function overlaps(startMs: number, endMs: number, blocks: Block[]) {
  return blocks.some((block) => startMs < block.end && endMs > block.start);
}

function openings(blocks: Block[]): Slot[] {
  const now = Date.now();
  const earliest = now + 12 * 60 * 60 * 1000;
  const horizon = now + 21 * 24 * 60 * 60 * 1000;
  const today = parts(new Date());
  let cursor = new Date(`${today.year}-${today.month}-${today.day}T00:00:00${OFFSET}`).getTime();
  const slots: Slot[] = [];
  const dayLabel = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric" });
  const timeLabel = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
  for (let i = 0; i < 24 && slots.length < 32; i++) {
    const part = parts(new Date(cursor));
    if (DAYS.has(part.weekday)) {
      for (const minutes of SLOT_MINUTES) {
        const start = stamp(part.year, part.month, part.day, minutes);
        const startMs = new Date(start).getTime();
        const endMs = startMs + 45 * 60 * 1000;
        if (startMs < earliest || startMs > horizon || overlaps(startMs, endMs, blocks)) continue;
        slots.push({
          start,
          end: plus45(start),
          day: dayLabel.format(new Date(start)),
          time: timeLabel.format(new Date(start)),
        });
      }
    }
    cursor += 24 * 60 * 60 * 1000;
  }
  return slots;
}

function cleanLine(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>\u0000-\u001f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanTrace(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\u0000/g, "").replace(/[<>]/g, "").trim().slice(0, 12000);
}

export async function GET() {
  try {
    const token = await accessToken();
    const from = new Date();
    const to = new Date(Date.now() + 22 * 24 * 60 * 60 * 1000);
    const slots = openings(await busy(token, from, to));
    return NextResponse.json({ ok: true, slots }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const input = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = cleanLine(input.name, 80);
  const email = cleanLine(input.email, 120).toLowerCase();
  const company = cleanLine(input.company, 80);
  const trace = cleanTrace(input.trace);
  const start = typeof input.start === "string" ? input.start : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || trace.length < 20) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  try {
    const token = await accessToken();
    const from = new Date();
    const to = new Date(Date.now() + 22 * 24 * 60 * 60 * 1000);
    const slots = openings(await busy(token, from, to));
    const slot = slots.find((item) => item.start === start);
    if (!slot) return NextResponse.json({ ok: false, taken: true }, { status: 409 });
    const description = [
      name,
      email,
      company,
      ``,
      `Agenda`,
      AGENDA,
      ``,
      `Forty-five minutes. The place is added on the invite.`,
      ``,
      trace,
    ]
      .filter((line) => line !== "")
      .join("\n");
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CAL)}/events?sendUpdates=none`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          summary: company ? `PROOF read · ${name}, ${company}` : `PROOF read · ${name}`,
          description,
          start: { dateTime: slot.start, timeZone: TZ },
          end: { dateTime: slot.end, timeZone: TZ },
        }),
      }
    );
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true, when: `${slot.day} · ${slot.time}` });
  } catch {
    return NextResponse.json({ ok: false }, { status: 503 });
  }
}
