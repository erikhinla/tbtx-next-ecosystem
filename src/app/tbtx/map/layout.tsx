import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map your business",
  description: "Answer fifteen questions about context, ownership, and handoffs. Choose a place to start.",
};

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
