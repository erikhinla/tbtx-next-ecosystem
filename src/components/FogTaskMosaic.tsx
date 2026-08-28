"use client";

import { useState, type FormEvent } from "react";

const FACTS = [
  {
    id: "61",
    src: "/media/task-logos.mp4",
    poster: "/media/task-logos.jpg",
    line: "Choosing which of 83 almost-perfect AI logos is the least wrong.",
  },
  {
    id: "12",
    src: "/media/b2b-sold-ai.mp4",
    poster: "/media/grok-b2b-billboard.jpg",
    line: "They sold you the AI. Nobody sold you the architecture.",
  },
  {
    id: "44",
    src: "/media/task-clockout.mp4",
    poster: "/media/task-clockout.jpg",
    line: "The fog doesn't clock out when you do.",
  },
  {
    id: "7",
    src: "/media/computer-explodes.mp4",
    poster: "/media/fog-context.jpg",
    line: "Reconciling what the tools can't agree on. Again.",
  },
  {
    id: "28",
    src: "/media/hero-fog-people.mp4",
    poster: "/media/hero-fog-poster.jpg",
    line: "Same condition. It just shows up in the day, not the org chart.",
  },
  {
    id: "19",
    src: "/media/task-lives.mp4",
    poster: "/media/task-lives.jpg",
    line: "Same fog. Different lives. Same missing foundation.",
  },
] as const;

export default function FogTaskMosaic() {
  const [open, setOpen] = useState<string | null>(null);
  const [fact, setFact] = useState("");
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
      setFact("");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="tbtx-mosaic">
      <p className="tbtx-mosaic__whisper">If this is your week, that&rsquo;s the fog.</p>
      <div className="tbtx-mosaic__grid">
        {FACTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="tbtx-mosaic__tile"
            onClick={() => setOpen(item.id)}
            aria-label={item.line}
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
              <source src={item.src} type="video/mp4" />
            </video>
            <span className="tbtx-mosaic__fact">{item.line}</span>
          </button>
        ))}
      </div>

      <form className="tbtx-mosaic__submit" onSubmit={submit}>
        <label htmlFor="fog-fact">What&rsquo;s yours?</label>
        <p>The ones that land get made into films.</p>
        {status === "sent" ? (
          <p className="tbtx-mosaic__got">Got it. If we make it, it shows up here.</p>
        ) : (
          <div className="tbtx-mosaic__row">
            <textarea
              id="fog-fact"
              name="fact"
              required
              minLength={12}
              maxLength={280}
              rows={2}
              value={fact}
              onChange={(event) => setFact(event.target.value)}
              placeholder="The thing you did at 11pm that wasn't the work."
            />
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending" : "Send it"}
            </button>
          </div>
        )}
        {status === "error" && <p className="tbtx-mosaic__got">Say it in one line. 12 to 280 characters.</p>}
      </form>

      {active && (
        <div className="tbtx-mosaic__sheet" role="dialog" aria-modal="true">
          <button
            type="button"
            className="tbtx-mosaic__close"
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
            <source src={active.src} type="video/mp4" />
          </video>
          <div className="tbtx-mosaic__caption">
            <h3>{active.line}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
