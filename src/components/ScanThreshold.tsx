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
        <Link href="/tbtx" className="tbtx-scan__back" aria-label="Back">
          <span aria-hidden="true">‹</span>
        </Link>
        <p className="tbtx-scan__job">{lane.job}</p>
      </div>
      <h1 className="tbtx-scan__question tbtx-scan__question--open">{lane.headline}</h1>
      {lane.payoff ? <p className="tbtx-nest__payoff">{lane.payoff}</p> : null}
      {lane.lead ? <p className="tbtx-scan__lead">{lane.lead}</p> : null}
      {lane.mapLabel ? <p className="tbtx-scan__map-label">{lane.mapLabel}</p> : null}
      <div className="tbtx-scan__moves">
        <button type="button" className="tbtx-scan__go" onClick={onBegin}>
          {lane.begin}
        </button>
        {isPersonal ? <Link href={lane.otherHref}>{lane.otherLabel}</Link> : null}
      </div>
    </>
  );
}
