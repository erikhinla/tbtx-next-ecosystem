"use client";

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
  },
] as const;

export function StakesCopy() {
  return (
    <div className="tbtx-why">
      <header className="tbtx-why__lock">
        <p className="tbtx-why__kicker">AI is changing every aspect of life</p>
        <h2 data-fog-text="Three ways this goes.">Three ways this goes.</h2>
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
        <h2 data-fog-text="You’ve been finishing what they start.">You&rsquo;ve been finishing what they start.</h2>
      </header>

      <div className="tbtx-nest tbtx-nest--stand">
        <p className="tbtx-nest__payoff">I know. Someone had to.</p>
        <div className="tbtx-nest__support">
          <p>
            You don&rsquo;t get that time twice. If that attention went to what&rsquo;s yours, the
            making starts tonight. Not the cleanup.
          </p>
          <a href="#tbtx-doors" className="tbtx-fog-link">
            Get the making back
          </a>
        </div>
      </div>
    </div>
  );
}
