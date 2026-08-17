import Link from "next/link";

export default function TBTXHome() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-zinc-800 sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between text-xs tracking-[2px]">
          <Link href="/" className="font-mono text-white/40 hover:text-white transition">
            TBTX
          </Link>
          <div className="flex gap-6">
            <Link href="/tbtx/diagnostic" className="text-amber-400/90 hover:text-amber-300 transition">
              DIAGNOSTIC
            </Link>
            <Link href="/tbtx/doctrine" className="text-white/50 hover:text-white transition">
              DOCTRINE
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
        <div className="text-white/80 space-y-1 mb-6 text-[15px] leading-relaxed">
          <p>Calls missed.</p>
          <p>Replies delayed.</p>
          <p>Decisions lost between tools.</p>
          <p>Work repeating itself in different systems.</p>
        </div>
        <p className="text-white/60 mb-10 max-w-md">
          This isn't inefficiency.
          <br />
          It's Digital Fog.
        </p>
        <Link
          href="/tbtx/diagnostic"
          className="inline-flex items-center justify-center px-7 py-3.5 text-[13px] font-semibold tracking-wide uppercase border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition"
        >
          Find where your system is breaking
        </Link>
        <div className="mt-4">
          <a href="#spine" className="text-xs tracking-widest text-white/40 hover:text-white/70">
            See how the system is supposed to work \u2192
          </a>
        </div>
      </section>

      <section className="border-t border-zinc-800 bg-black/40">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            You didn't hire this role. You became it.
          </h2>
          <div className="text-white/70 space-y-2 mb-8 text-[15px]">
            <p>Re-explain context across tools.</p>
            <p>Fix what automation broke.</p>
            <p>Reconnect what software split apart.</p>
            <p>Hold execution together by hand.</p>
          </div>
          <p className="text-white text-lg tracking-tight">
            You're not disorganized. You're coordinating fragmentation.
          </p>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-14">
          <h2 className="text-xl font-semibold tracking-tight mb-4">More tools isn't a strategy.</h2>
          <p className="text-white/65 max-w-lg leading-relaxed">
            Every new surface is another place context dies.
            <br />
            If everything is "automated," why are you still the system?
          </p>
        </div>
      </section>

      <section id="spine" className="border-t border-zinc-800 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight mb-8">
            You can't automate what's not organized.
          </h2>
          <ol className="space-y-4 mb-10">
            {[
              "See the fog",
              "Map the system",
              "Route with ownership",
              "Execute with proof",
              "Reflect so the next cycle is cleaner",
            ].map((step, i) => (
              <li key={step} className="flex gap-4 items-baseline text-[15px]">
                <span className="font-mono text-amber-400/80 text-xs w-6">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-white/85">{step}</span>
              </li>
            ))}
          </ol>
          <p className="text-white/50 text-sm tracking-wide">Intelligence is in the infrastructure.</p>
        </div>
      </section>

      <section className="border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mb-10" />
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8 max-w-md">
            Map the fog before you add another agent.
          </h2>
          <Link
            href="/tbtx/diagnostic"
            className="inline-flex items-center justify-center px-7 py-3.5 text-[13px] font-semibold tracking-wide uppercase border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition"
          >
            Find where your system is breaking
          </Link>
        </div>
      </section>

      <footer className="border-t border-zinc-800 py-8 text-[11px] text-white/35">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap justify-between gap-2">
          <span>TransformBy10X \u2014 front door</span>
          <span className="text-white/25">BizBuilders AI \u00b7 BizBot MRKTNG downstream</span>
        </div>
      </footer>
    </div>
  );
}
