"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { hasStoodUp } from "@/lib/stand-gate";

export default function StandGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (hasStoodUp()) {
      setAllowed(true);
      return;
    }
    router.replace("/tbtx#tbtx-stakes");
  }, [router]);

  if (!allowed) return null;
  return children;
}
