"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const enteredRef = useRef(false);
  const [entered, setEntered] = useState(false);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const closed = POSITIONS.filter((item) => !("brass" in item));
  const stand = POSITIONS.find((item) => "brass" in item);
  const held = closed.filter((item) => flipped[item.id]);
  const heldAny = held.length > 0;

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

  const lockClosed = (id: string) => {
    setFlipped((current) => (current[id] ? current : { ...current, [id]: true }));
  };

  const enter = () => {
    if (enteredRef.current) return;
    enteredRef.current = true;
    setEntered(true);
    const go = () => router.push("/tbtx/scan");
    if (reduced) {
      go();
      return;
    }
    window.setTimeout(go, 920);
  };

  if (!stand) return null;

  return (
    <div
      className={`tbtx-why tbtx-why--journey tbtx-why--tiles${heldAny ? " is-held" : ""}${entered ? " is-entering" : ""}`}
    >
      <header className="tbtx-why__lock">
        <p className="tbtx-why__kicker">AI is changing every aspect of life</p>
        <h2 id="tbtx-why-title">Three ways this goes.</h2>
        <p className="tbtx-why__payoff">
          You brought in agents to get ahead. They start. They don&rsquo;t close. You do.
        </p>
      </header>

      <div className="tbtx-tiles" role="group" aria-labelledby="tbtx-why-title">
        {closed.map((item) => {
          const locked = Boolean(flipped[item.id]);
          return (
            <button
              key={item.id}
              type="button"
              className={[
                "tbtx-tile",
                "tbtx-tile--closed",
                `tbtx-tile--${item.id}`,
                locked ? "is-flipped" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={locked}
              aria-label={`${item.title}. ${item.story}`}
              onClick={() => lockClosed(item.id)}
            >
              <span className="tbtx-tile__inner">
                <span className="tbtx-tile__face tbtx-tile__face--front">
                  <span className="tbtx-tile__name">{item.title}</span>
                  <span className="tbtx-tile__cost">{item.story}</span>
                </span>
                <span className="tbtx-tile__face tbtx-tile__face--back">
                  <span className="tbtx-tile__name">{item.title}</span>
                  <span className="tbtx-tile__cost">{item.story}</span>
                </span>
              </span>
            </button>
          );
        })}

        <Link
          href="/tbtx/scan"
          className={`tbtx-tile tbtx-tile--up${entered ? " is-opening" : ""}`}
          aria-label={`${stand.title}. ${stand.story} ${stand.refrain}`}
          onClick={(event) => {
            event.preventDefault();
            enter();
          }}
        >
          <span className="tbtx-tile__face tbtx-tile__face--front">
            <span className="tbtx-tile__name">{stand.title}</span>
            <span className="tbtx-tile__cost">{stand.story}</span>
            <span className="tbtx-tile__refrain">{stand.refrain}</span>
          </span>
          <span className="tbtx-tile__mist" aria-hidden="true" />
        </Link>
      </div>

      <p className="tbtx-sr" aria-live="polite">
        {held.length
          ? held.map((item) => `${item.title}. ${item.story}`).join(" ")
          : ""}
      </p>
    </div>
  );
}

export default StakesCopy;
