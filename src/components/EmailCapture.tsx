'use client';

import { useState } from 'react';

interface EmailCaptureProps {
  score: number;
  profileName: string;
  onSuccess?: () => void;
}

export default function EmailCapture({ score, profileName, onSuccess }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const { captureDiagnosticCompletion } = await import('@/lib/win-capture');
      await captureDiagnosticCompletion(email, score, profileName);
    } catch (err) {
      console.error('WIN capture failed (non-blocking):', err);
    }

    await new Promise(resolve => setTimeout(resolve, 400));

    setSubmitted(true);
    setLoading(false);

    if (onSuccess) onSuccess();
  };

  if (submitted) {
    return (
      <div className="surface p-8 text-center">
        <div className="text-lg mb-2">Thank you. Your result is saved.</div>
        <p className="text-sm text-white/70">Check your inbox for the full blueprint. This data point is now in operating memory.</p>
      </div>
    );
  }

  return (
    <div className="surface p-8">
      <div className="mb-4 text-sm">Receive your full result profile + recommended next step via email.</div>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
        <input 
          type="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@business.com" 
          className="flex-1 min-w-[200px] bg-black border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white"
          disabled={loading}
        />
        <button 
          type="submit" 
          className="btn-industrial whitespace-nowrap disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'SAVING...' : 'SEND RESULT'}
        </button>
      </form>
      <p className="text-[10px] text-white/40 mt-3">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
