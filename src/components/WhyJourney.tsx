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
        When output outgrows your setup, keeping track becomes another job.
      </p>
      <p>
        That job has a name: <span className="tbtx-nowrap">Managing Digital Fog.</span>
      </p>
      <p>
        Your attention belongs to what matters to you. Start with the setup that keeps pulling it&nbsp;away.
      </p>
      <p>What happens next is your&nbsp;choice.</p>
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
        AI agents and tools move faster. You&apos;re still connecting the&nbsp;pieces.
      </p>
      <p>
        More output. More places to check. More loose&nbsp;ends.
      </p>
      <p>
        That&apos;s Digital&nbsp;Fog.
      </p>
    </div>
  );
}
