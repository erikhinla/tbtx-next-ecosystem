"use client";

import { useEffect, useRef, useState } from "react";
import "../vendor/scrollcraft/scrollcraft.css";
import Film from "./Film";
import { StakesCopy } from "./WhyJourney";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root?: Document | HTMLElement) => unknown };
  }
}

/**
 * TransformBy10X front door — the scroll experience.
 *
 * Arrival (HUD film) → nested doors → /tbtx/scan.
 * Hero "Start Here" goes to the doors, never past them.
 * Sit out and Sit back shut and stay shut. Stand up opens Scan.
 * No internal product language (WIN, GOAL, FLOW, Quad Keystones) on the cold path.
 * Vendor engine stays untouched. All composition is page-layer.
 */
export default function ScrollcraftTBTXExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const mountedRef = useRef(false);
  const [soundOn, setSoundOn] = useState(false);

  const toggleHeroSound = () => {
    const video = heroVideoRef.current;
    if (!video) return;
    const next = !soundOn;
    video.muted = !next;
    if (next) void video.play();
    setSoundOn(next);
  };

  useEffect(() => {
    let cancelled = false;
    let mountedWithApi = false;

    async function loadAndMount() {
      try {
        // @ts-ignore — vendor JS, not a module; mounts on window.ScrollCraft
        const module = await import("../vendor/scrollcraft/scrollcraft.js");
        if (cancelled || mountedRef.current || !rootRef.current) return;

        const scrollCraft =
          (module as { ScrollCraft?: Window["ScrollCraft"] }).ScrollCraft ?? window.ScrollCraft;

        if (!scrollCraft || typeof scrollCraft.mount !== "function") {
          console.warn("Scrollcraft loaded without a mount function.");
          return;
        }

        scrollCraft.mount(rootRef.current);
        mountedWithApi = true;
        mountedRef.current = true;
      } catch (error) {
        console.error("Unable to load Scrollcraft.", error);
      }
    }

    void loadAndMount();

    const hero = heroVideoRef.current;
    const observer =
      hero &&
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting || !heroVideoRef.current) return;
          heroVideoRef.current.muted = true;
          setSoundOn(false);
        },
        { threshold: 0.2 }
      );
    if (hero && observer) observer.observe(hero);

    return () => {
      observer?.disconnect();
      cancelled = true;
      if (!mountedWithApi || !window.ScrollCraft) return;
      const scrollCraft = window.ScrollCraft as Window["ScrollCraft"] & {
        unmount?: (root?: Document | HTMLElement) => void;
        destroy?: (root?: Document | HTMLElement) => void;
      };
      try {
        if (typeof scrollCraft.unmount === "function") {
          scrollCraft.unmount(rootRef.current ?? document);
        } else if (typeof scrollCraft.destroy === "function") {
          scrollCraft.destroy(rootRef.current ?? document);
        }
      } catch (error) {
        console.warn("Unable to clean up Scrollcraft.", error);
      }
    };
  }, []);

  return (
    <main ref={rootRef} className="tbtx-sc" data-sc-root data-sc-lerp="0.14">
      <a className="tbtx-sc__skip" href="#tbtx-stakes">
        Skip to the doors
      </a>

      <div className="sc-grain" aria-hidden="true" />

      {/* Baked HUD lockup film. HTML is the CTA only. Do not torch. */}
      <section
        className="tbtx-sc__hero"
        data-sc-act="pin"
        data-sc-span="1.6"
        data-sc-drift="#070b10"
      >
        <div className="sc-stage tbtx-sc__stage tbtx-sc__hero-stage" data-sc-stage>
          <h1 className="tbtx-sc__sr">
            AI Created a Job. Nobody wanted. Managing Digital Fog.
          </h1>
          <Film
            ref={heroVideoRef}
            className="tbtx-sc__hero-film"
            src="/media/hero-site-827a.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-site-827.jpg"
            aria-hidden="true"
          />
          <a href="#tbtx-stakes" className="tbtx-sc__hero-cta">
            Start Here
          </a>
          <button
            type="button"
            className="tbtx-sc__hero-sound"
            onClick={toggleHeroSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute" : "Unmute"}
          >
            {soundOn ? "🔊" : "🔇"}
          </button>
        </div>
      </section>

      <section
        id="tbtx-stakes"
        className="tbtx-sc__why-wrap"
        data-sc-act="flow"
        data-sc-drift="#0d1210"
      >
        <div className="tbtx-sc__why-frame">
          <StakesCopy />
        </div>
      </section>
    </main>
  );
}
