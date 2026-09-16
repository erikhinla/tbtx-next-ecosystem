// Accessibility parity for the free-floating beats.
//
// The fixed layer is aria-hidden, so without this the arrival, fog, fork and
// founder lines would exist for sighted visitors only. Drop one of these inside
// each free beat's section. It renders nothing visually.

import { canRender, getRow } from "@/data/benefit-track";

export default function TrackCaption({ id }: { id: string }) {
  const row = getRow(id);
  if (!canRender(row)) return null;
  if (row.mode !== "free" || !row.line) return null;

  return <p className="track-caption">{row.line}</p>;
}
