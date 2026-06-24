"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.28, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

const BlueprintRule = () => <div className="h-px w-12 bg-[#B89A6E]/40 my-8" />;

export default function BBAIPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F4EDE3] text-[#1C1916] paper-bg font-body">
      <header className="flex justify-between items-center px-5 md:px-8 py-5 text-xs font-mono tracking-[0.12em] border-b border-[#D8D2C5]">
        <Link href="/tbtx">TRANSFORMBY10X</Link>
        <div className="text-[#B89A6E]">INFRASTRUCTURE PRECEDES EXECUTION</div>
        <Link href="/diagnostic" className="engineered-control text-[10px]">GET YOUR CUSTOM ROADMAP</Link>
      </header>

      <div className="max-w-[1080px] mx-auto px-5 md:px-8">
        {/* HERO — exact prompt headline, light blueprint */}
        <section className="pt-16 md:pt-20 pb-14">
          <RevealText>
            <div className="blueprint-label mb-3">LAYER 02 • SYSTEM ARCHITECTURE</div>
            <h1 className="type-macro text-[clamp(2.85rem,9.4vw,5.1rem)] leading-[0.84] tracking-[-0.06em]">
              BUILD THE BACKBONE<br />BEFORE YOU ADD MORE AI.
            </h1>
          </RevealText>
          <RevealText delay={0.08}>
            <p className="mt-6 max-w-[58ch] text-[15.2px] leading-[1.68]">
              BizBuilders AI designs the infrastructure, workflows, routing systems, and operating architecture that make automation and AI agents useful inside real businesses.
            </p>
          </RevealText>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/diagnostic" className="engineered-control">START WITH CONTEXT ARCHITECTURE</Link>
            <Link href="/bbm" className="engineered-control">ACTIVATE GROWTH SYSTEM</Link>
          </div>
          <p className="mt-3 text-xs text-[#B89A6E] font-mono tracking-[0.1em]">MANDATORY FIRST STEP. NO BUILD WITHOUT THE MAP.</p>
        </section>

        <BlueprintRule />

        {/* PROBLEM AS VISUAL CONDITION */}
        <section className="pb-16">
          <RevealText>
            <h2 className="type-macro text-[clamp(1.95rem,6.2vw,2.85rem)] leading-[0.9]">Digital fog is not a headline.<br />It is a visual condition.</h2>
          </RevealText>
          <RevealText delay={0.06}>
            <p className="max-w-[48ch] mt-6 text-[15px] leading-relaxed text-[#1C1916]/80">Tools multiply faster than context. Execution outpaces memory. The organizations gaining ground are governing context, preserving memory, coordinating decisions — designing for intelligence instead of accumulating software.</p>
          </RevealText>
        </section>

        {/* GOAL EMPHASIS — architectural drawings */}
        <section className="bg-[#EDE4D8] p-8 md:p-12 border border-[#B89A6E]/30 blueprint-grid mb-16">
          <div className="blueprint-label mb-2">THE ARCHITECTURE</div>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <h3 className="type-macro text-3xl md:text-[2.65rem] leading-[0.86] tracking-[-0.04em]">GOAL is the blueprint.<br />Rules + governance + operating model + architecture.</h3>
            </div>
            <div className="md:col-span-2 text-sm leading-[1.7] text-[#1C1916]/80 pt-1">
              Context Architecture is the mandatory gate. Every client must complete it before any infrastructure, automation, workflow, or agent project begins. No Context Architecture means no build.
              <div className="mt-8 text-[#2C5F4A] text-xs tracking-[0.08em]">WHEN THE INFRASTRUCTURE IS RIGHT, THE BUILDER DOES NOT NEED TO BE AN ENGINEER.</div>
            </div>
          </div>
        </section>

        {/* WIN + FLOW + FAAS quick spatial */}
        <section className="grid md:grid-cols-3 gap-4 pb-20">
          {[
            { title: "WIN", sub: "Decide what matters now. Persistent memory + recursive learning + risk routing." },
            { title: "FLOW", sub: "Execution momentum without friction. Task envelopes. Risk-classified routes. Artifacts + audit + reflection." },
            { title: "FAAS", sub: "The machinery beneath. Folders. Markdown. Scripts. Protocols. The control layer that makes AI-assisted work safe and provable." },
          ].map((item, i) => (
            <div key={i} className="border border-[#B89A6E]/30 p-7 text-sm leading-[1.65]">
              <div className="text-[#B89A6E] text-xs tracking-[0.1em] mb-2">{item.title}</div>
              {item.sub}
            </div>
          ))}
        </section>

        <div className="pb-16 text-center">
          <Link href="/diagnostic" className="engineered-control">GET YOUR CUSTOM ROADMAP</Link>
          <div className="text-[10px] mt-3 tracking-[0.1em] text-[#B89A6E]">INTAKE • BLUEPRINT • IMPLEMENTATION</div>
        </div>
      </div>

      <footer className="text-[10px] font-mono px-5 md:px-8 py-6 text-[#B89A6E] border-t border-[#D8D2C5] tracking-[0.1em]">
        BIZBUILDERS AI — A TRANSFORMBY10X COMPANY • INFRASTRUCTURE BEFORE ACCELERATION
      </footer>
    </main>
  );
}
