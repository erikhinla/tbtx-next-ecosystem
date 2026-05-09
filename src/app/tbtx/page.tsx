"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function TBTXPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.3 },
  };

  return (
    <main className="w-full bg-tbtx-bg text-tbtx-text">
      
      {/* HERO SECTION */}
      <section id="hero" className="h-[100dvh] w-full flex items-center justify-center relative">
        <div className="w-full max-w-7xl px-4 md:px-12 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-8"
          >
            <div className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
              [ SEC_001 ] TransformBy10X
            </div>

            <h1 className="type-macro text-[length:clamp(3rem,9vw,11rem)] text-balance w-full">
              Your system isn't<br />
              <span className="text-tbtx-accent">broken</span>
            </h1>

            <p className="font-outfit text-lg md:text-xl text-tbtx-text opacity-80 max-w-2xl mx-auto leading-relaxed">
              Momentum isn't blocked by tools. It's blocked by invisible infrastructure gaps. We call it digital fog. You're about to see it.
            </p>

            <div className="flex justify-center pt-6">
              <Link href="#diagnostic" className="group flex flex-col items-center gap-4 hover:opacity-100 opacity-80 transition-opacity">
                <div className="bg-tbtx-text text-tbtx-bg font-display uppercase tracking-[-0.04em] text-lg md:text-2xl px-8 md:px-12 py-4 md:py-6 flex items-center gap-4 hover:bg-tbtx-accent transition-colors">
                  Scan Your System <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="font-mono text-xs text-tbtx-text opacity-70 uppercase tracking-widest">
                  [ Identify blockers ]
                </span>
              </Link>
            </div>

            <div className="font-mono text-xs text-tbtx-text opacity-30 uppercase tracking-widest pt-4 animate-pulse">
              [ Scroll to continue ]
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIGITAL FOG DIAGNOSTIC SECTION */}
      <section id="diagnostic" className="min-h-fit w-full py-24 md:py-32 flex items-center justify-center border-t structural-border">
        <div className="w-full max-w-7xl px-4 md:px-12">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
                [ SEC_002 ] Diagnostic
              </div>
              <h2 className="type-macro text-[length:clamp(2.5rem,7vw,5rem)] text-balance">
                What's Blocking<br />
                <span className="text-tbtx-accent">Progress?</span>
              </h2>
            </div>

            <p className="font-outfit text-lg md:text-xl text-tbtx-text opacity-80 max-w-3xl leading-relaxed">
              Digital fog is the gap between execution and intent. It's where time goes. The diagnostic reveals it in three dimensions: your systems, your people, and your process.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { label: "SYSTEMS", desc: "Your tools, integrations, data flows, and visibility gaps." },
                { label: "PEOPLE", desc: "Skill gaps, context distribution, and decision-making bottlenecks." },
                { label: "PROCESS", desc: "How work actually moves versus how you think it does." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="p-6 structural-border bg-tbtx-bg hover:bg-opacity-50 transition-colors"
                >
                  <div className="font-mono text-xs text-tbtx-accent uppercase tracking-widest mb-3">
                    {item.label}
                  </div>
                  <p className="font-outfit text-sm text-tbtx-text opacity-75">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-4 pt-8">
              <Link href="/bbm" className="group">
                <div className="bg-tbtx-text text-tbtx-bg font-display uppercase tracking-[-0.04em] px-8 py-4 flex items-center gap-3 hover:bg-tbtx-accent transition-colors">
                  Run Diagnostic <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link href="/bbai" className="group">
                <div className="border structural-border text-tbtx-text font-display uppercase tracking-[-0.04em] px-8 py-4 flex items-center gap-3 hover:bg-tbtx-text hover:text-tbtx-bg transition-colors">
                  B2B Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OFFERS SECTION */}
      <section id="offers" className="min-h-fit w-full py-24 md:py-32 flex items-center justify-center border-t structural-border">
        <div className="w-full max-w-7xl px-4 md:px-12">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
                [ SEC_003 ] Offers
              </div>
              <h2 className="type-macro text-[length:clamp(2.5rem,7vw,5rem)] text-balance">
                Choose Your<br />
                <span className="text-tbtx-accent">Entry Point</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { price: "$7", title: "Diagnostic Scan", desc: "See what's causing digital fog in your systems, people, and process." },
                { price: "$27", title: "Infrastructure Map", desc: "30-day roadmap to fix the top 3 blockers with specific next steps." },
                { price: "$97", title: "Blueprint Session", desc: "Build the execution plan with our team. Direct feedback on your system." },
              ].map((offer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="p-8 structural-border flex flex-col justify-between"
                >
                  <div className="space-y-4 flex-1">
                    <div className="text-tbtx-accent font-display text-2xl font-bold">
                      {offer.price}
                    </div>
                    <h3 className="font-outfit font-bold text-lg">
                      {offer.title}
                    </h3>
                    <p className="font-outfit text-sm text-tbtx-text opacity-75">
                      {offer.desc}
                    </p>
                  </div>
                  <button className="mt-6 border structural-border text-tbtx-text font-display uppercase tracking-[-0.04em] px-6 py-3 hover:bg-tbtx-text hover:text-tbtx-bg transition-colors w-full">
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 text-center">
              <p className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
                [ Money-back guarantee if you don't see the fog ]
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOUNDER STORY SECTION */}
      <section id="story" className="min-h-fit w-full py-24 md:py-32 flex items-center justify-center border-t structural-border">
        <div className="w-full max-w-7xl px-4 md:px-12">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
                [ SEC_004 ] Story
              </div>
              <h2 className="type-macro text-[length:clamp(2.5rem,7vw,5rem)] text-balance">
                Why We Built<br />
                <span className="text-tbtx-accent">This</span>
              </h2>
            </div>

            <div className="max-w-3xl space-y-6">
              <p className="font-outfit text-lg text-tbtx-text opacity-90 leading-relaxed">
                We watched teams with brilliant people and solid tools fail to compound. They weren't broken. They were fogged. Work was happening everywhere. Nothing was progressing anywhere.
              </p>

              <p className="font-outfit text-lg text-tbtx-text opacity-90 leading-relaxed">
                The pattern was always the same: Systems didn't talk to each other. People didn't have the same map. Process gaps meant the same fires got fought twice. Context lived in people's heads, not in the system.
              </p>

              <p className="font-outfit text-lg text-tbtx-text opacity-90 leading-relaxed">
                So we built a way to see it, map it, and fix it. Not by replacing tools. By connecting them. Not by hiring smarter people. By distributing the intelligence they already have.
              </p>

              <div className="pt-4 border-t structural-border pt-6">
                <div className="font-mono text-xs text-tbtx-accent uppercase tracking-widest mb-2">
                  [ Our Mission ]
                </div>
                <p className="font-outfit text-lg text-tbtx-text font-bold">
                  Turn digital fog into systems that compound.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PROOF OF WORK SECTION */}
      <section id="proof" className="min-h-fit w-full py-24 md:py-32 flex items-center justify-center border-t structural-border">
        <div className="w-full max-w-7xl px-4 md:px-12">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
                [ SEC_005 ] Proof
              </div>
              <h2 className="type-macro text-[length:clamp(2.5rem,7vw,5rem)] text-balance">
                What We've<br />
                <span className="text-tbtx-accent">Built</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {[
                { title: "FLOW Agent AS", desc: "Governed multi-agent orchestration. Intake → Routing → Execution → Audit.", link: "/flow" },
                { title: "BizBuilders AI", desc: "B2B infrastructure assessment. AVA-guided intake. Blueprint generation. Call booking.", link: "/bbai" },
                { title: "Prompting Circumstance", desc: "Proof-of-concept publishing system. Multi-channel distribution and attribution.", link: "/poc" },
                { title: "Digital Fog Diagnostic", desc: "Self-serve scan that identifies where your system is leaking momentum.", link: "/bbm" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                  className="p-8 structural-border space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-outfit font-bold text-lg">
                      {item.title}
                    </h3>
                    <CheckCircle className="w-5 h-5 text-tbtx-accent flex-shrink-0 mt-1" />
                  </div>
                  <p className="font-outfit text-sm text-tbtx-text opacity-75">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* BIZBUILDERS BRIDGE SECTION */}
      <section id="bizbuilders" className="min-h-fit w-full py-24 md:py-32 flex items-center justify-center border-t structural-border bg-tbtx-bg">
        <div className="w-full max-w-7xl px-4 md:px-12">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="flex flex-col gap-2">
              <div className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
                [ SEC_006 ] Next
              </div>
              <h2 className="type-macro text-[length:clamp(2.5rem,7vw,5rem)] text-balance">
                Ready to Move<br />
                <span className="text-tbtx-accent">Fast?</span>
              </h2>
            </div>

            <p className="font-outfit text-lg md:text-xl text-tbtx-text opacity-80 max-w-3xl leading-relaxed">
              TransformBy10X is the philosophy. BizBuilders AI is the infrastructure plan. If you're an organized team ready to execute, BizBuilders has the blueprint, the agents, and the activation layer.
            </p>

            <div className="flex flex-col md:flex-row gap-6 pt-8">
              <Link href="/bbai" className="group flex-1">
                <div className="bg-tbtx-text text-tbtx-bg font-display uppercase tracking-[-0.04em] text-lg px-8 py-6 flex items-center justify-center gap-3 hover:bg-tbtx-accent transition-colors h-full">
                  Explore BizBuilders <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
              <Link href="/bbm" className="group flex-1">
                <div className="border structural-border text-tbtx-text font-display uppercase tracking-[-0.04em] text-lg px-8 py-6 flex items-center justify-center gap-3 hover:bg-tbtx-text hover:text-tbtx-bg transition-colors h-full">
                  Start Free Diagnostic <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-12 md:py-16 border-t structural-border">
        <div className="w-full max-w-7xl px-4 md:px-12 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <div className="font-mono text-xs text-tbtx-text opacity-50 uppercase tracking-widest">
                TransformBy10X
              </div>
              <p className="font-outfit text-sm text-tbtx-text opacity-75">
                Infrastructure for momentum. Systems that compound.
              </p>
            </div>
            <div className="flex gap-8 text-sm font-mono">
              <Link href="/bbai" className="text-tbtx-text opacity-75 hover:opacity-100 transition-opacity">
                BizBuilders
              </Link>
              <Link href="/flow" className="text-tbtx-text opacity-75 hover:opacity-100 transition-opacity">
                FLOW Agent AS
              </Link>
              <Link href="/" className="text-tbtx-text opacity-75 hover:opacity-100 transition-opacity">
                Home
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
