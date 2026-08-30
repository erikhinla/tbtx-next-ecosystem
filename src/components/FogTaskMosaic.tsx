"use client";

import { useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { fogHaptic, trackFogPointer } from "./FogVeil";
import { film } from "@/lib/media";

const FACTS = [
  {
    id: "61",
    area: "lead",
    src: "/media/task-logos.mp4",
    poster: "/media/task-logos.jpg",
    hook: "An agent made 83 logos. You're still the one who has to pick.",
    story: "Volume is not a decision. The leftover job is taste, and taste still sits with you after the agent clocks out.",
  },
  {
    id: "12",
    area: "cut",
    src: "/media/b2b-sold-ai.mp4",
    poster: "/media/grok-b2b-billboard.jpg",
    hook: "They sold you the agents. You inherited the leftovers.",
    story: "The pitch was speed. The residue is a human finishing what the stack started. That's the job nobody posted.",
  },
  {
    id: "44",
    area: "pulse",
    src: "/media/task-clockout.mp4",
    poster: "/media/task-clockout.jpg",
    hook: "You closed the laptop. The agents didn't.",
    story: "The day ends. The leftover job doesn't. Someone still has to close the loops the agents left open.",
  },
  {
    id: "7",
    area: "night",
    src: "/media/computer-explodes.mp4",
    poster: "/media/fog-context.jpg",
    hook: "Three agents. Three answers. You're the fourth.",
    story: "More output, more arbitration. You became the operating system the tools refuse to be.",
  },
  {
    id: "28",
    area: "crowd",
    src: "/media/hero-fog-people.mp4",
    poster: "/media/hero-fog-poster.jpg",
    hook: "Everyone else already 'gets it.' That's the feeling.",
    story: "The fog is social before it is technical. You weren't late. You were handed a job with no name.",
  },
  {
    id: "19",
    area: "same",
    src: "/media/task-lives.mp4",
    poster: "/media/task-lives.jpg",
    hook: "Same agents. Different lives. Same leftover mess.",
    story: "Personal or the company, the residue is identical. Someone still has to finish it. That's who we film.",
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
            <video
              className="tbtx-mosaic__video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={item.poster}
            >
              <source src={film(item.src)} type="video/mp4" />
            </video>
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
              <p className="tbtx-mosaic__got">If we film it, your line is the one on the scene.</p>
            </>
          ) : (
            <>
              <p className="tbtx-mosaic__why">
                Write it like a scene. Name, what they were trying to finish, what they actually did.
                If the line lands, it becomes the film.
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
                  {status === "sending" ? "Sending" : "Send the line"}
                </button>
              </div>
              {status === "error" && (
                <p className="tbtx-mosaic__got">Keep it to one scene. 12 to 280 characters.</p>
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
          <video
            className="tbtx-mosaic__hero"
            autoPlay
            muted
            loop
            playsInline
            poster={active.poster}
          >
            <source src={film(active.src)} type="video/mp4" />
          </video>
          <div className="tbtx-mosaic__caption">
            <h3>{active.hook}</h3>
            <p className="tbtx-mosaic__caption-story">{active.story}</p>
            <p className="tbtx-mosaic__caption-convert">
              If this is yours, the last tile is waiting. Write the scene. If it names the leftover
              job, we film it.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
