import Link from "next/link";
import { publicLanes } from "@/config/public-lanes";

type ScanThresholdProps = {
  isPersonal: boolean;
  onBegin: () => void;
};

export default function ScanThreshold({ isPersonal, onBegin }: ScanThresholdProps) {
  const lane = isPersonal ? publicLanes.personal : publicLanes.business;

  return (
    <>
      <div className="tbtx-scan__top">
        <Link href="/tbtx#tbtx-stakes">Back</Link>
        <p className="tbtx-scan__job">{lane.job}</p>
      </div>
      <p className="tbtx-scan__mantle">{lane.mantle}</p>
      <h1 className="tbtx-scan__question">{lane.headline}</h1>
      <div className="tbtx-nest tbtx-nest--scan">
        <p className="tbtx-nest__payoff">{lane.payoff}</p>
        <div className="tbtx-nest__support">
          <p className="tbtx-scan__lead tbtx-scan__covenant">{lane.lead}</p>
        </div>
      </div>
      <div className="tbtx-scan__moves">
        <button type="button" className="tbtx-scan__go" onClick={onBegin}>
          {lane.begin}
        </button>
        {isPersonal ? <Link href={lane.otherHref}>{lane.otherLabel}</Link> : null}
      </div>
      <p className="tbtx-scan__refrain">You don&rsquo;t need more AI. Clear the fog.</p>
    </>
  );
}
