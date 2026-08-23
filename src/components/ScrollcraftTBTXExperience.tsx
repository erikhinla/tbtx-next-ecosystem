"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root?: Document | HTMLElement) => unknown };
  }
}

/**
 * TransformBy10X composition built on Nate Herk's Scrollcraft engine.
 * The engine remains vendor code; this component owns the semantic page and
 * its bespoke Fog Lattice interaction.
 */
export default function ScrollcraftTBTXExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function loadAndMount() {
      try {
        await import("../vendor/scrollcraft/scrollcraft.js");
        if (cancelled || mountedRef.current || !rootRef.current) return;

        if (!window.ScrollCraft?.mount) {
          console.warn("Scrollcraft loaded without a mount function.");
          return;
        }

        window.ScrollCraft.mount(rootRef.current);
        mountedRef.current = true;
      } catch (error) {
        console.error("Unable to load Scrollcraft.", error);
      }
    }

    void loadAndMount();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main ref={rootRef} className="tbtx-sc" data-sc-root>
      <header className="tbtx-sc__chrome" aria-label="TransformBy10X navigation">
        <Link href="/" className="tbtx-sc__wordmark">TransformBy10X</Link>
        <Link href="/tbtx/diagnostic" className="tbtx-sc__nav-link">Run the diagnostic</Link>
      </header>

      <section className="tbtx-sc__hero" data-sc-act="pin" data-sc-span="2.2" data-sc-drift="#101716">
        <div className="sc-stage tbtx-sc__stage tbtx-sc__hero-stage" data-sc-stage>
          <div className="tbtx-sc__grid" aria-hidden="true" />
          <p className="tbtx-sc__kicker" data-sc-cue="0.04 0.34">A system can be busy and still be lost.</p>
          <h1 className="tbtx-sc__hero-title" data-sc-cue="0.12 0.75" data-sc-kinetic="lines">
            You do not need<br />more AI.<br /><span>Clear the fog.</span>
          </h1>
          <p className="tbtx-sc__hero-note" data-sc-cue="0.58 0.9">TransformBy10X names what is in the way, then creates the next clear move.</p>
          <div className="tbtx-sc__axis" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>
      </section>

      <section className="tbtx-sc__recognition" data-sc-act="flow" data-sc-drift="#17211c">
        <div className="tbtx-sc__recognition-copy" data-sc-in>
          <p className="tbtx-sc__label">The recognition</p>
          <h2>Every new tab promises relief. Every new tool makes the mess wider.</h2>
          <p>That is Digital Fog. It is not a motivation problem. It is a missing operating layer.</p>
        </div>
        <div className="tbtx-sc__fog-window" data-sc-in data-sc-reveal="iris" aria-label="Abstract view of accumulating Digital Fog">
          <span>WIN</span><span>GOAL</span><span>FLOW</span><span>TOOLS</span><span>NOISE</span><span>NEXT?</span>
        </div>
      </section>

      <section className="tbtx-sc__lattice" data-sc-act="pin" data-sc-span="2.8" data-sc-drift="#23392e">
        <div className="sc-stage tbtx-sc__stage tbtx-sc__lattice-stage" data-sc-stage>
          <div className="tbtx-sc__lattice-copy" data-sc-cue="0.08 0.88">
            <p className="tbtx-sc__label">The turn</p>
            <h2 data-sc-kinetic="lines">Clarity is not a feeling.<br />It is a route.</h2>
            <p>As the page moves, the same fragments stop drifting and find their place in the system.</p>
          </div>
          <div className="tbtx-sc__fog-lattice" aria-hidden="true">
            <span className="tbtx-sc__node node-a">WIN</span><span className="tbtx-sc__node node-b">GOAL</span><span className="tbtx-sc__node node-c">FLOW</span><span className="tbtx-sc__node node-d">ACTION</span>
            <svg viewBox="0 0 1000 620" preserveAspectRatio="none"><path d="M105,473 C265,435 270,178 469,250 S637,452 872,128" /><path d="M105,473 C257,284 418,469 632,359 S701,188 872,128" /></svg>
          </div>
        </div>
      </section>

      <section className="tbtx-sc__routes" data-sc-act="pan" data-sc-span="2.25" data-sc-drift="#f0eee7">
        <div className="sc-stage tbtx-sc__stage" data-sc-stage>
          <div className="tbtx-sc__route-intro" data-sc-cue="0.04 0.24"><p className="tbtx-sc__label">The right door</p><h2>Different fog needs a different next move.</h2></div>
          <div className="tbtx-sc__rail" data-sc-pan="1.15">
            <article><p>Personal</p><h3>Fog-Lift</h3><span>Clear your own signal and regain momentum.</span></article>
            <article><p>Business</p><h3>BizBuilders AI</h3><span>Repair the operating layer before scaling the machine.</span></article>
            <article><p>After readiness</p><h3>BizBot</h3><span>Put growth systems to work after the route can hold them.</span></article>
          </div>
        </div>
      </section>

      <section className="tbtx-sc__close" data-sc-act="pin" data-sc-span="1.8" data-sc-drift="#111816">
        <div className="sc-stage tbtx-sc__stage tbtx-sc__close-stage" data-sc-stage>
          <div data-sc-cue="0.14 0.88">
            <p className="tbtx-sc__label">Start here</p>
            <h2>See what is actually blocking momentum.</h2>
            <Link href="/tbtx/diagnostic" className="tbtx-sc__cta">Run the Digital Fog diagnostic</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
