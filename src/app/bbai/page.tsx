"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Film from "@/components/Film";

const DEPTS = [
  ["Ops", "Versions multiply. Nobody owns the live one."],
  ["Sales", "Follow-up lives in a head, not a route."],
  ["Delivery", "Handoffs return as human cleanup."],
  ["Finance", "Decisions wait on reconstructed context."],
  ["People", "The operator becomes the runtime."],
  ["AI stack", "Output outpaces the infrastructure under it."],
] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function BBAIPage() {
  return (
    <main className="bbai2">
      <a className="bbai2__skip" href="#fracture">Skip to the fracture</a>
      <nav className="bbai2__nav">
        <Link href="/tbtx">TransformBy10X</Link>
        <span>BizBuilders AI</span>
        <Link href="/tbtx/map">Map Momentum</Link>
      </nav>

      <header className="bbai2__hero">
        <Film
          className="bbai2__hero-film"
          src="/media/door-b2b-827v2.mp4"
          poster="/media/fog-to-route.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="bbai2__hero-veil" />
        <div className="bbai2__hero-copy">
          <p>Prevent Digital Friction</p>
          <h1>
            Digital Fog is the condition.
            <br />
            <em>Digital Friction is the cost.</em>
          </h1>
          <div className="bbai2__hero-foot">
            <span>Tools multiply faster than context. The business feels it as stall, rework, and lost attention.</span>
          </div>
        </div>
      </header>

      <section id="fracture" className="bbai2__chapter bbai2__problem">
        <Reveal className="bbai2__chapter-copy">
          <p className="bbai2__eyebrow">02 / Fundamental fracture</p>
          <h2>The architectural blindspot.</h2>
          <p>
            Probabilistic tools were dropped into deterministic systems with no mediating layer.
            Departments keep their own truth. AI writes faster than the business can decide.
            The human operator absorbs the exception.
          </p>
          <p className="bbai2__pull">Output outpaces infrastructure.</p>
        </Reveal>
        <div className="bbai2__story-stack">
          <figure>
            <img src="/media/bbai-digital-fog-infographic.png" alt="Digital Fog becomes Digital Friction" />
            <figcaption>Condition on the left. Cost on the right.</figcaption>
          </figure>
          <div className="bbai2__proof-list" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "1px", background: "rgb(255 255 255 / 0.12)" }}>
            {DEPTS.map(([title, body]) => (
              <article key={title} style={{ background: "#0d1210", padding: "1.1rem 1rem" }}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bbai2__chapter bbai2__build">
        <Reveal className="bbai2__chapter-copy">
          <p className="bbai2__eyebrow">03 / Fundamental fix</p>
          <h2>AI-assisted work still needs a route.</h2>
          <p>
            AI-assisted and AI-native businesses are increasing. Legacy systems without an operating
            layer cannot hold that volume. Shared memory, durable protocols, and clear ownership are
            the fix — not another tool.
          </p>
        </Reveal>
        <div className="bbai2__decks">
          <a href="/downloads/The-Architecture-of-AI-Native-Operations.pdf" target="_blank" className="bbai2__deck">
            <img src="/media/bbai-deck-architecture.jpg" alt="Architecture of AI-native operations" />
            <div>
              <small>Operating model</small>
              <h3>The architecture of AI-native operations</h3>
              <span>Open the deck</span>
            </div>
          </a>
          <a href="/downloads/Architecting-AI-Flow.pdf" target="_blank" className="bbai2__deck">
            <img src="/media/bbai-deck-flow.jpg" alt="FLOW Agent architecture" />
            <div>
              <small>FLOW Agent AS</small>
              <h3>Architecting AI flow</h3>
              <span>Open the deck</span>
            </div>
          </a>
        </div>
      </section>

      <section id="future" className="bbai2__chapter bbai2__proof">
        <Reveal className="bbai2__chapter-copy">
          <p className="bbai2__eyebrow">04 / Foundation for the future</p>
          <h2>Legacy cannot compete with a governed route.</h2>
          <p>
            Businesses that only bolt AI onto yesterday&rsquo;s handoffs will spend the next decade
            reconciling versions. Businesses that install an operating layer first let attention
            compound.
          </p>
        </Reveal>
      </section>

      <section id="build" className="bbai2__close">
        <img src="/media/bbai-blue-phone.jpg" alt="" />
        <div>
          <p>Gather the picture first. Then write the route.</p>
          <h2>Map Momentum. Then get the BizBlueprint.</h2>
          <div className="bbai2__hero-foot" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/tbtx/map">Map Momentum</Link>
            <Link href="/tbtx/blueprint">Get Your BizBlueprint</Link>
            <a href="#call">Set up a video call</a>
          </div>
        </div>
      </section>

      <footer className="bbai2__footer" id="call">
        <Link href="/tbtx">TransformBy10X</Link>
        <p>Map the Gap. Align the Infra. Build Fog-Free.</p>
        <Link href="/tbtx/map">Map Momentum</Link>
      </footer>
    </main>
  );
}
