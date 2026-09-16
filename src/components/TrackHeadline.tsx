// Headline for a beat, read from the same row as the track line.
// Returns null when the headline is the name, so Scan and Map cannot render twice.

import { canRender, getRow } from "@/data/benefit-track";

interface TrackHeadlineProps {
  id: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
}

export default function TrackHeadline({
  id,
  as: Tag = "h2",
  className,
}: TrackHeadlineProps) {
  const row = getRow(id);
  if (!canRender(row)) return null;
  if (!row.headline) return null;
  if (row.headline === row.name) return null;
  if (row.headlineStatus === "proposed" && process.env.NODE_ENV !== "production") {
    console.warn(`[benefit-track] headline "${id}" is proposed. ${row.headlineNote ?? ""}`);
  }
  return (
    <Tag className={className} data-track-headline={row.id}>
      {row.headline}
    </Tag>
  );
}
