"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const frames = [
  "Your business does not need another AI tool.",
  "It needs less digital fog.",
  "Tools multiply faster than context.",
  "Execution outpaces memory.",
  "That's Digital Fog.",
  "What follows is Digital Friction.",
  "WIN decides what matters now.",
  "GOAL governs the structure.",
  "FLOW executes the motion.",
  "Context before automation.",
  "Infrastructure before scale.",
  "Run the diagnostic.",
  "Find the Gaps."
];

export default function TBTXPage() {
  const [frameIndex, setFrameIndex] = useState(0);

  const handleNext = () => {
    if (frameIndex < frames.length) {
      setFrameIndex(prev => prev + 1);
    }
  };

  const isComplete = frameIndex === frames.length;

  return (
    <main 
      className="h-[100dvh] w-full bg-tbtx-bg text-tbtx-text flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      onClick={handleNext}
    >
      <div className="w-full max-w-7xl px-4 md:px-12 relative flex items-center justify-center">
        
        {/* FRAME COUNTER */}
        <div className="absolute top-[-20vh] left-4 md:left-12 font-mono text-sm text-tbtx-text opacity-50">
          SYS_LOG // {String(Math.min(frameIndex + 1, frames.length)).padStart(2, '0')}
        </div>

        <AnimatePresence mode="popLayout">
          {!isComplete ? (
            <motion.h1 
              key={frameIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="type-macro text-[length:clamp(4rem,10vw,12rem)] text-center text-balance w-full"
            >
              {frames[frameIndex]}
            </motion.h1>
          ) : (
            <motion.div 
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-12 w-full"
            >
              <h1 className="type-macro text-[length:clamp(4rem,10vw,8rem)] text-center w-full">
                Find the digital fog.<br/>Start with the map.
              </h1>
              
              <Link 
                href="/diagnostic"
                onClick={(e) => e.stopPropagation()} 
                className="group flex flex-col items-center gap-4"
              >
                <div className="bg-tbtx-text text-tbtx-bg font-display uppercase tracking-[-0.04em] text-2xl md:text-4xl px-12 py-6 flex items-center gap-4 hover:bg-tbtx-accent transition-colors">
                  Find the Gaps <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="font-mono text-sm text-tbtx-text opacity-70 uppercase tracking-widest">
                  Context Architecture Assessment. 10-15 min.
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CLICK TO ADVANCE INDICATOR */}
        {!isComplete && (
          <div className="absolute bottom-[-20vh] font-mono text-xs text-tbtx-text opacity-30 uppercase tracking-widest animate-pulse">
            [ Tap to advance ]
          </div>
        )}
      </div>
    </main>
  );
}
