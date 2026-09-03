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
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (fromScroll > beatRef.current) go(fromScroll);
  }, [fromScroll, go, beatRef]);

  useEffect(() => {
    const current = POSITIONS[beat - 1];
    setOpenId(current ? current.id : null);
  }, [beat]);

  const openPosition = (index: number) => {
    if (index + 1 > beat) go(index + 1);
    setOpenId(POSITIONS[index].id);
  };

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

        <ol className="tbtx-nest__beats">
          {POSITIONS.map((item, index) => {
            const visible = index <= beat;
            if (!visible) return null;
            const unlocked = beat >= index + 1;
            const isOpen = unlocked && openId === item.id;
            return (
              <li
                key={item.id}
                className={[
                  "tbtx-nest__beat",
                  `tbtx-nest__beat--${item.id}`,
                  "brass" in item ? "tbtx-nest__beat--brass" : "",
                  unlocked ? "is-unlocked" : "is-next",
                  isOpen ? "is-open" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  className="tbtx-nest__peel"
                  aria-expanded={isOpen}
                  aria-controls={`tbtx-why-${item.id}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    openPosition(index);
                  }}
                >
                  <small>{item.n}</small>
                  <span>{item.title}</span>
                </button>
                <div
                  id={`tbtx-why-${item.id}`}
                  className="tbtx-nest__support"
                  hidden={!isOpen}
                >
                  {isOpen ? (
                    <>
                      <NestLine className="tbtx-why__story" text={item.story} play={isOpen} />
                      {"refrain" in item ? (
                        <NestLine className="tbtx-why__refrain" text={item.refrain} play={isOpen} />
                      ) : null}
                    </>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </NestField>
    </div>
  );
}

export default StakesCopy;
