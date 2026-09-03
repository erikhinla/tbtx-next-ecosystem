"use client";

import Link from "next/link";
import { useState } from "react";

const CLOSED = [
  {
    id: "out",
    title: "Sit out",
    joke: "Refuse the tools. Get outrun by people who didn't.",
  },
  {
    id: "back",
    title: "Sit back",
    joke: "Let AI start everything. You spend the day finishing it.",
  },
] as const;

const STAND = {
  id: "up",
  title: "Stand up",
  joke: "Get your attention back to work only you can do.",
} as const;

type ClosedId = (typeof CLOSED)[number]["id"];

export function StakesCopy() {
  const [shut, setShut] = useState<Record<ClosedId, boolean>>({
    out: false,
    back: false,
  });
  const sealed = CLOSED.filter((door) => shut[door.id]);

  return (
    <div className="tbtx-nest-doors">
      <div className="tbtx-nest-doors__stage" role="group" aria-label="Sit out, Sit back, or Stand up">
        {CLOSED.map((door) => {
          const closed = shut[door.id];
          return (
            <button
              key={door.id}
              type="button"
              className={["tbtx-door", `tbtx-door--${door.id}`, closed ? "is-shut" : ""]
                .filter(Boolean)
                .join(" ")}
              aria-pressed={closed}
              aria-label={
                closed ? `${door.title}. Closed. ${door.joke}` : `${door.title}. ${door.joke}`
              }
              onClick={() => {
                if (closed) return;
                setShut((current) => ({ ...current, [door.id]: true }));
              }}
            >
              <span className="tbtx-door__jamb" aria-hidden="true" />
              <span className="tbtx-door__leaf">
                <span className="tbtx-door__name">{door.title}</span>
                <span className="tbtx-door__joke">{door.joke}</span>
              </span>
            </button>
          );
        })}

        <Link
          href="/tbtx/scan"
          className="tbtx-door tbtx-door--up"
          aria-label={`${STAND.title}. ${STAND.joke}`}
        >
          <span className="tbtx-door__jamb" aria-hidden="true" />
          <span className="tbtx-door__leaf">
            <span className="tbtx-door__name">{STAND.title}</span>
            <span className="tbtx-door__joke">{STAND.joke}</span>
          </span>
        </Link>
      </div>
      <p className="tbtx-sc__sr" aria-live="polite">
        {sealed.length ? sealed.map((door) => `${door.title} is closed. ${door.joke}`).join(" ") : ""}
      </p>
    </div>
  );
}

export function StandCopy() {
  return null;
}
