import Link from "next/link";
import type { Metadata } from "next";
import Film from "@/components/Film";
import StandGate from "@/components/StandGate";

export const metadata: Metadata = {
  title: "Fog-Free Daily",
  description:
    "Busy. Buried. Behind? A 20-minute personal reset. One surface, one thread, one finishable move. $7.77 honor system.",
};

const VENMO =
  "https://venmo.com/erikhbush?txn=pay&amount=7.77&note=Fog-Free%20Daily";
const CASHAPP = "https://cash.app/$erikhbush/7.77";

const BEATS = [
  {
    n: "01",
    title: "Pick today's surface",
    time: "2 min",
    body: "Choose one place to clear: desktop, downloads, inbox, notes, tabs, or one project folder.",
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
    body: "Pick one open loop and write the next visible move in one sentence.",
  },
  {
    n: "04",
    title: "Lock the next move",
    time: "4 min",
    body: "Put the move where you'll see it. Calendar, note, sticky, or task list.",
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
        <Link href="/tbtx" className="tbtx-kit__back tbtx-fog-link">
          Back
        </Link>
        <p className="tbtx-scan__job">Social Life</p>
        <p className="tbtx-scan__mantle">Digital Fog</p>
        <h1>Fog&#8209;Free Daily</h1>
        <p className="tbtx-kit__hook">Busy. Buried. Behind?</p>
        <section className="tbtx-peel is-open">
          <p className="tbtx-peel__title">What 20 minutes gives back</p>
          <div className="tbtx-peel__fog">
            <p className="tbtx-kit__lede">
              You named the fog. This is twenty minutes to finish one thing and get
              that attention back. Not a business operating system. One surface, one
              thread, one finishable move. The leftover job stops using your night.
            </p>
          </div>
        </section>
        <p className="tbtx-kit__price">$7.77 · honor system · 20 minutes</p>
        <p className="tbtx-kit__note">
          Pay if you can. Download either way. The price keeps the work against
          Digital Fog alive. You get the night back either way.
        </p>

        <div className="tbtx-kit__need">
          <article>
            <h2>What you need</h2>
            <p>A timer, your laptop, and 20 honest minutes.</p>
          </article>
          <article>
            <h2>What you don&rsquo;t need</h2>
            <p>A second brain, a new system, or more tabs.</p>
          </article>
        </div>
        <p className="tbtx-kit__rule">If it starts feeling too big, shrink the move.</p>

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

        <p className="tbtx-kit__close">Calm is the win. One clear move is enough.</p>

        <div className="tbtx-kit__pay" aria-label="Honor system payment">
          <a className="tbtx-kit__method" href={VENMO} target="_blank" rel="noreferrer">
            <img
              src="/pay/venmo.png"
              alt="Venmo QR for $7.77 Fog-Free Daily"
              width={168}
              height={168}
            />
            <span>Venmo</span>
            <small>@erikhbush · $7.77</small>
          </a>
          <a className="tbtx-kit__method" href={CASHAPP} target="_blank" rel="noreferrer">
            <img
              src="/pay/cashapp.png"
              alt="Cash App QR for $7.77 Fog-Free Daily"
              width={168}
              height={168}
            />
            <span>Cash App</span>
            <small>$erikhbush · $7.77</small>
          </a>
        </div>

        <div className="tbtx-scan__moves tbtx-kit__actions">
          <a className="tbtx-scan__go tbtx-fog-go" href="/downloads/Fog-Free-Daily.pdf" download>
            Download Fog-Free Daily
          </a>
          <Link href="/tbtx/kit/share" className="tbtx-fog-link">
            Share a Fog-Free moment
          </Link>
          <Link href="/tbtx/map" className="tbtx-fog-link">
            Map Digital Fog in Business
          </Link>
        </div>
      </div>
    </main>
    </StandGate>
  );
}
