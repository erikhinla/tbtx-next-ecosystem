"use client";

import useScrollReveal from "@/hooks/useScrollReveal";

export function ArrivalCopy() {
  const { ref, shown } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`tbtx-beat tbtx-beat--arrival${shown ? " is-in" : ""}`}
    >
      <p>
        You&apos;re here because you&apos;ve felt it. The tools don&apos;t take things off your plate. They stacked new ones on top and you&apos;re the one coordinating it all together.
      </p>
      <p>That job has a name: Managing Digital Fog.</p>
      <p>
        AI isn&apos;t transformational, it&apos;s informational. And running more AI will only 10X output, but what you want is leverage. To get that you need your attention back from the loose ends AI leaves behind, and putting it toward creating things only you can.
      </p>
      <p>There are three paths forward.</p>
    </div>
  );
}

export function StandCopy() {
  const { ref, shown } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`tbtx-beat tbtx-beat--stand${shown ? " is-in" : ""}`}
    >
      <p>
        Clearing the fog exposes the gap. Not the noise, the operational architecture underneath it. Build that, and attention goes back to what matters. Your vision.
      </p>
      <p>Taking this scan isn&apos;t a personality quiz. It&apos;s not seeing how organized you are.</p>
      <p>It&apos;s you deciding not to spend another year as the AI&apos;s assistant.</p>
    </div>
  );
}
