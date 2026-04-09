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
    <main className="min-h-[100dvh] bg-[#F5F5F0] text-tbtx-bg p-8 md:p-16 font-body selection:bg-tbtx-bg selection:text-[#F5F5F0]">
      
      <header className="flex justify-between items-center pb-8 border-b-2 border-tbtx-bg mb-16">
        <div className="font-mono text-sm font-bold uppercase tracking-widest">
          AI Blueprint // Final Generation
        </div>
        <Link href="/bbm" className="font-mono text-sm flex items-center gap-2 hover:opacity-50">
          <ArrowLeft className="w-4 h-4" /> RECALIBRATE
        </Link>
      </header>

      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* HEADER BLOCK */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 font-mono text-sm uppercase tracking-widest border-t-2 border-tbtx-bg pt-4">
            01 / System Form
          </div>
          <div className="md:col-span-3">
            <h1 className="type-macro text-5xl md:text-8xl mb-4">{data.name}</h1>
            <p className="font-mono bg-tbtx-bg text-[#F5F5F0] p-4 inline-block uppercase font-bold tracking-widest">
              DIAGNOSTIC STATUS: {data.status}
            </p>
          </div>
        </section>

        {/* FIX BLOCK */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 font-mono text-sm uppercase tracking-widest border-t-2 border-tbtx-bg pt-4">
            02 / The Initial Fix
          </div>
          <div className="md:col-span-3">
            <h2 className="type-macro text-4xl md:text-6xl text-tbtx-accent">
              {data.fix}
            </h2>
            <p className="mt-8 text-xl max-w-2xl font-mono leading-relaxed">
              &gt;&gt; Treating symptoms (like buying another AI tool) only thickens the fog. We have to correct the underling system architecture first.
            </p>
          </div>
        </section>

        {/* NEXT MOVES */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 font-mono text-sm uppercase tracking-widest border-t-2 border-tbtx-bg pt-4">
            03 / Implementation
          </div>
          <div className="md:col-span-3">
            <h2 className="type-macro text-4xl md:text-6xl mb-8">
              {data.next}
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button onClick={() => window.print()} className="bg-tbtx-bg text-[#F5F5F0] font-display uppercase text-2xl px-8 py-5 flex items-center justify-center gap-3 hover:bg-tbtx-accent transition-colors">
                <Download className="w-6 h-6" /> Export PDF Blueprint
              </button>
              <Link href="/bbai" className="border-2 border-tbtx-bg bg-transparent text-tbtx-bg font-display uppercase text-2xl px-8 py-5 flex items-center justify-center hover:bg-tbtx-bg hover:text-[#F5F5F0] transition-colors">
                Explore Infrastructure
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default function BlueprintPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full bg-[#F5F5F0] flex items-center justify-center font-mono">Compiling...</div>}>
      <BlueprintContent />
    </Suspense>
  );
}
