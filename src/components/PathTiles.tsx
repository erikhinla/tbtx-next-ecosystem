"use client";

import { useState } from "react";

const TILES = [
  {
    id: "out",
    face: "Sit out",
    insight: "Ignore the infrastructure AI is built on and the tools that run on it.",
    after: "Get outrun by the people who\u00a0didn't.",
  },
  {
    id: "back",
    face: "Sit back",
    insight: "AI agents kick off the creative. You pick up coordinating the\u00a0context.",
    after: 'And you never get off the hamster wheel of "busyness" to live to good\u00a0purpose.',
  },
  {
    id: "up",
    face: "Stand UP",
    insight:
      "Get clarity and gain momentum by focusing on the things you're made for in work and life. You pick where you feel the fog\u00a0most.",
    after: "Your future self thanks\u00a0you.",
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
