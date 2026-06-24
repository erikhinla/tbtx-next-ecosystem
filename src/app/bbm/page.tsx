"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { intakeConfig, Archetype } from "@/config/intakeQuestions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BBMPage() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [scores, setScores] = useState<Record<Archetype, number>>({
    toolOverload: 0,
    bottleneckOperator: 0,
    fragmentedWorkflow: 0,
    executionStall: 0,
  });

  const isFinished = currentQIndex >= intakeConfig.length;
  const topArchetype = Object.keys(scores).reduce((a, b) => scores[a as Archetype] > scores[b as Archetype] ? a : b) as Archetype;
  const formatArchetype = (str: string) => str.replace(/([A-Z])/g, ' $1').toUpperCase();

  const handleSelect = (weights: Partial<Record<Archetype, number>>) => {
    setScores(prev => {
      const next = { ...prev };
      Object.keys(weights).forEach(k => { next[k as Archetype] += weights[k as Archetype] || 0; });
      return next;
    });
    setCurrentQIndex(prev => prev + 1);
  };

  const clarityScore = Math.min(100, Math.round(((currentQIndex) / intakeConfig.length) * 100));
  const getStatus = () => {
    if (isFinished) return formatArchetype(topArchetype);
    return currentQIndex < 6 ? "MAPPING GAPS" : currentQIndex < 11 ? "TRACING ROUTES" : "COMPILING BLUEPRINT";
  };

  return (
    <main className="min-h-[100dvh] bg-[#F4EDE3] text-[#1C1916] font-body paper-bg overflow-hidden flex flex-col">
      {/* HEADER */}
      <header className="px-5 md:px-8 py-4 flex justify-between items-center text-xs font-mono tracking-[0.12em] border-b border-[#D8D2C5] z-10 bg-[#F4EDE3]/95 backdrop-blur">
        <Link href="/tbtx">TRANSFORMBY10X</Link>
        <div>ACTIVATION LAYER • UNLOCKS AFTER GOAL</div>
        <Link href="/diagnostic" className="engineered-control text-[10px]">ACTIVATE GROWTH SYSTEM</Link>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* LEFT — PRESS / HEADLINE IN LIGHT PAPER */}
        <div className="md:w-5/12 px-6 md:px-10 pt-10 pb-8 md:pb-0 border-b md:border-b-0 md:border-r border-[#D8D2C5] flex flex-col justify-center bg-[#EDE4D8]">
          <div className="blueprint-label mb-4">LAYER 03 • REVENUE ACTIVATION</div>
          <h1 className="type-macro text-[clamp(2.35rem,8.2vw,3.85rem)] leading-[0.86] tracking-[-0.055em] max-w-[15ch]">
            STOP LOSING LEADS BEFORE THEY BECOME CUSTOMERS.
          </h1>
          <p className="mt-6 max-w-[42ch] text-[15px] leading-[1.65]">BizBot Marketing installs AI voice, follow-up, and marketing automation systems that help local businesses capture, nurture, and convert more demand.</p>
          <div className="mt-auto pt-12 text-xs text-[#B89A6E] font-mono tracking-[0.08em]">COMPLETE CONTEXT ARCHITECTURE FIRST. GROWTH ON BROKEN INFRASTRUCTURE CREATES FASTER CHAOS.</div>
        </div>

        {/* RIGHT — DIAGNOSTIC SURFACE AS BLUEPRINT ENGINE */}
        <div className="md:w-7/12 flex flex-col bg-[#F4EDE3] p-6 md:p-10 relative">
          <div className="font-mono text-xs text-[#B89A6E] flex gap-8 border-b border-[#D8D2C5] pb-3 mb-8">
            <div>SYSTEM STATUS: <span className="text-[#1C1916]">{getStatus()}</span></div>
            <div>CLARITY: {clarityScore}%</div>
          </div>

          {!isFinished ? (
            <AnimatePresence mode="wait">
              <motion.div key={currentQIndex} initial={{opacity:0, y:12}} animate={{opacity:1,y:0}} className="flex-1 flex flex-col">
                <div className="blueprint-label mb-2">Q{String(currentQIndex+1).padStart(2,'0')} / 15</div>
                <h3 className="type-macro text-[clamp(1.65rem,5.2vw,2.35rem)] leading-[0.92] tracking-[-0.03em] max-w-[26ch]">
                  {intakeConfig[currentQIndex].question}
                </h3>

                <div className="mt-auto grid gap-2.5 pt-8">
                  {intakeConfig[currentQIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt.weights)}
                      className="engineered-control justify-start text-left py-4 px-5 text-sm tracking-normal normal-case border-[#B89A6E] hover:border-[#2C5F4A]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="blueprint-label mb-3">BLUEPRINT COMPILED</div>
              <h2 className="type-macro text-4xl md:text-5xl tracking-[-0.04em]">Ready for activation.</h2>
              <p className="mt-3 text-sm max-w-[32ch]">Your system is mapped. The next move is governed by the architecture you now have.</p>

              <Link href={`/diagnostic/blueprint?archetype=${topArchetype}`} className="engineered-control mt-9">
                OPEN BLUEPRINT <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-[#D8D2C5] text-[10px] font-mono tracking-[0.1em] text-[#B89A6E]">
            BIZBOT MRKTNG • VOICE • FOLLOW-UP • CONVERSION • ONLY AFTER THE BACKBONE
          </div>
        </div>
      </div>
    </main>
  );
}
