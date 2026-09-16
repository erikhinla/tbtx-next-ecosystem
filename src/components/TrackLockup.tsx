// The in-flow form. A name never appears alone again.
// Name in Archivo Black, line in DM Sans directly beneath, same relationship
// on every one of the four named beats.
//
// Place this where the bare name currently sits. It also carries the
// data-track attribute, so the fixed layer sees the beat and clears itself.

import { canRender, getRow } from "@/data/benefit-track";

interface TrackLockupProps {
  id: string;
  /** Override the name string if the beat already renders its own heading. */
  as?: "div" | "header";
  className?: string;
}

export default function TrackLockup({
  id,
  as: Tag = "div",
  className,
}: TrackLockupProps) {
  const row = getRow(id);
  if (!canRender(row)) return null;
  if (row.mode !== "lockup" || !row.name || !row.line) return null;

  return (
    <Tag
      className={["track-lockup", className].filter(Boolean).join(" ")}
      data-track={row.id}
    >
      <span className="track-lockup__name">{row.name}</span>
      <span className="track-lockup__line">{row.line}</span>
    </Tag>
  );
}
