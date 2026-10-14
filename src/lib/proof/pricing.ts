/** Locked 2026-10-13: USD, one-time indicative BizBlueprint engagement. */
export const PRICING_MODEL_VERSION = 'proof-pricing-2026-10-13';
export const ANNUAL_COORDINATOR_BASIS = 95_000;
export const ENGAGEMENT_FACTOR = 0.15;
export const ENGAGEMENT_FLOOR = 1_500;

export interface EngagementPrice {
  annualLoad: number;
  rawEngagementPrice: number;
  finalPrice: number;
  floorApplied: boolean;
}

/** Input is manifestation().score, never the raw answer index. */
export function calculateEngagementPrice(score: number): EngagementPrice {
  if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
    throw new RangeError('The manifestation score must be a finite number from 0 to 100.');
  }
  const annualLoad = ANNUAL_COORDINATOR_BASIS * (score / 100);
  const rawEngagementPrice = annualLoad * ENGAGEMENT_FACTOR;
  const roundedPrice = Math.round(rawEngagementPrice);
  return {
    annualLoad,
    rawEngagementPrice,
    finalPrice: Math.max(roundedPrice, ENGAGEMENT_FLOOR),
    floorApplied: roundedPrice < ENGAGEMENT_FLOOR,
  };
}
