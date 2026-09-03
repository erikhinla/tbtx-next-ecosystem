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

export function StakesCopy() {
  const reduced = useReducedMotion();
  const [held, setHeld] = useState<(typeof POSITIONS)[number]["id"] | null>(null);
  const enteredRef = useRef(false);
  const [entered, setEntered] = useState(false);
  const closed = POSITIONS.filter((item) => !("brass" in item));
  const stand = POSITIONS.find((item) => "brass" in item);
  const heldPath = closed.find((item) => item.id === held) ?? null;

  useEffect(() => {
    if (entered) return;
    const stakes = document.getElementById("tbtx-stakes");
    if (!stakes) return;

    const limit = () => stakes.offsetTop + 10;

    const onWheel = (event: WheelEvent) => {
      if (enteredRef.current) return;
      if (window.scrollY >= limit() - 6 && event.deltaY > 0) {
        event.preventDefault();
        window.scrollTo(0, limit());
      }
    };

    let touchY = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (enteredRef.current) return;
      const y = event.touches[0]?.clientY ?? touchY;
      if (window.scrollY >= limit() - 6 && y < touchY) {
        event.preventDefault();
        window.scrollTo(0, limit());
      }
    };

    const onScroll = () => {
      if (enteredRef.current) return;
      if (window.scrollY > limit()) window.scrollTo(0, limit());
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [entered]);

  const enter = () => {
    enteredRef.current = true;
    setEntered(true);
    const next = document.getElementById("tbtx-stand");
    window.requestAnimationFrame(() => {
      next?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    });
  };

  if (!stand) return null;

  return (
    <div className={`tbtx-why tbtx-why--journey${held ? " is-held" : ""}`}>
      <header className="tbtx-why__lock">
        <p className="tbtx-why__kicker">AI is changing every aspect of life</p>
        <h2 id="tbtx-why-title" data-fog-text="Three ways this goes.">
          Three ways this goes.
        </h2>
      </header>

      <div className="tbtx-why__field" role="group" aria-labelledby="tbtx-why-title">
        <p className="tbtx-why__payoff">
          You brought in agents to get ahead. They start. They don&rsquo;t close. You do.
        </p>

        <div className={`tbtx-ways${held ? " is-held" : ""}`}>
          <div className="tbtx-ways__closed">
            {closed.map((item) => {
              const chosen = held === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={[
                    "tbtx-ways__path",
                    `tbtx-ways__path--${item.id}`,
                    chosen ? "is-chosen" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={chosen}
                  onClick={() => setHeld(item.id)}
                >
                  <span className="tbtx-ways__name">{item.title}</span>
                  <span className="tbtx-ways__cost">{item.story}</span>
                </button>
              );
            })}
          </div>

          <a
            href="#tbtx-stand"
            className="tbtx-ways__stand"
            aria-label={`${stand.title}. ${stand.story} ${stand.refrain}`}
            onClick={(event) => {
              event.preventDefault();
              enter();
            }}
          >
            <span className="tbtx-ways__name">{stand.title}</span>
            <span className="tbtx-ways__cost">{stand.story}</span>
            <span className="tbtx-ways__refrain">{stand.refrain}</span>
          </a>
        </div>

        <p className="tbtx-sr" aria-live="polite">
          {heldPath ? `${heldPath.title}. ${heldPath.story}` : ""}
        </p>
      </div>
    </div>
  );
}

export default StakesCopy;
