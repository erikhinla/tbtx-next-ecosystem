"use client";

import DiagnosticEngine from "@/components/DiagnosticEngine";
import StandGate from "@/components/StandGate";

export default function DigitalFogDiagnosticPage() {
  return (
    <StandGate>
      <DiagnosticEngine brand="tbtx" lane="business" />
    </StandGate>
  );
}
