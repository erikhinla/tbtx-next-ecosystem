import Link from "next/link";

export default function NestedStory() {
  return (
    <div className="tbtx-nest">
      <h2>The gap isn&rsquo;t AI adoption.</h2>
      <p className="tbtx-nest__sub">It&rsquo;s operational architecture.</p>
      <p className="tbtx-nest__payoff">
        Digital Fog forms in the space between tools and done. Coordinating output.
        Collecting the residue.
      </p>
      <p>
        Tools multiply. Tasks leftover from the last prompt sit in tabs. Half-finished
        agents wait for a human to finish what they started. Someone has to keep that
        from colliding. That someone is you.
      </p>
      <p>
        The scan names where it&rsquo;s accumulating. The diagnostic is the report. Then you
        take the next step that fits.
      </p>
      <div className="tbtx-nest__moves">
        <Link href="/tbtx/scan">Your day. Start Here</Link>
        <Link href="/tbtx/map">The business. Start Here</Link>
      </div>
    </div>
  );
}
