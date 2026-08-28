import type { Metadata } from "next";
import ScrollcraftTBTXExperience from "@/components/ScrollcraftTBTXExperience";

export const metadata: Metadata = {
  title: "TransformBy10X | Clear the fog",
  description:
    "AI created a job nobody applied for: managing Digital Fog. Run the diagnostic and get a report of what your answers actually named.",
};

export default function ScrollcraftDemoPage() {
  return <ScrollcraftTBTXExperience />;
}
