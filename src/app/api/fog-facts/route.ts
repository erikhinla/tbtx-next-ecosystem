import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const MAX = 280;
const MIN = 12;

function clean(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const text = raw.replace(/\s+/g, " ").trim();
  if (text.length < MIN || text.length > MAX) return null;
  if (/[<>]/.test(text)) return null;
  return text;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const fact = clean(
    body && typeof body === "object" && "fact" in body ? (body as { fact: unknown }).fact : null
  );
  if (!fact) {
    return NextResponse.json({ ok: false, error: "Say it in one line." }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "fog-facts.jsonl"),
    `${JSON.stringify({ fact, at: new Date().toISOString() })}\n`,
    "utf8"
  );

  return NextResponse.json({ ok: true });
}
