"use client";

import { useState } from "react";

const TILES = [
  {
    id: "back",
    face: "Sit back",
    insight:
      "Sit back, and the tools run the show. You lose the thread of your own work.",
    continues: false,
  },
  {
    id: "out",
    face: "Stay the coordinator",
    insight:
      "Stay the coordinator, and you spend your time cleaning up what the agents start. Chasing the current version. That's the job nobody wanted.",
    continues: false,
  },
  {
    id: "up",
    face: "The third path",
    insight:
      "Or, clear the digital fog first, so your focus goes back to the work that actually moves things. That's the third path.",
    continues: true,
  },
] as const;

type PathTilesProps = {
  onThird?: () => void;
};

export default function PathTiles({ onThird }: PathTilesProps) {
  const [open, setOpen] = useState<string | null>(null);

  const select = (id: string, continues: boolean) => {
    const next = open === id ? null : id;
    setOpen(next);
    if (continues && next === id) onThird?.();
  };

  return (
    <div className="tbtx-paths">
      <div className="tbtx-paths__rail">
        {TILES.map((tile, index) => {
          const flipped = open === tile.id;
          return (
            <article
              key={tile.id}
              className={`tbtx-path tbtx-path--${tile.id}${flipped ? " is-flipped" : ""}`}
            >
              <div className="tbtx-path__card">
                <button
                  type="button"
                  className="tbtx-path__face tbtx-path__face--front"
                  aria-pressed={flipped}
                  aria-expanded={flipped}
                  onClick={() => select(tile.id, tile.continues)}
                >
                  <span className="tbtx-path__index">{String(index + 1).padStart(2, "0")}</span>
                  <span className="tbtx-path__title">{tile.face}</span>
                </button>
                <div className="tbtx-path__face tbtx-path__face--back">
                  <button
                    type="button"
                    className="tbtx-path__insight"
                    onClick={() => select(tile.id, tile.continues)}
                  >
                    {tile.insight}
                  </button>
                  {tile.continues ? (
                    <a className="tbtx-path__go" href="#tbtx-doors">
                      Two places this shows up. Pick where you feel it most.
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
