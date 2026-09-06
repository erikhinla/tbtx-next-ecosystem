import Link from "next/link";
import type { Metadata } from "next";
import Film from "@/components/Film";
import StandGate from "@/components/StandGate";

export const metadata: Metadata = {
  title: "Digital Fog-Free Daily",
  description:
    "Your first month is free. Someone paid it forward. Twenty minutes. One surface. One move.",
};

const VENMO =
  "https://venmo.com/erikhbush?txn=pay&amount=7.77&note=Digital%20Fog-Free%20Daily";
const CASHAPP = "https://cash.app/$erikhbush/7.77";

const BEATS = [
  {
    n: "01",
    title: "Pick today's surface",
    time: "2 min",
    body: "Desktop, downloads, inbox, notes, tabs, or one project folder.",
  },
  {
    n: "02",
    title: "Sort into three piles",
    time: "6 min",
    body: "Keep. Move. Delete. If you hesitate, put it in Decide Later.",
  },
  {
    n: "03",
    title: "Choose one thread",
    time: "8 min",
    body: "Pick one open loop. Write the next visible step in one sentence.",
  },
  {
    n: "04",
    title: "Lock the next step",
    time: "4 min",
    body: "Put that sentence where you will see it tomorrow.",
  },
] as const;

export default function FogFreeDailyPage() {
  return (
    <StandGate>
    <main className="tbtx-scan tbtx-kit">
      <div className="tbtx-scan__stage" aria-hidden="true">
        <Film
          autoPlay
          muted
          loop
          playsInline
          src="/media/door-b2c-827v2.mp4"
          poster="/media/door-b2c-827v2.jpg"
        />
      </div>
      <div className="tbtx-scan__veil" aria-hidden="true" />
      <div className="tbtx-scan__frame">
        <Link href="/tbtx" className="tbtx-scan__back" aria-label="Back">
          <span aria-hidden="true"><</span>
        </Link>
        <p className="tbtx-scan__job">Life</p>
        <h1>Digital Fog&#8209;Free Daily</h1>
        <p className="tbtx-kit__hook">Busy. Buried. Behind?</p>
        <section className="tbtx-peel is-open">
          <p className="tbtx-peel__title">Twenty minutes</p>
          <div className="tbtx-peel__fog">
            <p className="tbtx-kit__lede">
              One surface. One thread. One finishable step. The leftover job stops using your night.
            </p>
          </div>
        </section>
        <p className="tbtx-kit__price">$7.77 · honor system · 20 minutes</p>
        <p className="tbtx-kit__note">
          Your first month is free. Someone paid it forward. If you&rsquo;d like, you can cover the next person&rsquo;s month.
        </p>

        <div className="tbtx-kit__need">
          <article>
            <h2>What you need</h2>
            <p>A timer, your laptop, and 20 minutes.</p>
          </article>
          <article>
            <h2>What you don&rsquo;t need</h2>
            <p>A new system. More tabs.</p>
          </article>
        </div>
        <p className="tbtx-kit__rule">If it gets too big, shrink the step.</p>

        <ol className="tbtx-kit__beats">
          {BEATS.map((beat) => (
            <li key={beat.n}>
              <span className="tbtx-kit__beat-n">{beat.n}</span>
              <div>
                <h2>
                  {beat.title}
                  <small>{beat.time}</small>
                </h2>
                <p>{beat.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="tbtx-kit__pay" aria-label="Pay it forward">
          <a className="tbtx-kit__method" href={VENMO} target="_blank" rel="noreferrer">
            <img
              src="/pay/venmo.png"
              alt="Venmo $7.77"
              width={168}
              height={168}
            />
            <span>Venmo</span>
            <small>@erikhbush · $7.77</small>
          </a>
          <a className="tbtx-kit__method" href={CASHAPP} target="_blank" rel="noreferrer">
            <img
              src="/pay/cashapp.png"
              alt="Cash App $7.77"
              width={168}
              height={168}
            />
            <span>Cash App</span>
            <small>$erikhbush · $7.77</small>
          </a>
        </div>

        <div className="tbtx-scan__moves tbtx-kit__actions">
          <a className="tbtx-scan__go tbtx-fog-go" href="/downloads/Fog-Free-Daily.pdf" download>
            Save Scan
          </a>
          <Link href="/tbtx/kit/share" className="tbtx-fog-link">
            Share Scan
          </Link>
        </div>
      </div>
    </main>
    </StandGate>
  );
}
