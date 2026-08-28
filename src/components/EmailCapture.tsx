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
        <div className="text-lg mb-2">Saved on this device.</div>
        <p className="text-sm text-white/70">Email delivery is not wired yet. Keep the diagnostic on screen, or screenshot it.</p>
      </div>
    );
  }

  return (
    <div className="surface p-8">
      <div className="mb-4 text-sm">Optional. Leave an email to keep this result with the work later.</div>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-wrap">
        <label className="flex-1 min-w-[200px] grid gap-2">
          <span className="text-xs tracking-widest uppercase text-white/50">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full bg-black border border-zinc-700 px-4 py-3 text-sm focus:outline-none focus:border-white"
            disabled={loading}
          />
        </label>
        <button 
          type="submit" 
          className="btn-industrial whitespace-nowrap disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'SAVING...' : 'SAVE ON THIS DEVICE'}
        </button>
      </form>
      <p className="text-[10px] text-white/40 mt-3">Nothing is emailed yet. This stays on this browser.</p>
    </div>
  );
}
