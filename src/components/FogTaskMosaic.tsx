"use client";

import { useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { fogHaptic, trackFogPointer } from "./FogVeil";
import Film from "./Film";

const FACTS = [
  {
    id: "61",
    area: "lead",
    src: "/media/task-logos.mp4",
    poster: "/media/task-logos.jpg",
    hook: "An AI agent made 83 logos. You still have to pick.",
    story: "More options. The same decision.",
  },
  {
    id: "12",
    area: "cut",
    src: "/media/b2b-sold-ai.mp4",
    poster: "/media/grok-b2b-billboard.jpg",
    hook: "AI agents and tools start the work. You connect the pieces.",
    story: "Finding context. Checking output. Deciding what happens next.",
  },
  {
    id: "44",
    area: "pulse",
    src: "/media/task-clockout.mp4",
    poster: "/media/task-clockout.jpg",
    hook: "You closed the laptop. The AI agents kept going.",
    story: "Tomorrow starts with another queue to review.",
  },
  {
    id: "7",
    area: "night",
    src: "/media/computer-explodes.mp4",
    poster: "/media/fog-context.jpg",
    hook: "Three AI agents. Three answers. Your decision.",
    story: "More output, more arbitration.",
  },
  {
    id: "28",
    area: "crowd",
    src: "/media/hero-fog-people.mp4",
    poster: "/media/hero-fog-poster.jpg",
    hook: "Everyone else already 'gets it.' That's the feeling.",
    story: "Someone else's pace does not have to set yours.",
  },
  {
    id: "19",
    area: "same",
    src: "/media/task-lives.mp4",
    poster: "/media/task-lives.jpg",
    hook: "AI agents and tools at work. Loose ends at home.",
    story: "Different tasks can leave you with the same job: keeping track.",
  },
] as const;

const SCENE_PLACEHOLDER =
  "Dana needed the Monday recap for the 9am client. She asked Claude so she could leave at 6. At 11 she was still putting Tuesday's numbers back in.";

export default function FogTaskMosaic() {
  const [open, setOpen] = useState<string | null>(null);
  const [fact, setFact] = useState("");
  const [sentLine, setSentLine] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const active = FACTS.find((item) => item.id === open);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/fog-facts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fact }),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setSentLine(fact);
      setFact("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const onTilePointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    trackFogPointer(event.currentTarget, event);
  };

  return (
    <div className="tbtx-mosaic">
      <div className="tbtx-mosaic__grid">
        {FACTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="tbtx-mosaic__tile"
            data-area={item.area}
            onClick={() => {
              setOpen(item.id);
              fogHaptic(16);
            }}
            onPointerMove={onTilePointer}
            onPointerEnter={onTilePointer}
            onPointerLeave={(event) => event.currentTarget.style.setProperty("--fog-live", "0")}
            aria-label={item.hook}
          >
            <Film
              className="tbtx-mosaic__video"
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={item.poster}
            />
            <span className="tbtx-mosaic__fact">
              <strong>{item.hook}</strong>
              <em>{item.story}</em>
            </span>
          </button>
        ))}

        <form
          className="tbtx-mosaic__tile tbtx-mosaic__tile--yours"
          data-area="yours"
          onSubmit={submit}
        >
          <h2>What&rsquo;s yours?</h2>
          {status === "sent" ? (
            <>
              <p className="tbtx-mosaic__yours-line">{sentLine}</p>
              <p className="tbtx-mosaic__got">Your scene was submitted.</p>
            </>
          ) : (
            <>
              <p className="tbtx-mosaic__why">
                What were you trying to finish? What did you end up doing? Write one scene in 12 to 280 characters.
              </p>
              <div className="tbtx-mosaic__row">
                <label htmlFor="fog-fact" className="tbtx-sr">
                  The leftover job, as a scene
                </label>
                <textarea
                  id="fog-fact"
                  name="fact"
                  required
                  minLength={12}
                  maxLength={280}
                  rows={3}
                  value={fact}
                  onChange={(event) => setFact(event.target.value)}
                  placeholder={SCENE_PLACEHOLDER}
                />
                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending" : "Send Scene"}
                </button>
              </div>
              {status === "error" && (
                <p className="tbtx-mosaic__got">Submission failed. Keep your text, check it is 12 to 280 characters, and try again.</p>
              )}
            </>
          )}
        </form>
      </div>

      {active && (
        <div className="tbtx-mosaic__sheet" role="dialog" aria-modal="true">
          <button
            type="button"
            className="tbtx-mosaic__close tbtx-fog-link"
            onClick={() => setOpen(null)}
            aria-label="Close"
          >
            Close
          </button>
          <Film
            className="tbtx-mosaic__hero"
            src={active.src}
            autoPlay
            muted
            loop
            playsInline
            poster={active.poster}
          />
          <div className="tbtx-mosaic__caption">
            <h3>{active.hook}</h3>
            <p className="tbtx-mosaic__caption-story">{active.story}</p>
            <p className="tbtx-mosaic__caption-convert">
              Recognize the situation? Add your own scene in the last tile.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
