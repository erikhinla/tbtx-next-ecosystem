import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-tbtx-bg p-8">
      <div className="max-w-2xl w-full flex flex-col space-y-12">
        <h1 className="type-macro text-[clamps(3rem,8vw,6rem)] text-white text-center">
          TBTX Ecosystem
        </h1>
        
        <div className="grid grid-cols-1 gap-4 font-mono">
          <Link href="/tbtx" className="p-6 border structural-border hover:bg-white hover:text-black transition-colors">
            [01] TransformBy10X (Philosophy)
          </Link>
          <Link href="/bbai" className="p-6 border structural-border hover:bg-bbai-accent hover:text-white transition-colors">
            [02] BizBuilders AI (Infrastructure)
          </Link>
          <Link href="/bbm" className="p-6 border structural-border hover:bg-bbm-accent hover:text-white transition-colors">
            [03] BizBot Marketing (Diagnostics)
          </Link>
        </div>
      </div>
    </main>
  );
}
