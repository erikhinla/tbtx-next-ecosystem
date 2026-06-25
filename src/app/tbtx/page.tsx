"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Simple inline route line component - disciplined green signal + solar brass, with motion class for anim
const RouteLine = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="100%" height="100%" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path className="route-line" d="M10 70 Q60 10 110 40 Q160 65 190 15" stroke="#24513F" strokeWidth="1.25" strokeLinecap="square" />
    <path d="M20 68 Q55 25 105 38" stroke="#B89A6E" strokeWidth="0.75" strokeLinecap="square" opacity="0.6" />
  </svg>
);

// Blueprint annotation plate
const BlueprintPlate = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border border-[#B89A6E]/40 p-6 md:p-8 bg-[rgba(237,228,216,0.6)] relative">
    <div className="blueprint-label absolute -top-2 left-4 bg-[#F4EDE3] px-2 tracking-[0.15em]">{label}</div>
    {children}
  </div>
);

export default function TBTXPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F4EDE3] text-[#1C1916] font-body overflow-x-hidden paper-bg relative">
      {/* Full-bleed cinematic video bg + paper overlay for the light refs direction: cinematic imagery under daylight paper, with motion on routes */}
      <video 
        className="cinematic-bg" 
        src="/videos/digital-fog-hero.mp4" 
        autoPlay 
        muted 
        loop 
        playsInline 
        aria-hidden="true" 
      />
      {/* HEADER - minimal, exact */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-4 text-xs font-mono tracking-[0.12em] border-b border-[#D8D2C5] bg-[#F4EDE3]/95 backdrop-blur-sm">
        <div>TRANSFORMBY10X</div>
        <div className="text-[#B89A6E]">CONTEXT BEFORE AUTOMATION</div>
        <Link href="/diagnostic" className="engineered-control text-[10px]">FIND THE GAPS</Link>
      </header>

      {/* OPENING SEQUENCE: PRESS RELEASE AS SPATIAL DESCENT (from reference frames) */}
      <section className="pt-20 md:pt-24 pb-16 md:pb-24 px-5 md:px-8 max-w-[1080px] mx-auto fog-dissolve relative z-10">
        <div className="max-w-[18ch] mb-10">
          <div className="blueprint-label mb-3">FOR IMMEDIATE RELEASE • 2026</div>
          <h1 className="type-macro text-[clamp(2.6rem,9.2vw,4.4rem)] leading-[0.86] tracking-[-0.065em]">
            THE AI ERA CREATED A JOB NOBODY ASKED FOR
          </h1>
        </div>

        <div className="max-w-[62ch] text-[15px] md:text-[15.5px] leading-[1.65] text-[#1C1916]/90 space-y-6 font-light">
          <p>After years of promises that software would simplify work, a new role has quietly emerged inside businesses across the world… but…</p>
          <p>The job title doesn’t officially exist. Yet millions of people are already doing it. They spend their days moving information between tools, translating context between teams, checking the work of automations, feeding AI systems missing details, chasing follow-ups, and reconnecting conversations that were separated by software.</p>
          <p>The role has many names: Founder. Operator. Project Manager. Agency Owner. Consultant. Director. The responsibilities are remarkably similar. Part air traffic controller. Part librarian. Part systems integrator. Part therapist for software.</p>
          <p>The AI era didn’t eliminate complexity. It accelerated it. Every new tool promised leverage. Every new automation promised speed. Every new AI promised intelligence. The result wasn’t always efficiency. Often it was <span className="text-[#2C5F4A] font-medium">Digital Fog</span>.</p>
          <p>Too many tools. Too much information. Too many disconnected decisions. What follows is Digital Friction. The drag created when execution outpaces context.</p>
          <p className="pt-3 border-t border-[#B89A6E]/30 text-[#B89A6E]">The organizations gaining ground aren’t necessarily adopting more AI. They’re building better operating systems. They’re governing context. Preserving memory. Coordinating decisions.</p>
        </div>

        <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-[0.1em] font-mono text-[#B89A6E]">
          <div>WIN DECIDES</div>
          <div className="h-px w-8 bg-[#B89A6E]/50" />
          <div>GOAL GOVERNS</div>
          <div className="h-px w-8 bg-[#B89A6E]/50" />
          <div>FLOW EXECUTES</div>
        </div>
      </section>

      {/* WIN — BEAM OF SIGNAL CUTTING THROUGH NOISE (from ref frames) */}
      <section className="descent-section mobile-descent px-5 md:px-8 max-w-[1080px] mx-auto border-[#D8D2C5] relative z-10">
        <div className="grid md:grid-cols-12 gap-x-8 gap-y-8 items-start">
          <div className="md:col-span-5">
            <div className="blueprint-label mb-2">LAYER 01 • SIGNAL</div>
            <h2 className="type-macro text-[clamp(2.1rem,7.5vw,3.4rem)] leading-none tracking-[-0.06em]">WIN<br />What’s Important Now</h2>
          </div>
          <div className="md:col-span-7 text-[15px] leading-[1.7] max-w-[52ch]">
            A framework that illuminates paths through noise. The beam of signal that recovers priority from digital fog. Persistent memory (Workstream Impact Node) + recursive learning (Workstream Intellect Nexus). Routes work by risk before anything executes.
            <div className="mt-8 text-[#2C5F4A] font-medium text-sm tracking-[0.05em]">THE LIMITING FACTOR IF THIS GOES WRONG DETERMINES THE ROUTE.</div>
          </div>
        </div>

        {/* Visual: Signal beam treatment with pulse anim */}
        <div className="mt-10 relative h-[120px] md:h-[160px] flex items-center overflow-hidden border-l-2 border-[#2C5F4A] pl-4">
          <div className="text-[11px] font-mono text-[#B89A6E] absolute top-3 left-6 tracking-[2px]">SIGNAL BEAM — CUTTING NOISE</div>
          <RouteLine className="w-full max-w-[420px] opacity-80" />
        </div>
      </section>

      {/* GOAL — ARCHITECTURAL DRAWINGS + SPATIAL STRUCTURE */}
      <section className="descent-section mobile-descent px-5 md:px-8 max-w-[1080px] mx-auto bg-[#EDE4D8] blueprint-grid relative z-10">
        <div className="max-w-[1080px] mx-auto">
          <div className="mb-8">
            <div className="blueprint-label mb-1.5">LAYER 02 • BLUEPRINT</div>
            <h2 className="type-macro text-[clamp(2.1rem,7.5vw,3.35rem)] leading-[0.86] tracking-[-0.06em]">GOAL<br />Governed Operational Architecture Logic</h2>
            <p className="max-w-[48ch] mt-4 text-[15px] leading-relaxed">The architecture underneath. Rules, schemas, governance, relationships, protocols. GOAL creates the conditions for FLOW. Without it, every new layer just increases Digital Fog.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <BlueprintPlate label="STRUCTURE">
              <div className="text-sm leading-[1.65]">Quad Keystone: Folders hold durable state. Markdown holds memory and instructions. Scripts enforce validation and quality gates. Protocols define ownership, escalation, and completion.</div>
            </BlueprintPlate>
            <BlueprintPlate label="GOVERNANCE">
              <div className="text-sm leading-[1.65]">Risk-tiered routing is the discipline. Reputation risk to Alpha. Time-loss to Beta. Downtime, security, money, production to Gamma. Two-pass execution with rollback for high-risk work.</div>
            </BlueprintPlate>
          </div>

          <div className="mt-8 text-[10px] font-mono tracking-[0.12em] text-[#B89A6E] flex items-center gap-3">
            <span>DIGITAL FOG = LACK OF GOAL</span> <span className="h-px flex-1 bg-[#B89A6E]/40" />
          </div>
        </div>
      </section>

      {/* FLOW — CIRCULATION, ROUTES, MOVEMENT with anim */}
      <section className="descent-section mobile-descent px-5 md:px-8 max-w-[1080px] mx-auto relative z-10">
        <div className="md:flex md:items-end md:justify-between mb-8 gap-8">
          <div>
            <div className="blueprint-label mb-1">LAYER 03 • MOTION</div>
            <h2 className="type-macro text-[clamp(2.1rem,7.5vw,3.3rem)] leading-[0.86] tracking-[-0.055em]">FLOW<br />Frictionless Leveraged Orchestrated Workflow</h2>
          </div>
          <p className="max-w-[38ch] mt-4 md:mt-0 text-sm text-[#1C1916]/75">The resulting state when WIN and GOAL are working. Execution momentum without unnecessary friction. The control layer around AI-assisted work.</p>
        </div>

        {/* Circulation routes visual - animated */}
        <div className="relative border border-[#B89A6E]/30 p-8 md:p-12 bg-white/40">
          <div className="blueprint-label mb-4">CIRCULATION PATHS • ROUTES • ORCHESTRATION</div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            <div className="flex-1">
              <RouteLine className="h-20 w-full mb-2" />
              <div className="text-xs text-[#B89A6E]">Validated task envelopes move through risk-classified routes. Artifacts written. Audit captured. Reflection feeds WIN memory.</div>
            </div>
            <div className="text-sm max-w-[34ch] border-l border-[#B89A6E]/30 pl-6 text-[#1C1916]/80">
              Simple work moves quickly. High-risk work slows on purpose and requires review. Nothing important disappears into a chat thread.
            </div>
          </div>
        </div>

        <div className="mt-3 text-right text-[10px] tracking-[0.1em] font-mono text-[#2C5F4A]">FAAS IS THE RUNTIME IMPLEMENTATION OF GOAL + FLOW</div>
      </section>

      {/* FAAS — MACHINERY BENEATH THE CITY + CTA */}
      <section className="descent-section mobile-descent px-5 md:px-8 max-w-[1080px] mx-auto border-b border-[#D8D2C5] pb-20 relative z-10">
        <div className="max-w-2xl">
          <div className="blueprint-label mb-2">INFRASTRUCTURE • THE CONTROL LAYER</div>
          <h2 className="type-macro text-[clamp(1.9rem,6.8vw,2.95rem)] leading-[0.9] tracking-[-0.05em] mb-6">
            FAAS<br />FLOW Agent AS<br />Execution Governance for AI-Assisted Work
          </h2>
          <p className="text-[15px] leading-[1.7] max-w-[52ch]">Most AI tools can generate. Very few can safely govern what happens next. FAAS is the machinery: folders, markdown, scripts, protocols. The boring permanent base layer that lets everything else run with confidence.</p>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <Link href="/diagnostic" className="engineered-control">START THE ASSESSMENT — FIND THE GAPS</Link>
          <Link href="/bbai" className="engineered-control">BUILD THE BACKBONE</Link>
        </div>
      </section>

      <footer className="text-[10px] font-mono tracking-[0.1em] px-5 md:px-8 py-6 text-[#B89A6E] border-t border-[#D8D2C5] flex flex-wrap gap-x-6 gap-y-1">
        <span>© TRANSFORMBY10X 2026</span>
        <span>INTELLIGENCE IS NOT IN THE TOOLS. IT IS IN THE INFRASTRUCTURE.</span>
      </footer>
    </main>
  );
}
