"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "../vendor/scrollcraft/scrollcraft.css";
import VideoLightbox from "./VideoLightbox";
import FogTaskMosaic from "./FogTaskMosaic";
import Film from "./Film";
import { StakesCopy, StandCopy } from "./WhyJourney";
import { film } from "@/lib/media";

const HERO_SOUND_KEY = "tbtx-hero-sound";

/** Browser probes only. Blob `hero-site-827a.mp4` is h264 video-only (no audio stream). */

function filmHasAudio(video: HTMLVideoElement) {
  const probe = video as HTMLVideoElement & {
    mozHasAudio?: boolean;
    webkitAudioDecodedByteCount?: number;
    audioTracks?: { length: number };
  };
  if (probe.audioTracks && probe.audioTracks.length > 0) return true;
  if (probe.mozHasAudio === true) return true;
  if ((probe.webkitAudioDecodedByteCount ?? 0) > 0) return true;
  return false;
}

function HeroSoundGlyph({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M4.75 9.25h3.1L12 5.4v13.2l-4.15-3.85H4.75z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {on ? (
        <>
          <path
            d="M15.35 9.1c1.45 1.45 1.45 4.35 0 5.8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M17.85 6.85c2.7 2.55 2.7 7.75 0 10.3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </>
      ) : null}
    </svg>
  );
}

declare global {
  interface Window {
    ScrollCraft?: { mount: (root?: Document | HTMLElement) => unknown };
  }
}

/**
 * TransformBy10X front door — the scroll experience.
 *
 * Public contract: docs/PUBLIC_JOURNEY.md
 *   Arrival → Scan door → stakes journey → stand → Life/Map doors
 * Hero "Start Here" lands on the Digital Fog Scan.
 * No internal product language (WIN, GOAL, FLOW, Quad Keystones) on the cold path.
 * Vendor engine stays untouched. All composition is page-layer.
 */
export default function ScrollcraftTBTXExperience() {
  const rootRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const mountedRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const [showReel, setShowReel] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [reading, setReading] = useState(false);

  const hasAudioRef = useRef(false);
  const soundOnRef = useRef(false);

  const applySound = (on: boolean) => {
    const video = heroVideoRef.current;
    if (!video || !hasAudioRef.current) return;
    video.muted = !on;
    video.volume = on ? 1 : 0;
    if (on) void video.play();
    soundOnRef.current = on;
    setSoundOn(on);
    try {
      sessionStorage.setItem(HERO_SOUND_KEY, on ? "on" : "off");
    } catch {
      // session memory is optional
    }
  };

  const toggleHeroSound = () => {
    if (!hasAudioRef.current) return;
    applySound(!soundOnRef.current);
  };

  const inspectHeroAudio = (node?: HTMLVideoElement | null) => {
    const video = node ?? heroVideoRef.current;
    if (!video || hasAudioRef.current) return;
    if (!filmHasAudio(video)) return;
    hasAudioRef.current = true;
    setHasAudio(true);
    try {
      const remember = sessionStorage.getItem(HERO_SOUND_KEY) === "on";
      const gestured =
        typeof navigator !== "undefined" && Boolean(navigator.userActivation?.hasBeenActive);
      if (remember && gestured) applySound(true);
    } catch {
      // session memory is optional
    }
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
          const video = heroVideoRef.current;
          if (!video || !hasAudioRef.current) return;
          if (entry.isIntersecting) {
            if (soundOnRef.current) applySound(true);
            return;
          }
          video.muted = true;
          video.volume = 0;
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

  useEffect(() => {
    if (reducedMotion) {
      setReading(true);
      return;
    }
    const act = heroRef.current;
    if (!act) return;
    let frame = 0;
    const tick = () => {
      const y = window.scrollY || 0;
      if (y < 12) {
        setReading((current) => (current ? false : current));
      } else {
        const raw = parseFloat(getComputedStyle(act).getPropertyValue("--sc-p") || "0");
        const pin = (Number.isFinite(raw) ? raw : 0) >= 0.065;
        const page = y >= window.innerHeight * 0.04;
        const next = pin || page;
        setReading((current) => (current === next ? current : next));
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <main ref={rootRef} className="tbtx-sc" data-sc-root data-sc-lerp="0.14">
      {/* ---- a11y skip ---- */}
      <a className="tbtx-sc__skip" href="#tbtx-stakes">
        Skip the film
      </a>

      {/* ---- film grain (atmosphere) ---- */}
      <div className="sc-grain" aria-hidden="true" />

      {/* Film first. Lockups wait for a small scroll. Mute control mounts only if the file has audio. */}
      <section
        ref={heroRef}
        id="tbtx-hero"
        className={`tbtx-sc__hero${reading ? " is-reading" : ""}`}
        data-sc-act="pin"
        data-sc-span="1.6"
        data-sc-drift="#070b10"
        aria-label="Opening film"
      >
        <div className="sc-stage tbtx-sc__stage tbtx-sc__hero-stage" data-sc-stage>
          <Film
            ref={heroVideoRef}
            className="tbtx-sc__hero-film"
            src="/media/hero-site-827a.mp4"
            autoPlay
            muted={!soundOn}
            loop
            playsInline
            preload="auto"
            poster="/media/hero-site-827.jpg"
            aria-hidden="true"
            onLoadedMetadata={(event) => inspectHeroAudio(event.currentTarget)}
            onPlaying={(event) => inspectHeroAudio(event.currentTarget)}
          />
          <div className="tbtx-sc__hero-veil" aria-hidden="true" />
          <div className="tbtx-sc__hero-band" aria-hidden="true" />
          <div className="tbtx-sc__hero-copy sc-copy">
            <div className="tbtx-sc__lockup tbtx-sc__lockup--hook">
              <h1 className="tbtx-sc__hero-title">AI Created a Job.</h1>
              <p className="tbtx-sc__hero-punchline">(Nobody wanted.)</p>
            </div>
            <div className="tbtx-sc__lockup tbtx-sc__lockup--door">
              <p className="tbtx-sc__hero-mantle">Managing Digital Fog</p>
              <Link
                href="/scan"
                className="tbtx-sc__hero-cta"
                tabIndex={reading ? undefined : -1}
              >
                Start Here
              </Link>
            </div>
          </div>
          {hasAudio ? (
            <button
              type="button"
              className="tbtx-sc__hero-sound"
              onClick={toggleHeroSound}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Mute" : "Unmute"}
            >
              <HeroSoundGlyph on={soundOn} />
            </button>
          ) : null}
        </div>
      </section>

      <section
        id="tbtx-stakes"
        className="tbtx-sc__why-wrap"
        data-sc-act="pin"
        data-sc-span="2.2"
        data-sc-dwell="0.18"
        data-sc-drift="#0d1210"
      >
        <div className="sc-stage tbtx-sc__stage tbtx-sc__why-frame" data-sc-stage>
          <StakesCopy />
        </div>
      </section>

      <section
        id="tbtx-stand"
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
            <StandCopy />
          </div>
        </div>
      </section>

      {/* Doors come after the stand. Deep links still hit the scan threshold. */}
      <section
        id="tbtx-doors"
        className="tbtx-sc__split-wrap"
        data-sc-act="flow"
        data-sc-drift="#0d1210"
      >
        <div className="tbtx-sc__split">
          <Link
            href="/tbtx/scan"
            className="tbtx-sc__doorway"
            aria-label="Enter to Scan for Digital Fog in Life"
          >
            <div className="tbtx-sc__doorway-stage">
              <Film
                className="tbtx-sc__doorway-video"
                src="/media/door-b2c-827v2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/door-b2c-827v2.jpg"
              />
              <span className="tbtx-sc__doorway-enter">Enter to Scan for Digital Fog in Life</span>
            </div>
          </Link>
          <Link
            href="/tbtx/map"
            className="tbtx-sc__doorway"
            aria-label="Enter to Map Digital Friction in Business"
          >
            <div className="tbtx-sc__doorway-stage">
              <Film
                className="tbtx-sc__doorway-video"
                src="/media/door-b2b-827v2.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/media/door-b2b-827v2.jpg"
              />
              <span className="tbtx-sc__doorway-enter">Enter to Map Digital Friction in Business</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Invisible job as a moving mosaic — click a tile */}
      <section className="tbtx-sc__mosaic-wrap" data-sc-act="flow" data-sc-drift="#0d1210">
        <FogTaskMosaic />
      </section>

      <aside className="tbtx-sc__surface-note" aria-label="Digital Fog method">
        <p>Identify <span /> Visualize <span /> Lift</p>
        <strong>Digital Fog is the leftover job. Name it. See it. Get the making back.</strong>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════════
         COMMITMENT & THE FOUNDER
         After the why. CTA returns to the doors, not a skip past stakes.
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
          <Film
            className="tbtx-sc__close-still"
            src="/media/founder-erik.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-solo.jpg"
            aria-label="Founder of TransformBy10X"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="sc-scrim sc-scrim--lead" />
          <div className="tbtx-sc__close-copy sc-copy sc-copy--lead" data-sc-cue="0.1 0.92 0 0">
            <p className="tbtx-sc__refrain">You don&rsquo;t need more AI. Clear the fog.</p>
            <a href="#tbtx-doors" className="tbtx-fog-go" data-sc-magnet="0.35">
              Choose a door
            </a>
            <button type="button" onClick={() => setShowReel(true)} className="tbtx-fog-link">
              See how the day plays out
            </button>
            <div className="tbtx-sc__founder">
              <p>The gap isn&rsquo;t AI adoption. The gap is operational architecture.</p>
              <p>
                I know what fog feels like. I started in project management at global agencies
                decades ago, back when large retainers were the norm and Digital Fog was a
                bill-to code.
              </p>
              <p>
                Now I dedicate the next decades to lifting society&rsquo;s fog.
              </p>
            </div>
          </div>
        </div>
      </section>

      {showReel && (
        <VideoLightbox
          src={film("/media/long-form-combined-lowres.mp4")}
          onClose={() => setShowReel(false)}
        />
      )}
    </main>
  );
}
