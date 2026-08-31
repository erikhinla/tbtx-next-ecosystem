import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BizBuilders AI | Infrastructure Before Acceleration",
  description: "Find the operational drag, restore context, and build governed execution beneath people and AI.",
  openGraph: {
    title: "BizBuilders AI | Infrastructure Before Acceleration",
    description: "Digital Fog becomes Digital Friction when output outpaces infrastructure.",
    images: ["/media/fog-to-route.jpg"],
  },
};

export default function BizBuildersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
