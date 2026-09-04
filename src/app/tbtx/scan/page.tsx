"use client";

import DiagnosticEngine from "@/components/DiagnosticEngine";
import StandGate from "@/components/StandGate";

export default function PersonalScanPage() {
  return (
    <StandGate>
      <DiagnosticEngine lane="personal" />
    </StandGate>
  );
}
