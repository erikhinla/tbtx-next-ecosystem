"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scrollcraft mounts on the TBTX homepage only. After client navigation it can
 * keep writing opacity onto the next page's <main>. Tear it down everywhere else.
 */
export default function ScrollcraftGuard() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/tbtx" || pathname === "/tbtx/") return;

    const scrollCraft = window.ScrollCraft as
      | (NonNullable<Window["ScrollCraft"]> & {
          unmount?: (root?: Document | HTMLElement) => void;
          destroy?: (root?: Document | HTMLElement) => void;
        })
      | undefined;

    try {
      if (typeof scrollCraft?.unmount === "function") scrollCraft.unmount(document);
      else if (typeof scrollCraft?.destroy === "function") scrollCraft.destroy(document);
    } catch {
      // engine is optional off the homepage
    }

    document.querySelectorAll("main").forEach((node) => {
      if (node instanceof HTMLElement && node.style.opacity === "0") {
        node.style.opacity = "";
      }
    });
  }, [pathname]);

  return null;
}
