import choiceValues from './site-choice-values.json';
import { DEPARTMENT_WEIGHTS, manifestation } from './manifestation';
import { calculateEngagementPrice, PRICING_MODEL_VERSION } from './pricing';
import type { DepartmentId } from './types';

export function siteQuote(selections: unknown, departmentId: unknown, modifierOn: unknown = false) {
  if (typeof modifierOn !== 'boolean' || typeof departmentId !== 'string' || !Object.hasOwn(DEPARTMENT_WEIGHTS, departmentId) ||
      !Array.isArray(selections) || selections.length !== choiceValues.length ||
      Array.from(selections).some((choice) => !Number.isInteger(choice) || choice < 0 || choice > 3)) return null;
  const values = selections.map((choice, index) => choiceValues[index][choice] as 0 | 1 | 2);
  const result = manifestation({ answers: values, departmentId: departmentId as DepartmentId, modifierOn });
  // Only the public score and monetary breakdown leave the server.
  return {
    currency: 'USD', version: PRICING_MODEL_VERSION, departmentId, modifierOn,
    score: result.score, ...calculateEngagementPrice(result.score),
  };
}
