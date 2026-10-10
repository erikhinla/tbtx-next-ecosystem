'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ARCHETYPES = [
  { value: 'fragmentedWorkflow', label: 'Fragmented Workflow' },
  { value: 'toolOverload', label: 'Tool-related friction' },
  { value: 'bottleneckOperator', label: 'Bottleneck Operator' },
  { value: 'executionStall', label: 'Execution Stall' },
] as const;

const STEPS = [
  'Consolidate core tools.',
  'Set up system architecture.',
  'Implement workflows.',
  'Connect data sources.',
];

const FALLBACK_OFFERS = [
  {
    id: 'air',
    name: 'Account Intelligence Report',
    price: '$143.82 CAD',
    cadence: 'One time',
    url: 'https://buy.stripe.com/aFa28qbIFedc90D5sd08g01',
    statement: 'TRANSFORMBY10X.AI',
    note: 'Does not mark Phase 1 paid.',
  },
  {
    id: 'ddd',
    name: 'Digital De-Fog Daily',
    price: '$7.77 USD',
    cadence: 'One time · 30 days',
    url: 'https://buy.stripe.com/dRm3cw1CDg4D7UR9VI8og01',
    statement: 'transformby10x.ai',
    note: 'One focus, a few decisions, one action, and a place to pick it up again.',
  },
];

type ArchetypeValue = (typeof ARCHETYPES)[number]['value'];
type Offer = (typeof FALLBACK_OFFERS)[number];

function isArchetype(value: string | null): value is ArchetypeValue {
  return ARCHETYPES.some((item) => item.value === value);
}

function PhaseOneForm() {
  const searchParams = useSearchParams();
  const incoming = searchParams.get('archetype');
  const [email, setEmail] = useState('');
  const [archetype, setArchetype] = useState<ArchetypeValue>(
    isArchetype(incoming) ? incoming : 'fragmentedWorkflow',
  );
  const [offers, setOffers] = useState<Offer[]>(FALLBACK_OFFERS);
  const [state, setState] = useState<'form' | 'sent' | 'activate' | 'wait' | 'failed'>('form');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/offers')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data?.offers) && data.offers.length > 0) setOffers(data.offers);
      })
      .catch(() => undefined);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !archetype) return;

    setLoading(true);
    try {
      const response = await fetch('https://formsubmit.co/ajax/erikhbush@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          archetype,
          email,
          phase: 1,
          timestamp: new Date().toISOString(),
          payment_status: 'unpaid',
          _subject: 'Phase 1 request',
          _replyto: email,
          _cc: 'erik@transformby10x.ai',
          _captcha: 'false',
          _template: 'table',
        }),
      });
      const data = await response.json().catch(() => ({}));
      const message = typeof data?.message === 'string' ? data.message : '';
      const activation = /activat/i.test(message);
      const limited = response.status === 429 || /rate limit/i.test(message);
      const sent = response.ok && data?.success !== false && data?.success !== 'false' && !activation;
      if (sent) setState('sent');
      else if (activation) setState('activate');
      else if (limited) setState('wait');
      else setState('failed');
    } catch {
      setState('failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#F4EDE3] text-[#1C1916] paper-bg p-5 md:p-10 font-body">
      <header className="flex justify-between items-center pb-8 border-b border-[#D8D2C5] mb-12">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#B89A6E]">PHASE 1 // BIZBUILDERS AI</div>
        <Link href="/bbm" className="engineered-control text-[10px]" aria-label="Back to intake">
          <span aria-hidden="true">‹</span>
        </Link>
      </header>

      <div className="max-w-5xl mx-auto grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <div className="blueprint-label mb-3">COMPILE COMPLETE</div>
          <h1 className="type-macro text-[clamp(2.6rem,8vw,5.4rem)] leading-[0.84] tracking-[-0.05em]">
            YOUR PROGRESS ISN'T SLOW
          </h1>
          <h2 className="type-macro mt-3 text-[clamp(2rem,6vw,3.8rem)] leading-[0.86] tracking-[-0.05em] text-[#2C5F4A]">
            YOUR SYSTEM IS UNCLEAR
          </h2>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.7]">
            Your system is mapped. Your bottleneck is identified. Your blueprint is ready.
          </p>

          <div className="mt-10 border-t border-[#D8D2C5]">
            <div className="blueprint-label py-4">PHASE 1 · WEEK 1–2 · NOT STARTED</div>
            {STEPS.map((step) => (
              <div key={step} className="flex items-center gap-4 border-t border-[#D8D2C5] py-4">
                <span className="h-4 w-4 shrink-0 border border-[#1C1916]" aria-hidden="true" />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-[#1C1916] bg-[#F4EDE3] p-5 md:p-6">
          <div className="blueprint-label mb-4">REQUEST</div>
          {state === 'sent' ? (
            <div>
              <h3 className="type-macro text-3xl leading-[0.9]">Request sent.</h3>
              <p className="mt-4 text-sm leading-relaxed">Phase 1 is with BizBuilders AI. Payment is unpaid.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="blueprint-label">Archetype</span>
                <select
                  value={archetype}
                  onChange={(e) => setArchetype(e.target.value as ArchetypeValue)}
                  className="mt-2 w-full border border-[#1C1916] bg-transparent px-3 py-3 text-sm"
                >
                  {ARCHETYPES.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="blueprint-label">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="mt-2 w-full border border-[#1C1916] bg-transparent px-3 py-3 text-sm"
                />
              </label>
              <button type="submit" className="engineered-control w-full justify-center" disabled={loading}>
                {loading ? 'SENDING...' : 'BUILD THE SYSTEM'}
              </button>
              {state === 'activate' && (
                <p className="text-sm">Open erikhbush@gmail.com and click Activate Form. Then submit once.</p>
              )}
              {state === 'wait' && (
                <p className="text-sm">The sender is busy. Wait two minutes and submit once.</p>
              )}
              {state === 'failed' && <p className="text-sm">Not sent.</p>}
            </form>
          )}

          <div className="mt-8 border-t border-[#D8D2C5] pt-5">
            <div className="blueprint-label mb-3">PAY · SEPARATE FROM PHASE 1</div>
            <div className="space-y-3">
              {offers.map((offer) => (
                <a key={offer.id} href={email ? `${offer.url}?prefilled_email=${encodeURIComponent(email)}` : offer.url} className="block border border-[#1C1916] p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <strong>{offer.name}</strong>
                    <span className="font-mono text-xs">{offer.price}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#1C1916]/70">{offer.cadence}. Card statement: {offer.statement}. {offer.note}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Link href={`/diagnostic/blueprint?archetype=${archetype}`} className="text-sm underline">View Blueprint</Link>
          </div>
        </section>
      </div>

      <footer className="mt-16 text-[10px] font-mono tracking-[0.1em] text-[#B89A6E]">OWNER: BIZBUILDERS AI. PHASE 1 REMAINS UNPAID UNTIL A PAYMENT IS CONFIRMED.</footer>
    </main>
  );
}

export default function PhaseOnePage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#F4EDE3]" />}>
      <PhaseOneForm />
    </Suspense>
  );
}
