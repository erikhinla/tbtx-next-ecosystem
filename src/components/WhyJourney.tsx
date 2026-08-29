"use client";

import FogVeil from "./FogVeil";

const POSITIONS = [
  {
    id: "out",
    title: "Sit out",
    story: "Refuse the tools. Get outrun by people who didn't.",
  },
  {
    id: "back",
    title: "Sit back",
    story: "Let AI start everything. You spend the day finishing it. That's the job nobody posted.",
  },
  {
    id: "up",
    title: "Stand up",
    story: "Get your attention back to work only you can do.",
    refrain: "You don't need more AI. Clear the fog.",
  },
] as const;

export function StakesCopy() {
  return (
    <div className="tbtx-why">
      <header className="tbtx-why__lock">
        <p className="tbtx-why__kicker">AI is changing every aspect of life</p>
        <h2>Three ways this goes.</h2>
      </header>

      <div className="tbtx-why__field">
        <p className="tbtx-why__payoff">
          You brought in agents to get ahead. They start. They don&rsquo;t close. You do.
        </p>

        <div className="tbtx-why__positions">
          {POSITIONS.map((item) => (
            <article
              key={item.id}
              className={`tbtx-why__position tbtx-why__position--${item.id}`}
            >
              <h3>{item.title}</h3>
              <p>{item.story}</p>
              {"refrain" in item ? <p className="tbtx-why__refrain">{item.refrain}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StandCopy() {
  return (
    <div className="tbtx-why tbtx-why--stand">
      <header className="tbtx-why__lock">
        <p className="tbtx-why__kicker">The stand</p>
        <h2>This isn&rsquo;t a quiz about how you work.</h2>
      </header>

      <FogVeil className="tbtx-why__field" film="/media/hallway-fog-lift.mp4" poster="/media/hallway-fog-lift.jpg">
        <p className="tbtx-why__payoff">
          It&rsquo;s a decision. Keep finishing what AI starts, or take your attention back.
        </p>
        <p>
          Two minutes names where the leftover job is thickest. Then you pick a door.
        </p>
        <a href="#tbtx-doors" className="tbtx-fog-link">
          Where it shows up
        </a>
      </FogVeil>
    </div>
  );
}
