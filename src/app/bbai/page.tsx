"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { film } from "@/lib/media";

const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ y: 12 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.28, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

const BlueprintRule = () => <div className="h-px w-12 bg-[#B89A6E]/40 my-8" />;

const FAQS = [
  {
    q: "Why is work getting harder as AI gets better?",
    a: "Tools multiplied faster than context. People spend more time finding the live version, re-explaining the job, and stitching handoffs than doing the work. That's Digital Friction.",
  },
  {
    q: "What should we assess first?",
    a: "Where momentum actually stops. The Momentum Map is the entry. It is not an AI-readiness score.",
  },
  {
    q: "What is the Blueprint?",
    a: "A first prescription: where momentum stops, what is creating resistance, what is ready to move, and the first operating shift. A document is not the destination. Changed work is.",
  },
  {
    q: "What is context, here?",
    a: "The missing operating truth. What is current, who owns the next move, and where the work lives so people and AI are looking at the same thing.",
  },
  {
    q: "What is the foundation made of?",
    a: "Folders, plain text, scripts, and protocols. Durable primitives. Not another dashboard.",
  },
  {
    q: "What keeps focus?",
    a: "What's important now. A real priority that routes work, instead of the loudest thread winning.",
  },
  {
    q: "What governs execution?",
    a: "Generated work needs a path to done. FLOW is that path under BizBuilders. It is proof of the foundation, not the public hook.",
  },
  {
    q: "What happens next?",
    a: "Map the drag. Then the Blueprint. Then the foundation. Growth activation waits until the operating layer can carry it.",
  },
];

export default function BBAIPage() {
  return (
    <main className="tbtx-blueprint min-h-[100dvh] bg-[#F4EDE3] text-[#1C1916] paper-bg font-body">
      <header className="flex justify-between items-center px-5 md:px-8 py-5 text-xs font-mono tracking-[0.12em] border-b border-[#D8D2C5]">
        <Link href="/tbtx">TransformBy10X</Link>
        <div className="text-[#B89A6E] hidden sm:block">BizBuilders AI</div>
        <Link href="/tbtx/map" className="engineered-control text-[10px]">
          Start with the business
        </Link>
      </header>

      <div className="max-w-[1080px] mx-auto px-5 md:px-8">
        <section className="relative pt-16 md:pt-20 pb-14 overflow-hidden" style={{ minHeight: "70vh" }}>
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={film("/media/b2b-sold-ai.mp4")} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#1C1916]/75" />
          </div>
          <div className="relative z-10">
            <RevealText>
              <div className="blueprint-label mb-3" style={{ color: "#B89A6E" }}>
                Operating foundation
              </div>
              <h1 className="type-macro text-[clamp(2.85rem,9.4vw,5.1rem)] leading-[0.84] tracking-[-0.06em] text-[#F4EDE3]">
                Why are projects taking longer
                <br />
                even though you have more tools?
              </h1>
            </RevealText>
            <RevealText delay={0.08}>
              <p className="mt-6 max-w-[58ch] text-[15.2px] leading-[1.68] text-[#F4EDE3]/90">
                Digital Fog turns into Digital Friction when people can&apos;t find what&apos;s current,
                hand work off, or trust the version in front of them. The operating layer under
                AI is what makes work move again.
              </p>
            </RevealText>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/tbtx/map"
                className="engineered-control"
                style={{ borderColor: "#B89A6E", color: "#F4EDE3" }}
              >
                Start with the business
              </Link>
            </div>
            <p className="mt-3 text-xs text-[#B89A6E] font-mono tracking-[0.1em]">
              See where momentum stops. Then build.
            </p>
          </div>
        </section>

        <BlueprintRule />

        <section className="pb-16">
          <RevealText>
            <h2 className="type-macro text-[clamp(1.95rem,6.2vw,2.85rem)] leading-[0.9]">
              Digital Friction is what the business feels.
            </h2>
          </RevealText>
          <RevealText delay={0.06}>
            <p className="max-w-[52ch] mt-6 text-[15px] leading-relaxed text-[#1C1916]/80">
              Stalled work. Dropped handoffs. Rework. Hidden coordination labor. The gap isn&apos;t AI
              adoption. The gap is operational architecture. You can&apos;t automate what&apos;s not
              organized.
            </p>
          </RevealText>
        </section>

        <section className="grid md:grid-cols-2 gap-4 pb-16">
          {[
            {
              title: "Momentum Map",
              body: "See where momentum stops, what is creating resistance, and what is ready to move.",
              href: "/tbtx/map",
              cta: "Start with the business",
            },
            {
              title: "AI Biz Blueprint",
              body: "A clear operating map and sequence. Prescription before implementation.",
              href: "/tbtx/blueprint",
              cta: "See the Blueprint",
            },
          ].map((item) => (
            <div key={item.title} className="border border-[#B89A6E]/30 p-7">
              <div className="blueprint-label mb-2">{item.title}</div>
              <p className="text-sm leading-[1.7] text-[#1C1916]/80">{item.body}</p>
              <Link href={item.href} className="engineered-control mt-6 text-[10px]">
                {item.cta}
              </Link>
            </div>
          ))}
        </section>

        <section className="bg-[#EDE4D8] p-8 md:p-12 border border-[#B89A6E]/30 mb-16">
          <div className="blueprint-label mb-2">Context Architecture</div>
          <h3 className="type-macro text-3xl md:text-[2.65rem] leading-[0.86] tracking-[-0.04em]">
            One current truth for people and AI.
          </h3>
          <p className="mt-6 max-w-[58ch] text-sm leading-[1.7] text-[#1C1916]/80">
            Context Architecture is the gate. Every client completes it before infrastructure,
            automation, workflow, or agent work begins. No context means no build.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-4 pb-16">
          {[
            {
              title: "The foundation",
              sub: "Folders, Markdown, scripts, protocols. The primitives that hold memory so work doesn't live in someone's head.",
            },
            {
              title: "What's important now",
              sub: "A real priority that routes the next move. Persistent memory. The work gets sharper instead of starting over.",
            },
            {
              title: "Governed execution",
              sub: "Most systems can generate. Very few can govern what happens next. FLOW is the BBAI proof: a path from the idea to done.",
            },
            {
              title: "Growth, after",
              sub: "BizBot Mrktng activates demand only when this layer can carry it. That door stays closed on this site until the product is real.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-[#B89A6E]/30 p-7 text-sm leading-[1.65]">
              <div className="text-[#B89A6E] text-xs tracking-[0.1em] mb-2">{item.title}</div>
              {item.sub}
            </div>
          ))}
        </section>

        <section className="pb-20">
          <div className="blueprint-label mb-6">Questions</div>
          <div className="grid gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-[#D8D2C5] pt-5">
                <h3 className="text-lg tracking-tight">{item.q}</h3>
                <p className="mt-2 max-w-[62ch] text-sm leading-[1.7] text-[#1C1916]/80">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="relative overflow-hidden py-20 text-center"
          style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div className="absolute inset-0 z-0">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            >
              <source src={film("/media/infra-endcard.mp4")} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#1C1916]/70" />
          </div>
          <div className="relative z-10">
            <p className="text-[#F4EDE3]/90 max-w-[42ch] mx-auto mb-6 text-sm leading-relaxed">
              Work keeps moving. People spend less time chasing answers and more time doing useful
              work.
            </p>
            <Link
              href="/tbtx/map"
              className="engineered-control"
              style={{ borderColor: "#B89A6E", color: "#F4EDE3" }}
            >
              Start with the business
            </Link>
            <div className="text-[10px] mt-3 tracking-[0.1em] text-[#B89A6E]">
              See where it stops. Then build.
            </div>
          </div>
        </section>
      </div>

      <footer className="text-[10px] font-mono px-5 md:px-8 py-6 text-[#B89A6E] border-t border-[#D8D2C5] tracking-[0.1em]">
        BizBuilders AI, a TransformBy10X company. Infrastructure before acceleration.
      </footer>
    </main>
  );
}
