"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import type { Archetype } from "@/config/intakeQuestions";

const archetypeMap: Record<
  Archetype,
  { name: string; status: string; fix: string; next: string }
> = {
  toolOverload: {
    name: "Tool Overload",
    status: "Fragmented",
    fix: "Consolidate tools and remove duplicate steps.",
    next: "Reduce stack complexity before applying automation.",
  },
  bottleneckOperator: {
    name: "Bottleneck Operator",
    status: "Owner-Dependent",
    fix: "Externalize decisions and standardize handoffs.",
    next: "Remove single-point dependency from operations.",
  },
  fragmentedWorkflow: {
    name: "Fragmented Workflow",
    status: "Disconnected",
    fix: "Create one workflow spine and one context layer.",
    next: "Connect inputs, decisions, and outputs structurally.",
  },
  executionStall: {
    name: "Execution Stall",
    status: "Stalled",
    fix: "Define completion triggers and close open loops.",
    next: "Move from reactive work to structured progression.",
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
        <video autoPlay muted loop playsInline poster="/media/door-b2b-827v2.jpg">
          <source src="/media/door-b2b-827v2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="tbtx-scan__veil" aria-hidden="true" />

      <div className="tbtx-scan__frame">
        <div className="tbtx-scan__top">
          <Link href="/tbtx/map">Back to the Map</Link>
          <p className="tbtx-scan__job">The job at work</p>
          <Link href="/tbtx">Start Here</Link>
        </div>

        <p className="tbtx-scan__mantle">Managing Digital Fog</p>
        <p className="tbtx-scan__kicker">AI Biz Blueprint</p>
        <h1 className="tbtx-scan__profile">{data.name}</h1>
        <p className="tbtx-scan__status">{data.status}</p>
        <p className="tbtx-scan__lead">
          A first prescription from the Momentum Map. Not a finished operating system. It names
          the shape of the drag so the foundation work has somewhere to start.
        </p>

        <section className="tbtx-scan__load">
          <h2>The first fix</h2>
          <p className="tbtx-blue__fix">{data.fix}</p>
          <p>Treating symptoms only thickens the fog. Correct the operating architecture first.</p>
        </section>

        <section className="tbtx-scan__load">
          <h2>What happens next</h2>
          <p className="tbtx-blue__fix">{data.next}</p>
          <p>
            BizBuilders AI is the foundation engagement. Context, then the operating layer, then
            governed execution. Growth waits until that layer can carry it.
          </p>
        </section>

        <div className="tbtx-scan__moves">
          <Link href="/bbai" className="tbtx-scan__go">
            Build the Backbone
          </Link>
          <Link href="/tbtx/map">The business. Start Here</Link>
          <Link href="/tbtx/scan">This is personal</Link>
          <Link href="/tbtx">Start Here</Link>
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
            <p className="tbtx-scan__job">Compiling the prescription</p>
          </div>
        </div>
      }
    >
      <BlueprintContent />
    </Suspense>
  );
}
