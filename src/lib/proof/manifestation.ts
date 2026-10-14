import type { DepartmentId } from './types';
import { MANIFESTATION_MODEL_VERSION } from './types';

export { MANIFESTATION_MODEL_VERSION };

/**
 * Recorded revision-3 scenario index.
 * The exponent, scale, weights, and modifier are uncalibrated assumptions.
 * This index is not repair hours, revenue loss, or a measured failure probability.
 */
/** Campaign codes. Pairs are the recorded weights for AM, FIN, LGL, PROD, STRAT, CRTV, PR, MEDIA, HR, and OPS. */
export const DEPARTMENT_WEIGHTS: Record<DepartmentId, { u: number; d: number }> = {
  ACC: { u: 1.2, d: 1.5 },
  FIN: { u: 1.5, d: 1.1 },
  LGL: { u: 1.6, d: 1.0 },
  PRD: { u: 1.1, d: 1.7 },
  STR: { u: 1.0, d: 1.4 },
  CRT: { u: 1.3, d: 1.3 },
  PR: { u: 1.4, d: 1.2 },
  MED: { u: 1.2, d: 1.4 },
  HR: { u: 1.0, d: 1.1 },
  OPS: { u: 1.8, d: 1.8 },
};

export interface ManifestationInput {
  /** Fifteen stored answer values. */
  answers: Array<0 | 1 | 2>;
  departmentId: DepartmentId;
  modifierOn: boolean;
}

export interface ManifestationResult {
  raw: number;
  index: number;
  outputFactor: number;
  fragility: number;
  effectiveFragility: number;
  departmentFactor: number;
  /** Capped scenario index, 0–100. Not a measured loss percentage. */
  score: number;
  /** Artistic height on a 0–30 scale. Not a physical measurement. */
  height: number;
  capped: boolean;
}

export function manifestation(input: ManifestationInput): ManifestationResult {
  const raw = input.answers.reduce<number>((sum, value) => sum + value, 0);
  const index = Math.round((100 * raw) / 30);
  const tools = input.answers[3] ?? 0;
  const aiFit = input.answers[7] ?? 0;
  const outputFactor = 0.2 + 0.15 * (tools + aiFit);
  const fragility = 1 - index / 100;
  const effectiveFragility = input.modifierOn ? 0.25 * fragility : fragility;
  const weights = DEPARTMENT_WEIGHTS[input.departmentId];
  const departmentFactor = Math.sqrt(weights.u * weights.d);

  if (effectiveFragility === 0) {
    return {
      raw,
      index,
      outputFactor,
      fragility,
      effectiveFragility,
      departmentFactor,
      score: 0,
      height: 0,
      capped: false,
    };
  }

  const product = outputFactor * effectiveFragility * (1 - index / 200) * departmentFactor;
  const uncapped = (100 / 1.5) * Math.pow(Math.max(0, product), 1.8);
  const score = Math.min(100, uncapped);

  return {
    raw,
    index,
    outputFactor,
    fragility,
    effectiveFragility,
    departmentFactor,
    score,
    height: 30 * (score / 100),
    capped: uncapped > 100,
  };
}
