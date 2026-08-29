import Link from "next/link";

type ScanThresholdProps = {
  isPersonal: boolean;
  onBegin: () => void;
};

export default function ScanThreshold({ isPersonal, onBegin }: ScanThresholdProps) {
  const jobLine = isPersonal ? "Social Life" : "Work Life";
  const mantle = isPersonal ? "Digital Fog" : "Digital Friction";
  const beginLabel = isPersonal ? "Name the fog" : "Name the friction";
  const otherHref = isPersonal ? "/tbtx/map" : "/tbtx/scan";
  const otherLabel = isPersonal ? "This is work life" : "This is personal";
  const lead = isPersonal
    ? "Sit out and you hand over the plot. Sit back and you become the leftover-finisher. Name the fog and that job stops using your night."
    : "You hired agents to go faster. Humans still finish what they start. Name the friction and those hours stop being the product.";

  return (
    <>
      <div className="tbtx-scan__top">
        <Link href="/tbtx#tbtx-stakes">Back</Link>
        <p className="tbtx-scan__job">{jobLine}</p>
      </div>
      <p className="tbtx-scan__mantle">{mantle}</p>
      <h1 className="tbtx-scan__question">This scan is a stand</h1>
      <div className="tbtx-nest tbtx-nest--scan">
        <p className="tbtx-nest__payoff">
          We&rsquo;re not scoring how you work. We&rsquo;re finding the leftover job.
        </p>
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
