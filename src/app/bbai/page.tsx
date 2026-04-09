"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";

const RevealText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.22, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

const SystemLine = () => (
  <motion.div
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "circOut" }}
    className="h-[1px] w-full bg-bbai-divider origin-left my-12 md:my-24"
  />
);

export default function BBAIPage() {
  return (
    <main className="min-h-[100dvh] bg-bbai-bg text-bbai-text font-body p-4 md:p-12 selection:bg-bbai-accent selection:text-white">
      
      {/* HEADER */}
      <header className="flex justify-between items-center font-mono text-xs uppercase tracking-widest text-bbai-secondary mb-24">
        <span>BBAI_SYS // 001</span>
        <span>Infrastructure Precedes Execution</span>
      </header>

      <div className="max-w-6xl mx-auto">
        
        {/* SEC 1 */}
        <section className="mb-32">
          <RevealText>
            <h1 className="type-macro text-[clamps(3rem,8vw,8rem)] text-balance">
              Digital fog<br/>is when it starts...<br/>
              <span className="text-bbai-secondary">to spin.</span>
            </h1>
          </RevealText>
          <RevealText delay={0.1}>
            <h1 className="type-macro text-[clamps(3rem,8vw,8rem)] text-bbai-accent mt-4">
              and progress stops
            </h1>
          </RevealText>
          <RevealText delay={0.2}>
            <p className="font-mono text-bbai-secondary mt-12 bg-[#111] inline-block p-4 border border-bbai-divider">
              /// Too many options. No system connecting them.
            </p>
          </RevealText>
        </section>

        <SystemLine />

        {/* SEC 2 & 3 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div>
            <RevealText>
              <h2 className="type-macro text-4xl md:text-6xl text-bbai-secondary">
                This isn&apos;t a tool problem
              </h2>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="type-macro text-4xl md:text-6xl mt-4">
                It&apos;s a system gap
              </h2>
            </RevealText>
          </div>
          
          <div className="border border-bbai-divider p-8 bg-[#0F0F0F] relative overflow-hidden group hover:border-bbai-accent transition-colors">
            {/* Grid background effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <RevealText>
              <h2 className="type-macro text-3xl md:text-5xl text-balance relative z-10">
                The missing layer is structure
              </h2>
            </RevealText>
            <RevealText delay={0.1}>
              <p className="font-mono text-sm text-bbai-accent mt-8 relative z-10">
                [ How work flows. Where it stops. What connects. ]
              </p>
            </RevealText>
          </div>
        </section>

        <SystemLine />

        {/* SEC 4 & 5 */}
        <section className="space-y-32">
          <div className="text-center">
            <RevealText>
              <h2 className="type-macro text-5xl md:text-8xl">
                The AI Blueprint
              </h2>
            </RevealText>
            <RevealText delay={0.1}>
              <h2 className="type-macro text-5xl md:text-7xl text-bbai-secondary mb-8">
                makes the system gap visible
              </h2>
            </RevealText>
            <RevealText delay={0.2}>
              <span className="font-mono bg-white text-black px-6 py-3 font-bold uppercase tracking-widest">
                Your gap, bottleneck, and next move.
              </span>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 border-l-4 border-bbai-accent bg-[#111]">
              <RevealText>
                <h3 className="type-macro text-3xl md:text-5xl">You don&apos;t need more information</h3>
                <h3 className="type-macro text-3xl md:text-5xl text-bbai-accent mt-2">You need direction.</h3>
              </RevealText>
              <RevealText delay={0.1}>
                <p className="font-mono mt-8 text-bbai-secondary">/// What to do first. What to ignore. What moves things forward.</p>
              </RevealText>
            </div>
            
            <div className="p-8 border border-bbai-divider bg-[#151515]">
              <RevealText>
                <h3 className="type-macro text-3xl md:text-5xl">Then we build it with you</h3>
              </RevealText>
              <RevealText delay={0.1}>
                <p className="font-mono mt-8 text-bbai-secondary">/// Workflows. Systems. AI that fits how you operate.</p>
              </RevealText>
            </div>
          </div>
        </section>

        <SystemLine />

        {/* SEC 7 CTA */}
        <section className="text-center pb-32">
          <RevealText>
             <h2 className="type-macro text-5xl md:text-7xl mb-8">
               AI Blueprint: Start here
             </h2>
          </RevealText>
          <RevealText delay={0.1}>
            <Link 
              href="/bbm"
              className="inline-flex flex-col items-center group cursor-pointer"
            >
              <div className="bg-white text-black font-display uppercase text-2xl md:text-4xl px-12 py-6 flex items-center gap-4 group-hover:bg-bbai-accent group-hover:text-white transition-colors">
                Find the gap <ArrowDownRight className="w-8 h-8 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </div>
              <span className="font-mono text-xs mt-4 text-bbai-secondary tracking-widest uppercase">
                [ Before you try to fix it ]
              </span>
            </Link>
          </RevealText>
        </section>

      </div>
    </main>
  );
}
