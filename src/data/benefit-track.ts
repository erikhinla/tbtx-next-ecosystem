// Typed loader for the benefit track.
// The JSON file is canon. This file only gives it types and lookup helpers.
// Requires "resolveJsonModule": true in tsconfig.json compilerOptions.

import trackFile from "./benefit-track.json";

export type TrackMode = "free" | "lockup" | "silent";
export type TrackRegister = "relief" | "dignity" | "leverage";
export type HeadlineStatus = "locked" | "proposed" | "current";

export interface TrackRow {
  id: string;
  order: number;
  beat: string;
  headline: string | null;
  headlineStatus?: HeadlineStatus;
  headlineNote?: string;
  name: string | null;
  mode: TrackMode;
  line: string | null;
  register: TrackRegister;
  release: boolean;
  publishAllowed: boolean;
  blocker?: string;
  alternates?: string[];
  note?: string;
}

export interface TrackFile {
  version: string;
  status: string;
  publishAllowed: boolean;
  rows: TrackRow[];
}

const file = trackFile as unknown as TrackFile;

export const trackVersion = file.version;

export const benefitTrack: TrackRow[] = [...file.rows].sort(
  (a, b) => a.order - b.order
);

export const trackById: ReadonlyMap<string, TrackRow> = new Map(
  benefitTrack.map((row) => [row.id, row])
);

export function getRow(id: string): TrackRow | undefined {
  return trackById.get(id);
}

/**
 * A row renders only when it is cleared to publish.
 * Production builds drop uncleared rows entirely.
 * Development builds render them so the beat is visible while it is being worked on.
 */
export function canRender(row: TrackRow | undefined): row is TrackRow {
  if (!row) return false;
  if (row.publishAllowed) return true;
  if (process.env.NODE_ENV === "production") return false;
  console.warn(
    `[benefit-track] "${row.id}" is not cleared to publish. ${row.blocker ?? ""}`
  );
  return true;
}

export function headlineOf(row: TrackRow | undefined): string | null {
  if (!row || !row.headline) return null;
  if (row.headline === row.name) return null;
  return row.headline;
}
