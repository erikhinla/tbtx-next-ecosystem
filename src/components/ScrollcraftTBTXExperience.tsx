"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import "../vendor/scrollcraft/scrollcraft.css";
import VideoLightbox from "./VideoLightbox";
import FogTaskMosaic from "./FogTaskMosaic";
import NestedStory from "./NestedStory";

declare global {
  interface Window {
    ScrollCraft?: { mount: (root?: Document | HTMLElement) => unknown };
  }
}

/**
 * TransformBy10X 2.3 front door — the scroll experience.
 *
 * Five-beat feeling curve (canon-aligned):
 *   1. Recognition (scrub + kinetic type) — "Why does using AI feel like more work?"
 *   2. Tension (flow + iris reveal)       — "It's structural, not personal."
 *   3. Peak (pin + fog-clearing moment)   — "There is a route out."
 *   4. Orientation (pan rail, 2 doors)    — "I know which door is mine."
 *   5. Commitment (pin + founder close)   — "I know who built this."
 *
 * Copy authority: TYPE_AND_CTA_LOCK.md + 04_UX_UI_LAUNCH_JOURNEY_AND_MESSAGE_MAP.md
 * No internal product language (WIN, GOAL, FLOW, Quad Keystones) on cold front door.
 * Vendor engine stays untouched. All composition is page-layer.
 */
export default function ScrollcraftTBTXExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const mountedRef = useRef(false);
  const [showReel, setShowReel] = useState(false);
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
      {/* ---- a11y skip ---- */}
      <a className="tbtx-sc__skip" href="#tbtx-doors">
        Skip to the doors
      </a>

      {/* ---- film grain (atmosphere) ---- */}
      <div className="sc-grain" aria-hidden="true" />

      {/* Baked lockup film. HTML is the CTA only. */}
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
          <video
            ref={heroVideoRef}
            className="tbtx-sc__hero-film"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-site-827.jpg"
            aria-hidden="true"
          >
            <source src="/media/hero-site-827a.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            className="tbtx-sc__hero-sound"
            onClick={toggleHeroSound}
            aria-pressed={soundOn}
          >
            {soundOn ? "Mute" : "Unmute"}
          </button>
          <a href="#tbtx-doors" className="tbtx-sc__hero-cta" data-sc-magnet="0.25">
            Start Here
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         BEAT 2 — TWO DOORS, FULL SCREEN
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="tbtx-doors"
        className="tbtx-sc__split-wrap"
        data-sc-act="flow"
        data-sc-drift="#0d1210"
      >
        <div className="tbtx-sc__split">
          <Link href="/tbtx/scan" className="tbtx-sc__doorway">
            <video
              className="tbtx-sc__doorway-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/door-b2c-827v2.jpg"
            >
              <source src="/media/door-b2c-827v2.mp4" type="video/mp4" />
            </video>
            <div className="tbtx-sc__doorway-copy">
              <strong>Your day</strong>
              <em>Start Here</em>
            </div>
          </Link>
          <Link href="/tbtx/map" className="tbtx-sc__doorway">
            <video
              className="tbtx-sc__doorway-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/door-b2b-827v2.jpg"
            >
              <source src="/media/door-b2b-827v2.mp4" type="video/mp4" />
            </video>
            <div className="tbtx-sc__doorway-copy">
              <strong>The business</strong>
              <em>Start Here</em>
            </div>
          </Link>
        </div>
      </section>

      {/* Invisible job as a moving mosaic — click a tile */}
      <section className="tbtx-sc__mosaic-wrap" data-sc-act="flow" data-sc-drift="#0d1210">
        <FogTaskMosaic />
      </section>

      <section
        className="tbtx-sc__storm tbtx-sc__explain"
        data-sc-act="flow"
        data-sc-drift="#0f1714"
      >
        <div className="sc-stage tbtx-sc__stage tbtx-sc__storm-stage" data-sc-stage>
          <img
            className="tbtx-sc__storm-video"
            src="/media/digital-fog-lockup-827.jpg"
            alt=""
          />
          <div className="sc-scrim sc-scrim--band" />
          <div className="tbtx-sc__storm-copy sc-copy sc-copy--lead">
            <NestedStory />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
         BEAT 5 — COMMITMENT & THE FOUNDER
         Device: pin (held close)
         Feeling: "I can take one clear action. I know who is behind this."
         ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="tbtx-sc-close"
        className="tbtx-sc__close"
        data-sc-act="pin"
        data-sc-span="1.8"
        data-sc-dwell="0.22"
        data-sc-drift="#0d1210"
      >
        <div className="sc-stage tbtx-sc__stage tbtx-sc__close-stage" data-sc-stage>
          <video
            className="tbtx-sc__close-still"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-solo.jpg"
            aria-label="Founder of TransformBy10X"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          >
            <source src="/media/founder-erik.mp4" type="video/mp4" />
          </video>
          <div className="sc-scrim sc-scrim--lead" />
          <div className="tbtx-sc__close-copy sc-copy sc-copy--lead" data-sc-cue="0.1 0.92 0 0">
            <a href="#tbtx-doors" className="tbtx-sc__cta" data-sc-magnet="0.35">
              Start Here
            </a>
            <button
              type="button"
              onClick={() => setShowReel(true)}
              className="tbtx-sc__cta tbtx-sc__cta--ghost"
              style={{
                marginTop: 12,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
                fontSize: 'inherit',
                fontFamily: 'inherit',
              }}
            >
              See how the day plays out
            </button>
          </div>
        </div>
      </section>

      {showReel && (
        <VideoLightbox
          src="/media/long-form-combined-lowres.mp4"
          onClose={() => setShowReel(false)}
        />
      )}
    </main>
  );
}
