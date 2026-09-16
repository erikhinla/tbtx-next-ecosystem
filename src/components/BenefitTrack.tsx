"use client";

// The fixed subtitle layer. Mount once, at layout level, above the film.
// It watches every element carrying a data-track attribute and shows the line
// for whichever beat currently owns the viewport.
//
// It renders nothing for lockup rows, because those lines already live in flow
// beneath their name, and nothing for silent rows, because silence is the point.

import { useEffect, useMemo, useRef, useState } from "react";
import { benefitTrack, canRender, getRow, type TrackRow } from "@/data/benefit-track";

const FADE_OUT_MS = 300;
const ACTIVE_THRESHOLD = 0.4;
const OBSERVER_STEPS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export default function BenefitTrack() {
  const rows = useMemo(() => benefitTrack, []);
  const [shown, setShown] = useState<TrackRow | null>(null);
  const [visible, setVisible] = useState(false);
  const targetId = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const ratios = new Map<string, number>();
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-track]")
    );
    if (nodes.length === 0) return;

    const resolve = () => {
      // Highest visible beat wins. Ties resolve to the later beat, which is
      // what a downward scroll expects.
      let winner: string | null = null;
      let best = ACTIVE_THRESHOLD;
      rows.forEach((row) => {
        const ratio = ratios.get(row.id) ?? 0;
        if (ratio >= best) {
          best = ratio;
          winner = row.id;
        }
      });

      const row = winner ? getRow(winner) : undefined;
      const next =
        row && row.mode === "free" && row.line && canRender(row) ? row.id : null;

      if (next === targetId.current) return;
      targetId.current = next;

      // Always fade the outgoing line fully before the incoming one starts.
      // Two lines on screen at once reads as a dissolve, not as a cut.
      setVisible(false);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setShown(next ? getRow(next) ?? null : null);
        if (next) setVisible(true);
      }, FADE_OUT_MS);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.track;
          if (id) ratios.set(id, entry.intersectionRatio);
        });
        resolve();
      },
      { threshold: OBSERVER_STEPS }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      if (timer.current) clearTimeout(timer.current);
    };
  }, [rows]);

  // The layer is decorative to assistive tech. TrackCaption carries the
  // accessible copy in document order so the page still reads correctly
  // with this layer off.
  return (
    <div className="benefit-track" aria-hidden="true">
      <p
        className={[
          "benefit-track__line",
          visible ? "is-visible" : "",
          shown?.release ? "is-release" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        data-beat={shown?.id ?? ""}
      >
        {shown?.line ?? ""}
      </p>
    </div>
  );
}
