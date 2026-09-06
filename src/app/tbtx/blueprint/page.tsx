"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import type { Archetype } from "@/config/intakeQuestions";
import Film from "@/components/Film";
import StandGate from "@/components/StandGate";

const archetypeMap: Record<
  Archetype,
  { name: string; status: string; fix: string; next: string }
> = {
  toolOverload: {
    name: "Tool Overload",
    status: "Fragmented",
    fix: "Consolidate tools and remove duplicate steps.",
    next: "Remove duplicate steps before adding automation.",
  },
  bottleneckOperator: {
    name: "Bottleneck Operator",
    status: "Owner-Dependent",
    fix: "Write down decisions and make handoffs clear.",
    next: "Make it possible for someone else to pick up the work.",
  },
  fragmentedWorkflow: {
    name: "Fragmented Workflow",
    status: "Disconnected",
    fix: "Keep the task, context, and next step together.",
    next: "Trace one task from request to finish.",
  },
  executionStall: {
    name: "Execution Stall",
    status: "Stalled",
    fix: "Define what finished means and who takes the next step.",
    next: "Give one unfinished task an owner and a next action.",
  },
};

function BlueprintContent() {
  const searchParams = useSearchParams();
  const rawArchetype = searchParams.get("archetype") as Archetype | null;
  const targetArchetype =
    rawArchetype && archetypeMap[rawArchetype] ? rawArchetype : "fragmentedWorkflow";
  const data = archetypeMap[targetArchetype];

  return (
    <div className="tbtx-scan tbtx-blue">
      <div className="tbtx-scan__stage" aria-hidden="true">
        <Film
          autoPlay
          muted
          loop
          playsInline
          src="/media/door-b2b-827v2.mp4"
          poster="/media/door-b2b-827v2.jpg"
        />
      </div>
      <div className="tbtx-scan__veil" aria-hidden="true" />

      <div className="tbtx-scan__frame">
        <div className="tbtx-scan__top">
          <Link href="/tbtx/map" className="tbtx-fog-link" aria-label="Back to Map">
            ‹
          </Link>
          <p className="tbtx-scan__job">Business</p>
          <Link href="/tbtx#tbtx-stakes" className="tbtx-fog-link">
            Choose Your Path
          </Link>
        </div>

        <p className="tbtx-scan__mantle">Digital Fog</p>
        <p className="tbtx-scan__kicker">AI Biz Blueprint</p>
        <h1 className="tbtx-scan__profile">{data.name}</h1>
        <p className="tbtx-scan__status">{data.status}</p>
        <section className="tbtx-peel">
          <p className="tbtx-peel__title">A starting point</p>
          <div className="tbtx-peel__fog">
            <p className="tbtx-scan__lead">
              Use this pattern to review one task in your business. These are suggested changes, not a completed setup.
            </p>
          </div>
        </section>

        <section className="tbtx-scan__load tbtx-peel">
          <h2>The first fix</h2>
          <div className="tbtx-peel__fog">
            <p className="tbtx-blue__fix">{data.fix}</p>
            <p>Try the change on one task before applying it more widely.</p>
          </div>
        </section>

        <section className="tbtx-scan__load tbtx-peel">
          <h2>What happens next</h2>
          <div className="tbtx-peel__fog">
            <p className="tbtx-blue__fix">{data.next}</p>
            <p>
              Explore BizBuilders AI for shared context, clear ownership, and rules for how work moves.
            </p>
          </div>
        </section>

        <div className="tbtx-scan__moves">
          <Link href="/bbai" className="tbtx-scan__go tbtx-fog-go">
            Explore BizBuilders AI
          </Link>
          <Link href="/tbtx/map" className="tbtx-fog-link">
            Start Map Again
          </Link>
          <Link href="/tbtx/scan" className="tbtx-fog-link">
            Start Scan
          </Link>
          <Link href="/tbtx#tbtx-stakes" className="tbtx-fog-link">
            Choose Your Path
          </Link>
        </div>

        <div className="tbtx-scan__foot">
          <button type="button" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlueprintPage() {
  return (
    <Suspense
      fallback={
        <div className="tbtx-scan">
          <div className="tbtx-scan__frame">
            <p className="tbtx-scan__job">Loading Blueprint</p>
          </div>
        </div>
      }
    >
      <StandGate>
        <BlueprintContent />
      </StandGate>
    </Suspense>
  );
}
