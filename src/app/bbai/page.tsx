"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const BUILD = [
  { n: "01", title: "Find the drag", body: "Map where momentum stops, where context disappears, and which handoffs return as rework.", link: "/tbtx/map", cta: "Run the Momentum Map" },
  { n: "02", title: "Establish operating truth", body: "Give people and AI one current source for decisions, ownership, constraints, and the next move.", link: "/downloads/Architecting-AI-Flow.pdf", cta: "Open the architecture deck" },
  { n: "03", title: "Govern the path to done", body: "Route generated work through review, approval, execution, evidence, and completion. Output stops becoming human cleanup.", link: "/downloads/The-Architecture-of-AI-Native-Operations.pdf", cta: "Open the operations deck" },
  { n: "04", title: "Activate growth after", body: "Demand enters after the operating layer can carry it. Acceleration stops amplifying disorder.", link: "#build", cta: "See the engagement" },
] as const;

const PROOF = [
  ["Context", "People and AI work from the same current truth."],
  ["Memory", "Decisions survive the session that created them."],
  ["Routing", "Every job has an owner, a gate, and a next state."],
  ["Governance", "Risky work waits for approval and leaves evidence."],
  ["Completion", "The system knows what done means before work begins."],
] as const;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }} transition={{ duration: .72, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export default function BBAIPage() {
  return <main className="bbai2">
    <a className="bbai2__skip" href="#problem">Skip to the problem</a>
    <nav className="bbai2__nav"><Link href="/tbtx">TransformBy10X</Link><span>BizBuilders AI / Operating infrastructure</span><Link href="/tbtx/map">Map the drag</Link></nav>

    <header className="bbai2__hero">
      <img className="bbai2__hero-film" src="/media/fog-to-route.jpg" alt="Scattered systems resolving into connected operating infrastructure" />
      <div className="bbai2__hero-veil" />
      <div className="bbai2__hero-copy">
        <p>Digital Fog becomes business drag.</p>
        <h1>AI didn&rsquo;t remove the work.<br /><em>It moved it into the gaps.</em></h1>
        <div className="bbai2__hero-foot"><span>Context disappears. Handoffs stall. People become the operating system.</span><Link href="#problem">See what is happening</Link></div>
      </div>
    </header>

    <section id="problem" className="bbai2__chapter bbai2__problem">
      <Reveal className="bbai2__chapter-copy"><p className="bbai2__eyebrow">01 / The consequence</p><h2>More output.<br />Less momentum.</h2><p>Digital Friction is what the business feels when output outpaces infrastructure. Teams reconcile versions, restore missing context, chase approvals, and finish what the tools started.</p><p className="bbai2__pull">The tools got faster. The work got foggier.</p><Link className="bbai2__text-link" href="/tbtx/map">Find where momentum stops</Link></Reveal>
      <div className="bbai2__story-stack">
        <figure><img src="/media/bbai-blue-final-folders.jpg" alt="Team reconciling three conflicting final folders" /><figcaption>Three teams. Three finals. One human reconciliation layer.</figcaption></figure>
        <figure><img src="/media/bbai-digital-fog-infographic.png" alt="Digital Fog and Digital Friction operating diagram" /><figcaption>The hidden job becomes measurable business drag.</figcaption></figure>
      </div>
    </section>

    <section className="bbai2__interruption"><img src="/media/bbai-blue-billboard.jpg" alt="Managing Digital Fog campaign displayed over a business operations room" /><div><p>Digital Fog is the condition.</p><h2>Digital Friction is the cost.</h2></div></section>

    <section className="bbai2__chapter bbai2__build">
      <Reveal className="bbai2__chapter-copy"><p className="bbai2__eyebrow">02 / The build</p><h2>Infrastructure<br />before acceleration.</h2><p>BizBuilders AI builds the operating layer between ambition and execution. Each layer closes a gap the tools cannot close by themselves.</p></Reveal>
      <div className="bbai2__build-list">{BUILD.map((item) => <article key={item.n}><small>{item.n}</small><div><h3>{item.title}</h3><p>{item.body}</p></div><Link href={item.link} target={item.link.endsWith(".pdf") ? "_blank" : undefined}>{item.cta}</Link></article>)}</div>
    </section>

    <section className="bbai2__decks">
      <a href="/downloads/The-Architecture-of-AI-Native-Operations.pdf" target="_blank" className="bbai2__deck"><img src="/media/bbai-deck-architecture.jpg" alt="The Architecture of AI-Native Operations presentation cover" /><div><small>13 pages / operating model</small><h3>The architecture of AI-native operations</h3><span>Open presentation</span></div></a>
      <a href="/downloads/Architecting-AI-Flow.pdf" target="_blank" className="bbai2__deck"><img src="/media/bbai-deck-flow.jpg" alt="FLOW Agent AS presentation cover" /><div><small>15 pages / execution architecture</small><h3>Architecting AI flow</h3><span>Open presentation</span></div></a>
    </section>

    <section className="bbai2__chapter bbai2__proof">
      <Reveal className="bbai2__chapter-copy"><p className="bbai2__eyebrow">03 / What changes</p><h2>Work stops<br />starting over.</h2><p>The value is not another interface. It is an operating memory that keeps people, agents, decisions, and delivery moving in the same direction.</p></Reveal>
      <div className="bbai2__proof-list">{PROOF.map(([title, body], index) => <article key={title}><small>0{index + 1}</small><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section id="build" className="bbai2__close">
      <img src="/media/bbai-blue-phone.jpg" alt="Digital Fog business campaign shown on a phone beside working documents" />
      <div><p>Momentum Map → Blueprint → operating foundation</p><h2>Stop managing the gaps.</h2><span>Start with the drag already costing the business time, trust, and momentum.</span><Link href="/tbtx/map">Map the business</Link></div>
    </section>
    <footer className="bbai2__footer"><Link href="/tbtx">TransformBy10X</Link><p>BizBuilders AI builds the foundation. Growth comes after it can carry the weight.</p><Link href="/tbtx/hub">Launch surface</Link></footer>
  </main>;
}
