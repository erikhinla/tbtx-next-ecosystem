import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan your life",
  description: "Answer eight questions about where your day gets held up. Find a small change to start with.",
};

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
