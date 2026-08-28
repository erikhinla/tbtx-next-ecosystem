import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fog-Lift Kit",
  description: "A 20-minute personal reset. $7.77 honor system. Venmo or Cash App.",
};

const VENMO = "https://venmo.com/erikhbush?txn=pay&amount=7.77&note=Fog-Lift%20Kit";
const CASHAPP = "https://cash.app/$erikhbush/7.77";

export default function FogLiftKitPage() {
  return (
    <main className="tbtx-scan tbtx-kit">
      <div className="tbtx-scan__stage" aria-hidden="true">
        <video autoPlay muted loop playsInline poster="/media/door-b2c-827v2.jpg">
          <source src="/media/door-b2c-827v2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="tbtx-scan__veil" aria-hidden="true" />
      <div className="tbtx-scan__frame">
      <Link href="/tbtx" className="tbtx-kit__back">
        Back
      </Link>
      <p className="tbtx-scan__job">The unpaid job</p>
      <p className="tbtx-scan__mantle">Managing Digital Fog</p>
      <h1>Fog-Lift Kit</h1>
      <p className="tbtx-kit__lede">
        A 20-minute reset for the day the tabs win. Not a business operating system.
        One surface, one thread, one finishable move.
      </p>
      <p className="tbtx-kit__price">$7.77 · honor system</p>
      <p>
        Pay if you can. Download either way. The price supports the work against Digital Fog.
      </p>

      <div className="tbtx-kit__pay" aria-label="Honor system payment">
        <a className="tbtx-kit__method" href={VENMO} target="_blank" rel="noreferrer">
          <img src="/pay/venmo.png" alt="Venmo QR for $7.77 Fog-Lift Kit" width={168} height={168} />
          <span>Venmo</span>
          <small>@erikhbush · $7.77</small>
        </a>
        <a className="tbtx-kit__method" href={CASHAPP} target="_blank" rel="noreferrer">
          <img src="/pay/cashapp.png" alt="Cash App QR for $7.77 Fog-Lift Kit" width={168} height={168} />
          <span>Cash App</span>
          <small>$erikhbush · $7.77</small>
        </a>
      </div>

      <div className="tbtx-scan__moves tbtx-kit__actions">
        <a className="tbtx-scan__go" href="/downloads/Fog-Lift-Kit.pdf" download>
          Download the kit
        </a>
        <Link href="/tbtx/map">This is a business problem</Link>
      </div>
      </div>
    </main>
  );
}
