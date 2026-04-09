"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const frames = [
  "Busyness is happening",
  "Nothing progresses",
  "That's digital fog.",
  "It doesn't look like failure",
  "It looks like movement",
  "That never compounds.",
  "You don't need more tools",
  "You need a system for momentum.",
  "Intelligence isn't in the tools",
  "It's in the infrastructure.",
  "The AI Blueprint",
  "shows where gaps exist",
  "and how to get unstuck."
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
              exit={{ opacity: 0, transition: { duration: 0 } }} // HARD CUT
              transition={{ duration: 0.16, ease: "easeOut" }} // 160ms precise entry
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
                Run the<br/><span className="text-tbtx-accent">diagnostic</span>
              </h1>
              
              <Link 
                href="/bbm"
                onClick={(e) => e.stopPropagation()} 
                className="group flex flex-col items-center gap-4"
              >
                <div className="bg-tbtx-text text-tbtx-bg font-display uppercase tracking-[-0.04em] text-2xl md:text-4xl px-12 py-6 flex items-center gap-4 hover:bg-tbtx-accent transition-colors">
                  Initiate Scan <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="font-mono text-sm text-tbtx-text opacity-70 uppercase tracking-widest">
                  See what&apos;s blocking progress.
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
