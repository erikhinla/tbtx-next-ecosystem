import type { Metadata } from "next";
import ScrollcraftTBTXExperience from "@/components/ScrollcraftTBTXExperience";

export const metadata: Metadata = {
  title: "TransformBy10X | Digital Fog, in motion",
  description: "A Scrollcraft-driven TransformBy10X experience for clearing Digital Fog.",
};

export default function ScrollcraftDemoPage() {
  return <ScrollcraftTBTXExperience />;
}
