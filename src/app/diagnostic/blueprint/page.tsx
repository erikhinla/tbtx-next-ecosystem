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
    next: "Remove duplicate steps before adding automation."
  },
  bottleneckOperator: {
    name: "Bottleneck Operator",
    status: "Owner-Dependent",
    fix: "Write down decisions and make handoffs clear.",
    next: "Make it possible for someone else to pick up the work."
  },
  fragmentedWorkflow: {
    name: "Fragmented Workflow",
    status: "Disconnected",
    fix: "Keep the task, context, and next step together.",
    next: "Trace one task from request to finish."
  },
  executionStall: {
    name: "Execution Stall",
    status: "Stalled",
    fix: "Define what finished means and who takes the next step.",
    next: "Give one unfinished task an owner and a next action."
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
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#B89A6E]">BUSINESS BLUEPRINT // STARTING POINT</div>
        <Link href="/bbm" className="engineered-control text-[10px]" aria-label="Back to intake">
          <span aria-hidden="true">‹</span>
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
          <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7]">Use this suggestion to review one task. This is a starting point, not a completed business setup.</p>
        </section>

        <section>
          <div className="blueprint-label mb-2">03 / IMPLEMENTATION</div>
          <h2 className="type-macro text-[clamp(1.7rem,5.5vw,2.65rem)] leading-[0.9] mb-4">{data.next}</h2>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={() => window.print()} className="engineered-control">
              <Download className="w-4 h-4" /> PRINT BLUEPRINT
            </button>
            <Link href="/bbai" className="engineered-control">EXPLORE BIZBUILDERS AI</Link>
          </div>
        </section>
      </div>

      <footer className="mt-20 text-[10px] font-mono text-[#B89A6E] tracking-[0.1em]">START WITH ONE TASK. CHECK WHAT CHANGES.</footer>
    </main>
  );
}

export default function BlueprintPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#F4EDE3] flex items-center justify-center font-mono text-xs tracking-[0.1em]">LOADING BLUEPRINT...</div>}>
      <BlueprintContent />
    </Suspense>
  );
}
