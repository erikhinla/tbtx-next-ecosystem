"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Film from "@/components/Film";

const DEPTS = [
  ["Ops", "Versions multiply. Nobody owns the live one."],
  ["Sales", "Follow-up lives in a head, not a route."],
  ["Delivery", "Handoffs return as human cleanup."],
  ["Finance", "Decisions wait on reconstructed context."],
  ["People", "People hold the process together."],
  ["AI agents and tools", "Output outpaces the infrastructure under it."],
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
      <a className="bbai2__skip" href="#fracture">Skip to the problem</a>
      <nav className="bbai2__nav">
        <Link href="/tbtx">TransformBy10X</Link>
        <span>BizBuilders AI</span>
        <Link href="/tbtx/map">Start Map</Link>
      </nav>

      <header className="bbai2__hero">
        <Film
          className="bbai2__hero-film"
          src="/media/fog-b2b-short.mp4"
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
            <span>AI agents and tools add output. Disconnected handoffs add work.</span>
          </div>
        </div>
      </header>

      <section id="fracture" className="bbai2__chapter bbai2__problem">
        <Reveal className="bbai2__chapter-copy">
          <p className="bbai2__eyebrow">02 / The gap</p>
          <h2>The gap between output and action.</h2>
          <p>
            AI agents and tools can produce work faster than a team can review and use it.
            When context and ownership are unclear, someone has to connect the pieces.
          </p>
          <p className="bbai2__pull">Output outpaces infrastructure.</p>
        </Reveal>
        <div className="bbai2__story-stack">
          <figure>
            <Film
              src="/media/computer-explodes.mp4"
              poster="/media/bbai-digital-fog-infographic.png"
              autoPlay
              muted
              loop
              playsInline
            />
            <figcaption>More output. The same handoffs.</figcaption>
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
          <p className="bbai2__eyebrow">03 / The setup</p>
          <h2>Give the work a next step.</h2>
          <p>
            Keep context where the work happens. Define who decides, who reviews, and what happens next.
            Give AI agents and tools a place in that process.
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
          <h2>Build around how work moves.</h2>
          <p>
            Start with one workflow. Connect its information, decisions, and handoffs.
            Check whether it reduces repeated work before extending it.
          </p>
        </Reveal>
      </section>

      <section id="build" className="bbai2__close">
        <img src="/media/bbai-blue-phone.jpg" alt="" />
        <div>
          <p>Start where work gets held up.</p>
          <h2>Map your business. Choose one change.</h2>
          <div className="bbai2__hero-foot" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <Link href="/tbtx/map">Start Map</Link>
            <Link href="/tbtx/blueprint">View Blueprint</Link>
            <a href="#fracture">Review the setup</a>
          </div>
        </div>
      </section>

      <footer className="bbai2__footer" id="call">
        <Link href="/tbtx">TransformBy10X</Link>
        <p>Map the Gap. Align the Infra. Build Fog-Free.</p>
        <Link href="/tbtx/map">Start Map</Link>
      </footer>
    </main>
  );
}
