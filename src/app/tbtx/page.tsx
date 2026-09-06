import type { Metadata } from "next";
import ScrollcraftTBTXExperience from "@/components/ScrollcraftTBTXExperience";

export const metadata: Metadata = {
  title: "Managing Digital Fog",
  description:
    "Find where AI agents and tools outpace your setup. Choose where to start.",
};

export default function TBTXHome() {
  return <ScrollcraftTBTXExperience />;
}
