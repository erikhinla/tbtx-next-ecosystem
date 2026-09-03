import Link from "next/link";
import type { Metadata } from "next";
import Film from "@/components/Film";

export const metadata: Metadata = {
  title: "Digital De-Fog Daily",
  description:
    "Share after you finish. Cleared a surface. One move. Calm is the win.",
};

export default function FogFreeSharePage() {
  return (
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
          Back to Digital De-Fog Daily
        </Link>
        <p className="tbtx-scan__job">Social Life</p>
        <p className="tbtx-scan__mantle">Digital Fog</p>
        <h1>Digital De&#8209;Fog Daily</h1>
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
            I ran Digital De-Fog Daily. Cleared a surface. One move.
          </figcaption>
        </figure>

        <p className="tbtx-kit__close">That&rsquo;s Digital De-Fog Daily. Then move.</p>

        <div className="tbtx-scan__moves tbtx-kit__actions">
          <a className="tbtx-scan__go tbtx-fog-go" href="/downloads/Fog-Free-Daily.pdf" download>
            Download the reset
          </a>
          <Link href="/tbtx/scan" className="tbtx-fog-link">
            Let's look again
          </Link>
        </div>
      </div>
    </main>
  );
}
