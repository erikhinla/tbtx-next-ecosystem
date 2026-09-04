"use client";

import DiagnosticEngine from "@/components/DiagnosticEngine";
import StandGate from "@/components/StandGate";

export default function MomentumMapPage() {
  return (
    <StandGate>
      <DiagnosticEngine lane="business" />
    </StandGate>
  );
}
