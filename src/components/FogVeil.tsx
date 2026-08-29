"use client";

import {
  useCallback,
  useRef,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

export function fogHaptic(ms = 12) {
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    navigator.vibrate(ms);
  }
}

export function trackFogPointer(el: HTMLElement, event: { clientX: number; clientY: number }) {
  const rect = el.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--fog-x", `${x.toFixed(2)}%`);
  el.style.setProperty("--fog-y", `${y.toFixed(2)}%`);
  el.style.setProperty("--fog-live", "1");
}

type FogVeilProps = {
  children: ReactNode;
  className?: string;
  film?: string | null;
  poster?: string;
};

export default function FogVeil({
  children,
  className = "",
  film = "/media/fog-cinematic.mp4",
  poster = "/media/fog-storm.jpg",
}: FogVeilProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    trackFogPointer(ref.current, event);
  }, []);

  const onLeave = useCallback(() => {
    ref.current?.style.setProperty("--fog-live", "0");
  }, []);

  const onDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    trackFogPointer(ref.current, event);
    if (event.pointerType === "touch") {
      ref.current.style.setProperty("--fog-open", "1");
    }
    fogHaptic(event.pointerType === "touch" ? 14 : 8);
  }, []);

  return (
    <div
      ref={ref}
      className={`tbtx-fog ${className}`.trim()}
      onPointerMove={onMove}
      onPointerEnter={onMove}
      onPointerLeave={onLeave}
      onPointerDown={onDown}
      style={
        {
          "--fog-x": "54%",
          "--fog-y": "36%",
          "--fog-live": "0",
          "--fog-open": "0",
        } as CSSProperties
      }
    >
      <div className="tbtx-fog__body">{children}</div>
      <div className="tbtx-fog__veil" aria-hidden="true">
        {film ? (
          <video autoPlay muted loop playsInline preload="metadata" poster={poster}>
            <source src={film} type="video/mp4" />
          </video>
        ) : null}
      </div>
    </div>
  );
}
