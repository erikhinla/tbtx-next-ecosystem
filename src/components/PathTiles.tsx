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
  const [fog, setFog] = useState<PathId | null>(null);

  const select = (id: PathId) => {
    setChosen(id);
    setFog(id);
    window.setTimeout(() => {
      setFog((current) => (current === id ? null : current));
    }, 1100);
    onChoose?.(id);
  };

  return (
    <div className="tbtx-paths" data-chosen={chosen ?? "none"}>
      <h2 className="tbtx-paths__cta">Choose Your Path</h2>
      <div className="tbtx-paths__rail">
        {TILES.map((tile) => {
          const chosenHere = chosen === tile.id;
          const fogging = fog === tile.id;
          return (
            <article
              key={tile.id}
              className={`tbtx-path tbtx-path--${tile.id}${chosenHere ? " is-chosen" : ""}${fogging ? " is-fogging" : ""}`}
            >
              <button
                type="button"
                className="tbtx-path__face"
                aria-pressed={chosenHere}
                onClick={() => select(tile.id)}
              >
                <span className="tbtx-path__title">{tile.face}</span>
                <span className="tbtx-path__insight">{tile.insight}</span>
                {tile.continues && chosenHere ? (
                  <span className="tbtx-path__go">
                    Two places this shows up. Pick where you feel it most.
                  </span>
                ) : null}
              </button>
              <span className="tbtx-path__fog" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </div>
  );
}
