"use client";

import { useState } from "react";

const TILES = [
  {
    id: "out",
    face: "Sit Out",
    insight:
      "Stay the coordinator, and you spend your time cleaning up what the agents start. Chasing the current version. That's the job nobody wanted.",
    continues: false,
  },
  {
    id: "back",
    face: "Sit Back",
    insight:
      "Sit back, and the tools run the show. You lose the thread of your own work.",
    continues: false,
  },
  {
    id: "up",
    face: "Stand UP",
    insight:
      "Or, clear the digital fog first, so your focus goes back to the work that actually moves things. That's the third path.",
    continues: true,
  },
] as const;

type PathId = (typeof TILES)[number]["id"];

type PathTilesProps = {
  onChoose?: (id: PathId) => void;
};

export default function PathTiles({ onChoose }: PathTilesProps) {
  const [chosen, setChosen] = useState<PathId | null>(null);

  const select = (id: PathId) => {
    setChosen(id);
    onChoose?.(id);
  };

  return (
    <div className="tbtx-paths" data-chosen={chosen ?? "none"}>
      <div className="tbtx-paths__rail">
        {TILES.map((tile) => {
          const flipped = chosen === tile.id;
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
                  onClick={() => select(tile.id)}
                >
                  <span className="tbtx-path__title">{tile.face}</span>
                </button>
                <div className="tbtx-path__face tbtx-path__face--back">
                  <button
                    type="button"
                    className="tbtx-path__insight"
                    onClick={() => select(tile.id)}
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
