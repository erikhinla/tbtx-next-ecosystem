import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { archetype, email, phase, timestamp, payment_status, bottleneck } = await req.json();

  if (!email || !archetype) {
    return NextResponse.json({ success: false, message: 'Missing email or archetype' }, { status: 400 });
  }

  const formData = {
    archetype,
    email,
    phase: phase ?? 1,
    timestamp: timestamp ?? new Date().toISOString(),
    payment_status: payment_status ?? 'unpaid',
    bottleneck: bottleneck ?? '',
    _subject: 'Phase 1 request',
    _replyto: email,
    _cc: 'erik@transformby10x.ai',
    _captcha: 'false',
    _template: 'table',
  };

  try {
    const response = await fetch('https://formsubmit.co/ajax/erikhbush@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json().catch(() => ({}));
    const message = typeof data?.message === 'string' ? data.message : '';
    const activation = /activat/i.test(message);
    const limited = response.status === 429 || /rate limit/i.test(message);
    const sent = response.ok && data?.success !== false && data?.success !== 'false' && !activation;

    return NextResponse.json(
      { success: sent, activation, limited, message },
      { status: sent ? 200 : 502 },
    );
  } catch {
    return NextResponse.json({ success: false, message: 'Not sent' }, { status: 500 });
  }
}
