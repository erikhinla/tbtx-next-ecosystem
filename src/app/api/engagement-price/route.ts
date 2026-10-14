import { NextResponse } from 'next/server';
import { siteQuote } from '../../../lib/proof/site-quote';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const input = await request.json().catch(() => null);
  const quote = input && siteQuote(input.selections, input.departmentId, input.modifierOn ?? false);
  if (!quote) return NextResponse.json({ ok: false }, { status: 400 });
  return NextResponse.json({ ok: true, ...quote }, { headers: { 'Cache-Control': 'no-store' } });
}
