import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const OFFERS = [
  {
    id: "air",
    name: "Account Intelligence Report",
    price: "$143.82 CAD",
    cadence: "One time",
    url: "https://buy.stripe.com/aFa28qbIFedc90D5sd08g01",
    statement: "TRANSFORMBY10X.AI",
    note: "Does not mark Phase 1 paid.",
  },
  {
    id: "ddd",
    name: "Digital De-Fog Daily",
    price: "$7.77 USD",
    cadence: "One time · 30 days",
    url: "https://buy.stripe.com/dRm3cw1CDg4D7UR9VI8og01",
    statement: "transformby10x.ai",
    note: "One focus, a few decisions, one action, and a place to pick it up again.",
  },
] as const;

export async function GET() {
  return NextResponse.json({
    phaseOnePayment: "unpaid",
    owner: "BizBuilders AI",
    offers: OFFERS,
  });
}
