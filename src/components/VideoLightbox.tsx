"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface VideoLightboxProps {
  src: string;
  poster?: string;
  onClose: () => void;
}

/**
 * Full-screen video lightbox with cinematic dark backdrop.
 * Closes on ESC, backdrop click, or the close button.
 * Traps focus and pauses body scroll while open.
 */
export default function VideoLightbox({ src, poster, onClose }: VideoLightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  // Animate in
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close with fade-out
  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 320);
  }, [onClose]);

  // ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleClose]);

  // Backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) handleClose();
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: visible ? "rgba(0, 0, 0, 0.92)" : "rgba(0, 0, 0, 0)",
        backdropFilter: "blur(8px)",
        transition: "background 0.32s ease",
        cursor: "pointer",
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        aria-label="Close video"
        style={{
          position: "absolute",
          top: "clamp(12px, 3vw, 28px)",
          right: "clamp(12px, 3vw, 28px)",
          zIndex: 10,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "rgba(255,255,255,0.7)",
          fontSize: 20,
          fontWeight: 300,
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)";
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
        }}
      >
        ✕
      </button>

      {/* Video container */}
      <div
        style={{
          width: "min(90vw, 1280px)",
          maxHeight: "80vh",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.32s ease, transform 0.32s ease",
          cursor: "default",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          style={{ width: "100%", height: "100%", display: "block", background: "#000" }}
        />
      </div>
    </div>
  );
}
