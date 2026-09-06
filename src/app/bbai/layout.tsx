import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BizBuilders AI | Infrastructure Before Acceleration",
  description: "Connect context, ownership, and handoffs around the people, AI agents and tools doing the work.",
  openGraph: {
    title: "BizBuilders AI | Infrastructure Before Acceleration",
    description: "Digital Fog becomes Digital Friction when output outpaces infrastructure.",
    images: ["/media/fog-to-route.jpg"],
  },
};

export default function BizBuildersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
