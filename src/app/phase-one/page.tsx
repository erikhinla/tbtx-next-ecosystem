'use client';

import { useState } from 'react';

export default function PhaseOnePage() {
  const [email, setEmail] = useState('');
  const [archetype, setArchetype] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !archetype) return;

    setLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          archetype,
          email,
          phase: 1,
          timestamp: new Date().toISOString(),
          payment_status: 'unpaid',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full">
        <h1 className="text-3xl font-bold mb-4">YOUR PROGRESS ISN'T SLOW</h1>
        <h2 className="text-2xl font-bold mb-8">YOUR SYSTEM IS UNCLEAR</h2>
        <p className="mb-4">Your system is mapped. Your bottleneck is identified. Your blueprint is ready.</p>
        <p className="mb-8">Most AI systems can generate. Very few can govern execution safely.</p>

        {submitted ? (
          <div className="surface p-8 text-center">
            <div className="text-lg mb-2">Request Sent.</div>
            <p className="text-sm text-white/70">Your Phase 1 request has been sent to erik@transformby10x.ai.</p>
          </div>
        ) : error ? (
          <div className="surface p-8 text-center">
            <div className="text-lg mb-2">Request Failed.</div>
            <p className="text-sm text-white/70">Your Phase 1 request could not be sent. Please try again.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Archetype</label>
              <input
                type="text"
                value={archetype}
                onChange={(e) => setArchetype(e.target.value)}
                className="w-full bg-black border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white mt-1"
                required
              />
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
          </form>
        )}

        <div className="mt-8 text-center">
          <a href="#" className="text-gray-400 hover:text-white">View Blueprint</a>
        </div>
      </div>
    </div>
  );
}
