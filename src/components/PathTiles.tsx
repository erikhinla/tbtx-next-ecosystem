"use client";

import { useState } from "react";

const TILES = [
  {
    id: "out",
    face: "Sit out",
    insight: "Leave the setup as it is.",
    after: "The loose ends remain.",
  },
  {
    id: "back",
    face: "Sit back",
    insight: "Keep adding AI agents and tools.",
    after: 'Keep connecting the pieces yourself.',
  },
  {
    id: "up",
    face: "STAND UP",
    insight:
      "Change the setup. Make room for what matters.",
    after: "Start where you feel the fog most.",
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
      <h2 className="tbtx-paths__cta tbtx-nowrap">Choose Your Path</h2>
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
                <span className="tbtx-path__title tbtx-nowrap">{tile.face}</span>
                <span className="tbtx-path__insight">{tile.insight}</span>
                <span className="tbtx-path__after" aria-hidden={!chosenHere}>
                  {tile.after}
                </span>
              </button>
              <span className="tbtx-path__fog" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </div>
  );
}
