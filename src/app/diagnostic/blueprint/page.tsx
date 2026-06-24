"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import type { Archetype } from "@/config/intakeQuestions";

const archetypeMap: Record<Archetype, { name: string, status: string, fix: string, next: string }> = {
  toolOverload: {
    name: "Tool Overload",
    status: "Fragmented",
    fix: "Consolidate tools and remove duplicate steps.",
    next: "Reduce stack complexity before applying automation."
  },
  bottleneckOperator: {
    name: "Bottleneck Operator",
    status: "Owner-Dependent",
    fix: "Externalize decisions and standardize handoffs.",
    next: "Remove single-point dependency from operations."
  },
  fragmentedWorkflow: {
    name: "Fragmented Workflow",
    status: "Disconnected",
    fix: "Create one workflow spine and one context layer.",
    next: "Connect inputs, decisions, and outputs structurally."
  },
  executionStall: {
    name: "Execution Stall",
    status: "Stalled",
    fix: "Define completion triggers and close open loops.",
    next: "Move from reactive work to structured progression."
  }
};

function BlueprintContent() {
  const searchParams = useSearchParams();
  const rawArchetype = searchParams.get("archetype") as Archetype | null;
  const targetArchetype = rawArchetype && archetypeMap[rawArchetype] ? rawArchetype : "fragmentedWorkflow";
  const data = archetypeMap[targetArchetype];

  return (
    <main className="min-h-[100dvh] bg-[#F4EDE3] text-[#1C1916] paper-bg p-5 md:p-10 font-body">
      <header className="flex justify-between items-center pb-8 border-b border-[#D8D2C5] mb-12 md:mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#B89A6E]">AI BLUEPRINT // CONTEXT ARCHITECTURE RESULT</div>
        <Link href="/tbtx" className="engineered-control text-[10px]">
          <ArrowLeft className="w-3.5 h-3.5" /> BACK TO THE MAP
        </Link>
      </header>

      <div className="max-w-4xl mx-auto space-y-16 md:space-y-20">
        <section>
          <div className="blueprint-label mb-2">01 / SYSTEM FORM</div>
          <h1 className="type-macro text-[clamp(2.4rem,8vw,3.85rem)] leading-[0.86] tracking-[-0.05em]">{data.name}</h1>
          <div className="inline-block mt-4 px-4 py-1 border border-[#B89A6E] text-xs tracking-[0.12em] text-[#B89A6E]">STATUS: {data.status}</div>
        </section>

        <section className="border-l-2 border-[#2C5F4A] pl-6">
          <div className="blueprint-label mb-2">02 / THE INITIAL FIX</div>
          <h2 className="type-macro text-[clamp(1.85rem,5.8vw,2.8rem)] leading-[0.9] text-[#2C5F4A]">{data.fix}</h2>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7]">Treating symptoms only thickens the fog. Correct the underlying operating architecture first.</p>
        </section>

        <section>
          <div className="blueprint-label mb-2">03 / IMPLEMENTATION</div>
          <h2 className="type-macro text-[clamp(1.7rem,5.5vw,2.65rem)] leading-[0.9] mb-4">{data.next}</h2>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={() => window.print()} className="engineered-control">
              <Download className="w-4 h-4" /> EXPORT BLUEPRINT
            </button>
            <Link href="/bbai" className="engineered-control">BUILD THE BACKBONE</Link>
          </div>
        </section>
      </div>

      <footer className="mt-20 text-[10px] font-mono text-[#B89A6E] tracking-[0.1em]">EVERY ASSET ROUTES TO A FUNNEL. CONTEXT ARCHITECTURE FIRST.</footer>
    </main>
  );
}

export default function BlueprintPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#F4EDE3] flex items-center justify-center font-mono text-xs tracking-[0.1em]">COMPILING BLUEPRINT...</div>}>
      <BlueprintContent />
    </Suspense>
  );
}
