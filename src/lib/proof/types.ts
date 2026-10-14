export const MAP_MODEL_VERSION = 'map-saved-2026-09-06';
export const OPERATIONAL_MODEL_VERSION = 'operational-1.0';
export const MANIFESTATION_MODEL_VERSION = 'manifestation-revision-3';
export const DISPLAY_BAND_VERSION = 'display-bands-1';

export type EvidenceKind = 'observed' | 'self-reported' | 'estimated' | 'simulated';

export type PressureId =
  | 'start'
  | 'handoff'
  | 'next'
  | 'priorities'
  | 'memory'
  | 'scattered'
  | 'tools'
  | 'learning'
  | 'followup'
  | 'loose-followup'
  | 'ownership'
  | 'informal-owner'
  | 'ai'
  | 'decisions'
  | 'revenue'
  | 'some-manual'
  | 'repeat'
  | 'sometimes-repeat'
  | 'key-person'
  | 'pipeline'
  | 'partial-pipe'
  | 'loop'
  | 'shape';

export type ArchetypeId =
  'bottleneckOperator' | 'toolOverload' | 'executionStall' | 'fragmentedWorkflow';

export type ProfileId = 'FRAGMENTED' | 'STALLED' | 'SCALING' | 'COMPOUNDING';

export type DepartmentId =
  'ACC' | 'FIN' | 'LGL' | 'PRD' | 'STR' | 'CRT' | 'PR' | 'MED' | 'HR' | 'OPS';

export type BandId = 'open' | 'fog' | 'forming' | 'closing' | 'seized' | 'unavailable' | 'unknown';

export interface Choice {
  id: string;
  text: string;
  value: 0 | 1 | 2;
  /** Null means a 2-point answer, or a 1-point answer with no saved pressure. */
  pressure: PressureId | null;
}

export interface Question {
  id: string;
  number: number;
  text: string;
  choices: [Choice, Choice, Choice, Choice];
}

export interface ScenarioInputs {
  /** Comparable work items in the period. Null is unknown, not zero. */
  itemCount: number | null;
  /** Share of items missing the named connection, from 0 to 1. */
  missingShare: number | null;
  /** Active repair minutes for one affected item. */
  repairMinutes: number | null;
  necessaryHours: number | null;
  otherHours: number | null;
  /** Role-hours allocated to this workflow in the period. */
  availableHours: number | null;
  /**
   * Kingman variability factor (c_a² + c_s²) / 2.
   * 1 matches exponential arrivals and service. It is an assumption.
   */
  variability: number | null;
  nextMissingShare: number | null;
  nextRepairMinutes: number | null;
  /** Hours the new connection itself requires each period. */
  ongoingHours: number | null;
}

export interface Stage {
  id: string;
  label: string;
  detail: string;
  gap?: boolean;
  repair?: boolean;
}

export interface Department {
  id: DepartmentId;
  name: string;
  moniker: string;
  accent: string;
  signal: string;
  gap: string;
  repair: string;
  repairRole: string;
  connection: string;
  compare: string;
  workItem: string;
  period: string;
  stages: Stage[];
  sample: ScenarioInputs;
  action: {
    change: string;
    ownerRole: string;
    evidence: string;
    reviewInDays: number;
  };
  campaignLine?: string;
}

export interface ScenarioResult {
  known: boolean;
  issues: string[];
  repairHours: number | null;
  requiredHours: number | null;
  pressure: number | null;
  gapHours: number | null;
  marginHours: number | null;
  meanServiceHours: number | null;
  /** Waiting before handling, in hours, under the disclosed single-server model. */
  waitHours: number | null;
  /** Wait divided by mean handling time. */
  waitMultiple: number | null;
  queueState: 'finite-wait' | 'no-steady-state' | 'unknown';
  band: BandId;
}

export interface ComparisonResult {
  baseline: ScenarioResult;
  changed: ScenarioResult;
  repairDeltaHours: number | null;
  netReleasedHours: number | null;
  pressureWithOngoing: number | null;
}
