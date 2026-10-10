
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { archetype, email, phase, timestamp, payment_status, bottleneck } = await req.json();

  const formData = {
    archetype,
    email,
    phase,
    timestamp,
    payment_status,
    bottleneck,
    _subject: 'Phase 1 request',
    _replyto: email,
  };

  try {
    const response = await fetch('https://formsubmit.co/ajax/erik@transformby10x.ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
