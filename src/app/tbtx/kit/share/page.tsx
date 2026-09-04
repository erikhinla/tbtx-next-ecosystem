import Link from "next/link";
import type { Metadata } from "next";
import Film from "@/components/Film";
import StandGate from "@/components/StandGate";

export const metadata: Metadata = {
  title: "Fog-Free moment",
  description:
    "Share after you finish. Cleared a surface. One move. Calm is the win.",
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
        <Link href="/tbtx/kit" className="tbtx-kit__back tbtx-fog-link">
          Back to Fog-Free Daily
        </Link>
        <p className="tbtx-scan__job">Social Life</p>
        <p className="tbtx-scan__mantle">Digital Fog</p>
        <h1>Fog&#8209;Free moment</h1>
        <p className="tbtx-kit__lede">
          Write down what moved. That&rsquo;s the proof. Small counts. Share it when
          you&rsquo;re ready to say it out loud.
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
            I ran Digital De-Fog Daily. Cleared a surface. One move. Calm is the win.
          </figcaption>
        </figure>

        <p className="tbtx-kit__close">Be Fog-Free. Then move.</p>

        <div className="tbtx-scan__moves tbtx-kit__actions">
          <a className="tbtx-scan__go tbtx-fog-go" href="/downloads/Fog-Free-Daily.pdf" download>
            Download the reset
          </a>
          <Link href="/tbtx/scan" className="tbtx-fog-link">
            Scan again
          </Link>
        </div>
      </div>
    </main>
    </StandGate>
  );
}
