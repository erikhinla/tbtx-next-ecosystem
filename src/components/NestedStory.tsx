"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

const POSITIONS = [
  {
    id: "out",
    n: "01",
    title: "Sit out",
    story: "Refuse the tools. Get outrun by people who didn't.",
  },
  {
    id: "back",
    n: "02",
    title: "Sit back",
    story: "Let AI start everything. You spend the day finishing it. That's the job nobody posted.",
  },
  {
    id: "up",
    n: "03",
    title: "Stand up",
    story: "Get your attention back to work only you can do.",
    refrain: "You don't need more AI. Clear the fog.",
    brass: true,
  },
] as const;

export function useTypedLine(text: string, play: boolean) {
  const reduced = useReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  const [done, setDone] = useState(Boolean(reduced));

  useEffect(() => {
    if (!play) {
      setOut("");
      setDone(false);
      return;
    }
    if (reduced) {
      setOut(text);
      setDone(true);
      return;
    }

    setOut("");
    setDone(false);
    let i = 0;
    const step = text.length > 72 ? 2 : 1;
    const delay = text.length > 72 ? 14 : 18;
    const id = window.setInterval(() => {
      i = Math.min(text.length, i + step);
      setOut(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, delay);
    return () => window.clearInterval(id);
  }, [play, reduced, text]);

  const finish = useCallback(() => {
    setOut(text);
    setDone(true);
  }, [text]);

  return { out, done, finish };
}

export function useNestBeats(total: number, autoFirstMs = 0) {
  const [beat, setBeat] = useState(0);
  const beatRef = useRef(0);
  beatRef.current = beat;

  const go = useCallback(
    (next: number) => {
      setBeat((current) => {
        const clamped = Math.max(0, Math.min(total - 1, next));
        beatRef.current = clamped;
        return clamped;
      });
    },
    [total],
  );

  const advance = useCallback(() => {
    go(beatRef.current + 1);
  }, [go]);

  const back = useCallback(() => {
    go(beatRef.current - 1);
  }, [go]);

  useEffect(() => {
    if (!autoFirstMs || beat !== 0) return;
    const timer = window.setTimeout(() => go(1), autoFirstMs);
    return () => window.clearTimeout(timer);
  }, [autoFirstMs, beat, go]);

  return { beat, beatRef, go, advance, back };
}

export function NestLine({
  text,
  play,
  className,
  as: Tag = "p",
}: {
  text: string;
  play: boolean;
  className?: string;
  as?: "p" | "h2" | "h3" | "span";
}) {
  const { out, done } = useTypedLine(text, play);
  return (
    <Tag className={className} data-nest-done={done ? "true" : "false"}>
      {out}
      {play && !done ? <span className="tbtx-nest__caret" aria-hidden="true" /> : null}
    </Tag>
  );
}

type NestFieldProps = {
  className?: string;
  labelledBy?: string;
  beat: number;
  lastBeat: number;
  advance: () => void;
  back: () => void;
  children: ReactNode;
};

export function NestField({
  className,
  labelledBy,
  beat,
  lastBeat,
  advance,
  back,
  children,
}: NestFieldProps) {
  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      advance();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      back();
    }
  };

  return (
    <div
      className={className}
      tabIndex={0}
      role="group"
      aria-labelledby={labelledBy}
      aria-live="polite"
      data-nest-beat={beat}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.closest("a,button")) return;
        if (beat < lastBeat) advance();
      }}
    >
      {children}
    </div>
  );
}

function usePinnedProgress(actId: string, map: (progress: number) => number) {
  const mapRef = useRef(map);
  mapRef.current = map;
  const [fromScroll, setFromScroll] = useState(0);

  useEffect(() => {
    const act = document.getElementById(actId);
    if (!act) return;

    let frame = 0;
    const tick = () => {
      const raw = parseFloat(getComputedStyle(act).getPropertyValue("--sc-p") || "0");
      const next = mapRef.current(Number.isFinite(raw) ? raw : 0);
      setFromScroll((current) => (current === next ? current : next));
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [actId]);

  return fromScroll;
}

export function StakesCopy() {
  const { beat, beatRef, go, advance, back } = useNestBeats(4);
  const fromScroll = usePinnedProgress("tbtx-stakes", (progress) => {
    if (progress < 0.16) return 0;
    if (progress < 0.4) return 1;
    if (progress < 0.68) return 2;
    return 3;
  });

  useEffect(() => {
    if (fromScroll > beatRef.current) go(fromScroll);
  }, [fromScroll, go, beatRef]);

  const current = beat > 0 ? POSITIONS[beat - 1] : null;
  const upcoming = beat < 3 ? POSITIONS[beat] : null;

  return (
    <div className="tbtx-why tbtx-why--journey">
      <header className="tbtx-why__lock">
        <p className="tbtx-why__kicker">AI is changing every aspect of life</p>
        <h2 id="tbtx-why-title" data-fog-text="Three ways this goes.">
          Three ways this goes.
        </h2>
      </header>

      <NestField
        className="tbtx-why__field tbtx-nest tbtx-nest--why"
        labelledBy="tbtx-why-title"
        beat={beat}
        lastBeat={3}
        advance={advance}
        back={back}
      >
        <NestLine
          className="tbtx-why__payoff tbtx-nest__payoff"
          text="You brought in agents to get ahead. They start. They don't close. You do."
          play
        />

        <ol className="tbtx-nest__rail" aria-label="Three ways">
          {POSITIONS.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={[
                  "tbtx-nest__mark",
                  beat === index + 1 ? "is-now" : "",
                  beat > index + 1 ? "is-past" : "",
                  "brass" in item ? "is-brass" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={beat === index + 1 ? "step" : undefined}
                disabled={index > beat}
                onClick={(event) => {
                  event.stopPropagation();
                  go(index + 1);
                }}
              >
                {item.n}
              </button>
            </li>
          ))}
        </ol>

        {current ? (
          <article
            key={current.id}
            className={[
              "tbtx-nest__beat",
              `tbtx-nest__beat--${current.id}`,
              "brass" in current ? "tbtx-nest__beat--brass is-open" : "is-open",
            ].join(" ")}
          >
            <h3 className="tbtx-nest__peel">
              <small>{current.n}</small>
              <span>{current.title}</span>
            </h3>
            <div id={`tbtx-why-${current.id}`} className="tbtx-nest__support">
              <NestLine className="tbtx-why__story" text={current.story} play />
              {"refrain" in current ? (
                <NestLine className="tbtx-why__refrain" text={current.refrain} play />
              ) : null}
            </div>
          </article>
        ) : null}

        {upcoming ? (
          <button
            type="button"
            className={[
              "tbtx-nest__peel tbtx-nest__next",
              "brass" in upcoming ? "tbtx-nest__beat--brass" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={(event) => {
              event.stopPropagation();
              go(beat + 1);
            }}
          >
            <small>{upcoming.n}</small>
            <span>{upcoming.title}</span>
          </button>
        ) : null}
      </NestField>
    </div>
  );
}

export default StakesCopy;
