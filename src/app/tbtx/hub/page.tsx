import Link from "next/link";
import Film from "@/components/Film";

export default function TBTXHubClassic() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Film
          className="h-full w-full object-cover opacity-[0.28]"
          src="/media/desk-fog-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#0a0a0a]/85 to-[#0a0a0a]" />
      </div>

      <div className="relative z-10">
        <nav className="border-b border-zinc-800/80 sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur">
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between text-xs tracking-[2px]">
            <Link href="/tbtx" className="font-mono text-white/40 hover:text-white transition">
              TBTX
            </Link>
            <div className="flex gap-6">
              <Link href="/tbtx/diagnostic" className="text-amber-400/90 hover:text-amber-300 transition">
                DIAGNOSTIC
              </Link>
            </div>
          </div>
        </nav>

        <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
          <p className="text-[10px] tracking-[4px] text-white/40 uppercase mb-6">TransformBy10X</p>
          <h1 className="text-4xl sm:text-5xl md:text-[56px] leading-[1.05] font-semibold tracking-tight mb-8">
            AI created a job nobody applied for:{" "}
            <span className="text-white tracking-[0.08em]">managing Digital Fog.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mb-4 leading-relaxed">
            AI added tools, automations, and agents.
            <br />
            It also created a new invisible job: keeping everything from falling apart.
          </p>
          <Link
            href="/tbtx/diagnostic"
            className="inline-flex items-center justify-center px-7 py-3.5 text-[13px] font-semibold tracking-wide uppercase border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition"
          >
            Find where your system is breaking
          </Link>
        </section>
      </div>
    </div>
  );
}
