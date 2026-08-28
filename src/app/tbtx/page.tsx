import type { Metadata } from "next";
import ScrollcraftTBTXExperience from "@/components/ScrollcraftTBTXExperience";

export const metadata: Metadata = {
  title: "Managing Digital Fog",
  description:
    "AI created a job. Nobody wanted. Start here.",
};

export default function TBTXHome() {
  return <ScrollcraftTBTXExperience />;
}
