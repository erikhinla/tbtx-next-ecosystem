"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { intakeConfig, Archetype } from "@/config/intakeQuestions";
import { ArrowRight, TerminalSquare } from "lucide-react";
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
  
  // Calculate top archetype for display
  const topArchetype = Object.keys(scores).reduce((a, b) => scores[a as Archetype] > scores[b as Archetype] ? a : b) as Archetype;
  
  const formatArchetype = (str: string) => str.replace(/([A-Z])/g, ' $1').toUpperCase();

  const handleSelect = (weights: Partial<Record<Archetype, number>>) => {
    // Tally points
    setScores(prev => {
      const next = { ...prev };
      Object.keys(weights).forEach(k => {
        next[k as Archetype] += weights[k as Archetype] || 0;
      });
      return next;
    });
    
    setCurrentQIndex(prev => prev + 1);
  };

  const clarityScore = Math.min(100, Math.round(((currentQIndex) / intakeConfig.length) * 100));
  
  const systemStatusMap = {
    0: "AWAITING INPUT",
    1: "FRAGMENTED",
    2: "FRAGMENTED",
    3: "DISCONNECTED",
    4: "DISCONNECTED",
    5: "BOTTLENECK DETECTED",
  };
  const getStatus = () => {
    if (isFinished) return formatArchetype(topArchetype);
    if (currentQIndex < 5) return systemStatusMap[currentQIndex as keyof typeof systemStatusMap] || "MAPPING";
    if (currentQIndex < 10) return "ANALYZING WORKFLOW";
    return "COMPILING GAPS";
  };

  const avaMessage = () => {
    if (isFinished) return "I HAVE ENOUGH TO MAP THIS.\nLET'S BUILD YOUR BLUEPRINT.";
    if (currentQIndex === 1) return "THIS IS USUALLY WHERE SYSTEMS BREAK FIRST.";
    if (currentQIndex === 7) return "YOU'RE NOT OVERLOADED.\nYOUR FLOW IS DISCONNECTED.";
    return null;
  };

  return (
    <main className="h-[100dvh] bg-bbm-bg text-bbm-text flex flex-col md:flex-row overflow-hidden font-body">
      
      {/* LEFT PANEL - Persistent */}
      <div className="flex-1 p-8 md:p-16 border-b md:border-b-0 md:border-r border-[#333] flex flex-col justify-center relative bg-bbm-bg">
        <div className="absolute top-8 left-8 font-mono text-xs tracking-widest text-[#666]">
          BBM_OS // LIVE DIAGNOSTIC
        </div>
        
        <h1 className="type-macro text-5xl md:text-[clamp(3.5rem,6vw,7rem)] leading-[0.9]">
          Your progress<br/>isn&apos;t slow
        </h1>
        <h1 className="type-macro text-5xl md:text-[clamp(3.5rem,6vw,7rem)] leading-[0.9] text-bbm-accent mt-4">
          Your system<br/>is unclear
        </h1>
        
        <div className="mt-12 font-mono border border-[#333] p-4 inline-block self-start text-[#AAA]">
          &gt;&gt;&gt; THAT&apos;S DIGITAL FOG.
        </div>
      </div>

      {/* RIGHT PANEL - Interactive Diagnostic Surface */}
      <div className="flex-1 bg-[#111] p-8 md:p-16 flex flex-col relative overflow-y-auto">
        
        {/* Status Header */}
        <div className="font-mono text-sm grid grid-cols-2 md:grid-cols-3 gap-4 border-b border-[#333] pb-6 mb-12 uppercase">
          <div>
            <span className="text-[#666] block">System Status:</span>
            <motion.span key={currentQIndex} initial={{opacity:0}} animate={{opacity:1}} className={isFinished ? "text-red-500" : "text-white"}>
              {getStatus()}
            </motion.span>
          </div>
          <div>
            <span className="text-[#666] block">Clarity:</span>
            <span className="text-white">{clarityScore}%</span>
          </div>
          <div>
            <span className="text-[#666] block">Blueprint:</span>
            {isFinished ? (
              <span className="bg-bbm-accent text-[#000] px-2 font-bold animate-pulse">READY</span>
            ) : (
              <span className="text-[#444]">--</span>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {!isFinished ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentQIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: {duration: 0} }}
                transition={{ duration: 0.14 }} // 140ms precise entry
                className="flex-1 flex flex-col"
              >
                <div className="font-mono text-bbm-accent mb-4 tracking-widest text-xs">
                  [ Q{String(currentQIndex + 1).padStart(2, '0')} / 15 ]
                </div>
                <h3 className="type-macro text-3xl md:text-5xl mb-12">
                  {intakeConfig[currentQIndex].question}
                </h3>
                
                <div className="flex flex-col gap-4 mt-auto">
                  {intakeConfig[currentQIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt.weights)}
                      className="text-left font-display uppercase tracking-widest text-xl border border-[#333] p-4 md:p-6 hover:bg-white hover:text-black hover:border-white transition-colors duration-200"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col items-center justify-center text-center gap-8"
            >
              <TerminalSquare className="w-16 h-16 text-bbm-accent" />
              <div>
                <h2 className="type-macro text-4xl md:text-6xl mb-4 text-[#FFF]">Compile Complete</h2>
                <p className="font-mono text-[#AAA]">Diagnostic mapped: {formatArchetype(topArchetype)}</p>
              </div>
              
              <Link 
                href={`/diagnostic/blueprint?archetype=${topArchetype}`}
                className="mt-8 bg-bbm-accent text-[#000] font-display uppercase tracking-tight text-3xl px-12 py-6 flex items-center gap-4 hover:bg-white transition-colors group"
              >
                Open Blueprint <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </Link>
              <span className="font-mono text-xs text-[#666] uppercase tracking-widest">
                See what to fix first and how to implement it
              </span>
            </motion.div>
          )}

          {/* AVA Context */}
          {avaMessage() && !isFinished && (
            <motion.div 
              initial={{ opacity: 0, borderLeft: "0px solid #4DA3FF" }}
              animate={{ opacity: 1, borderLeft: "4px solid #4DA3FF" }}
              className="mt-12 bg-[#1A1A1A] p-6 font-mono text-sm leading-relaxed whitespace-pre-line"
            >
              <strong className="text-bbm-accent block mb-2">AVA_ENGINE:</strong>
              {avaMessage()}
            </motion.div>
          )}
        </div>

      </div>
    </main>
  );
}
