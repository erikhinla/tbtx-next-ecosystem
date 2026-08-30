import Link from "next/link";

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

  return (
    <>
      <div className="tbtx-scan__top">
        <Link href="/tbtx#tbtx-stakes">Back</Link>
        <p className="tbtx-scan__job">{jobLine}</p>
      </div>
      <p className="tbtx-scan__mantle">{mantle}</p>
      <h1 className="tbtx-scan__question">{headline}</h1>
      <div className="tbtx-nest tbtx-nest--scan">
        <p className="tbtx-nest__payoff">{payoff}</p>
        <div className="tbtx-nest__support">
          <p className="tbtx-scan__lead tbtx-scan__covenant">{lead}</p>
          <p className="tbtx-scan__refrain">You don&rsquo;t need more AI. Clear the fog.</p>
        </div>
      </div>
      <div className="tbtx-scan__moves">
        <button type="button" className="tbtx-scan__go" onClick={onBegin}>
          {beginLabel}
        </button>
        <Link href={otherHref}>{otherLabel}</Link>
      </div>
    </>
  );
}
