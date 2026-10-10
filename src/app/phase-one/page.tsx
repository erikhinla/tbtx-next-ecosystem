'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const ARCHETYPES = [
  { value: 'fragmentedWorkflow', label: 'Fragmented Workflow' },
  { value: 'toolOverload', label: 'Tool-related friction' },
  { value: 'bottleneckOperator', label: 'Bottleneck Operator' },
  { value: 'executionStall', label: 'Execution Stall' },
] as const;

const AIR_CHECKOUT = 'https://buy.stripe.com/aFa28qbIFedc90D5sd08g01';

type ArchetypeValue = (typeof ARCHETYPES)[number]['value'];

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
  const [state, setState] = useState<'form' | 'sent' | 'activate' | 'wait' | 'failed'>('form');
  const [loading, setLoading] = useState(false);

  const checkoutHref = email
    ? `${AIR_CHECKOUT}?prefilled_email=${encodeURIComponent(email)}`
    : AIR_CHECKOUT;

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
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-4">YOUR PROGRESS ISN'T SLOW</h1>
        <h2 className="text-2xl font-bold mb-4">YOUR SYSTEM IS UNCLEAR</h2>
        <p className="mb-2">COMPILE COMPLETE</p>
        <p className="mb-8">Your system is mapped. Your bottleneck is identified. Your blueprint is ready.</p>

        {state === 'sent' ? (
          <div className="surface p-8 text-center">
            <div className="text-lg mb-2">Request sent.</div>
            <p className="text-sm text-white/70">Phase 1 is with BizBuilders AI. Payment is unpaid.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Archetype</label>
              <select
                value={archetype}
                onChange={(e) => setArchetype(e.target.value as ArchetypeValue)}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white mt-1"
              >
                {ARCHETYPES.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full btn-industrial whitespace-nowrap disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'SENDING...' : 'BUILD THE SYSTEM'}
            </button>
            {state === 'activate' && (
              <p className="text-sm text-white/70">Open erikhbush@gmail.com and click Activate Form. Then submit once.</p>
            )}
            {state === 'wait' && (
              <p className="text-sm text-white/70">The sender is busy. Wait two minutes and submit once.</p>
            )}
            {state === 'failed' && (
              <p className="text-sm text-white/70">Not sent.</p>
            )}
          </form>
        )}

        <a
          href={checkoutHref}
          className="mt-6 block w-full border border-white px-4 py-3 text-center text-sm"
        >
          Pay Account Intelligence Report · $143.82 CAD
        </a>
        <p className="mt-2 text-center text-xs text-white/50">One time. Stripe. The card statement says TRANSFORMBY10X.AI. This does not mark Phase 1 paid.</p>

        <div className="mt-8 text-center">
          <a href={`/diagnostic/blueprint?archetype=${archetype}`} className="text-gray-400 hover:text-white">View Blueprint</a>
        </div>
      </div>
    </div>
  );
}

export default function PhaseOnePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <PhaseOneForm />
    </Suspense>
  );
}
