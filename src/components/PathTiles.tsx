"use client";

import { useState } from "react";

const TILES = [
  {
    id: "out",
    index: "01",
    face: "Sit out",
    insight:
      "Ignore the infrastructure AI is built on and the tools that run on it. Get outrun by the people who didn't.",
    continues: false,
  },
  {
    id: "back",
    index: "02",
    face: "Sit back",
    insight: "AI agents kick off the creative. You pick up coordinating the context.",
    continues: false,
  },
  {
    id: "up",
    index: "03",
    face: "Stand UP",
    insight:
      "Get clarity and gain momentum by focusing on the things you're made for in work and life. You pick where you feel the fog most.",
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
                <span className="tbtx-path__index">{tile.index}</span>
                <span className="tbtx-path__title">{tile.face}</span>
                <span className="tbtx-path__insight">{tile.insight}</span>
                {tile.continues ? null : (
                  <span className="tbtx-path__mark">Choose this consequence</span>
                )}
              </button>
              <span className="tbtx-path__fog" aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </div>
  );
}
