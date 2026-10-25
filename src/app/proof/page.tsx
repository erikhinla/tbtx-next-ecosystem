'use client';
import { useState, useEffect } from 'react';

const QUESTIONS = [
  { 
    title: "Where does campaign work lose momentum?", 
    text: "Most work stalls before it even gets to production. If the brief isn't clean, the next step isn't clear."
  },
  { 
    title: "How clear is ownership when a date moves?", 
    text: "If it relies on whoever happens to be available, the date didn't move, it fell through."
  },
  { 
    title: "Who remembers to follow up?", 
    text: "A loose process means things wait on human memory."
  }
];

export default function ProofMobileTest() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#0d0e11', color: '#f4f1ea', fontFamily: "'IBM Plex Mono', monospace" }}>
      
      {/* Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(56,56,56,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'MuseoModerno', sans-serif", fontSize: '24px', fontWeight: 900, color: '#f4f1ea' }}>tbtx</div>
        <div style={{ fontSize: '11px', color: '#888c94', letterSpacing: '0.2em' }}>SYS.PROOF.RES</div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', padding: '0 24px' }}>
        
        {/* Step Kicker */}
        <div style={{ color: '#d01e98', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '8px', height: '8px', background: '#d01e98', boxShadow: '0 0 10px #d01e98' }}></div>
          Friction Audit
        </div>

        {/* Question Title */}
        <h2 style={{ fontFamily: "'MuseoModerno', sans-serif", fontSize: '32px', lineHeight: 1.1, fontWeight: 800, marginBottom: '24px', textTransform: 'uppercase' }}>
          {QUESTIONS[step].title}
        </h2>
        
        {/* Detail Text */}
        <div style={{ fontSize: '14px', color: '#888c94', lineHeight: 1.6, borderLeft: '2px solid #383838', paddingLeft: '16px', marginBottom: '40px' }}>
          {QUESTIONS[step].text}
        </div>

      </div>

      {/* Footer / Actions */}
      <div style={{ padding: '24px', borderTop: '1px solid #383838', background: '#08090a', display: 'flex', gap: '12px' }}>
        {step > 0 && (
          <button 
            onClick={() => setStep(s => s - 1)}
            style={{ flex: 1, padding: '16px 0', background: 'transparent', border: '1px solid #383838', color: '#f4f1ea', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Back
          </button>
        )}
        <button 
          onClick={() => setStep(s => Math.min(QUESTIONS.length - 1, s + 1))}
          style={{ flex: 2, padding: '16px 0', background: 'transparent', border: '1px solid #d01e98', color: '#d01e98', fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit', position: 'relative' }}
        >
          {step === QUESTIONS.length - 1 ? "Complete" : "Next"}
        </button>
      </div>

    </div>
  );
}
