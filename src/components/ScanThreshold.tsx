"use client";

import Link from "next/link";
import { NestField, NestLine, useNestBeats } from "./NestedStory";

type ScanThresholdProps = {
  isPersonal: boolean;
  onBegin: () => void;
};

export default function ScanThreshold({ isPersonal, onBegin }: ScanThresholdProps) {
  const jobLine = isPersonal ? "Social Life" : "Work Life";
  const mantle = isPersonal ? "Digital Fog" : "Digital Friction";
  const beginLabel = "Let's look";
  const otherHref = isPersonal ? "/tbtx/map" : "/tbtx/scan";
  const otherLabel = isPersonal ? "This is work life" : "This is personal";
  const headline = isPersonal
    ? "You asked it to give you the night back."
    : "You've been the one who finishes it.";
  const payoff = isPersonal
    ? "Then you spent the night inside the draft."
    : "You don't have to keep doing that.";
  const lead = isPersonal
    ? "You wanted one text to your sister so you could sleep. ChatGPT wrote three. None of them were you. At 11 you were still in the box, putting your voice back in."
    : "They start. You still close. Let's name where.";
  const { beat, advance, back } = useNestBeats(4);

  return (
    <>
      <div className="tbtx-scan__top">
        <Link href="/tbtx#tbtx-stakes">Back</Link>
        <p className="tbtx-scan__job">{jobLine}</p>
      </div>
      <p className="tbtx-scan__mantle">{mantle}</p>
      <NestField
        className="tbtx-nest tbtx-nest--scan"
        labelledBy="tbtx-scan-lead"
        beat={beat}
        lastBeat={3}
        advance={advance}
        back={back}
      >
        <h1 id="tbtx-scan-lead" className="tbtx-scan__question">
          {headline}
        </h1>
        {beat >= 1 ? <NestLine className="tbtx-nest__payoff" text={payoff} play /> : null}
        {beat >= 2 ? (
          <div className="tbtx-nest__support">
            <p className="tbtx-scan__lead tbtx-scan__covenant">{lead}</p>
            {beat >= 3 ? (
              <p className="tbtx-scan__refrain">You don&rsquo;t need more AI. Clear the fog.</p>
            ) : null}
          </div>
        ) : null}
        {beat >= 3 ? (
          <div className="tbtx-scan__moves">
            <button type="button" className="tbtx-scan__go" onClick={onBegin}>
              {beginLabel}
            </button>
            <Link href={otherHref}>{otherLabel}</Link>
          </div>
        ) : (
          <span className="tbtx-sr">Press Enter to keep reading.</span>
        )}
      </NestField>
    </>
  );
}
