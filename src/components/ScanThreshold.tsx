import Link from "next/link";

export function NestHomeLink() {
  return (
    <Link href="/tbtx" className="tbtx-scan__home" aria-label="Home">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 11.25 12 4.5l7.5 6.75V19.5a.75.75 0 0 1-.75.75h-4.5v-5.25h-4.5V20.25h-4.5a.75.75 0 0 1-.75-.75v-8.25Z"
        />
      </svg>
    </Link>
  );
}

type ScanThresholdProps = {
  isPersonal: boolean;
  onBegin: () => void;
};

export default function ScanThreshold({ isPersonal, onBegin }: ScanThresholdProps) {
  const jobLine = isPersonal ? "Social Life" : "Work Life";
  const mantle = isPersonal ? null : "Digital Friction";
  const beginLabel = isPersonal ? "Start Here" : "Run the Momentum Map";
  const headline = isPersonal
    ? "ChatGPT wrote three."
    : "You've been the one who finishes it.";
  const payoff = isPersonal ? "Then you spent the night inside the draft." : null;
  const lead = isPersonal
    ? "None of them were you. At 11 you were still in the box putting your voice back in."
    : "They start. You still close. Let's name where.";

  return (
    <>
      <div className="tbtx-scan__top">
        <NestHomeLink />
        <p className="tbtx-scan__job">{jobLine}</p>
      </div>
      {mantle ? <p className="tbtx-scan__mantle">{mantle}</p> : null}
      <h1 className="tbtx-scan__question">{headline}</h1>
      <div className="tbtx-nest tbtx-nest--scan">
        {payoff ? <p className="tbtx-nest__payoff">{payoff}</p> : null}
        <div className="tbtx-nest__support">
          <p className="tbtx-scan__lead tbtx-scan__covenant">{lead}</p>
        </div>
      </div>
      <div className="tbtx-scan__moves">
        <button type="button" className="tbtx-scan__go" onClick={onBegin}>
          {beginLabel}
        </button>
      </div>
    </>
  );
}
