import Link from "next/link";
import type { Metadata } from "next";
import Film from "@/components/Film";
import StandGate from "@/components/StandGate";

export const metadata: Metadata = {
  title: "Share Scan",
  description: "Share the Scan and a small change from your day.",
};

export default function FogFreeSharePage() {
  return (
    <StandGate>
    <main className="tbtx-scan tbtx-kit tbtx-kit--share">
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
        <Link href="/tbtx/kit" className="tbtx-scan__back" aria-label="Back">
          <span aria-hidden="true">‹</span>
        </Link>
        <p className="tbtx-scan__job">Life</p>
        <h1>Share Scan</h1>
        <p className="tbtx-kit__lede">
          Share transformby10x.ai/tbtx/scan. Add what you noticed or changed, in your own words.
        </p>

        <figure className="tbtx-kit__share">
          <Film
            controls
            playsInline
            src="/media/fog-free-share.mp4"
            poster="/media/fog-free-share.jpg"
            preload="metadata"
          />
          <figcaption>
            One place to start. One next step.
          </figcaption>
        </figure>

        <div className="tbtx-scan__moves tbtx-kit__actions">
          <a className="tbtx-scan__go tbtx-fog-go" href="/downloads/Fog-Free-Daily.pdf" download>
            Save Daily
          </a>
          <Link href="/tbtx/scan" className="tbtx-fog-link">
            Start Scan
          </Link>
        </div>
      </div>
    </main>
    </StandGate>
  );
}
