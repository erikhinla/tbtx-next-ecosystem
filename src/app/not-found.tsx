export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        margin: 0,
        padding: "clamp(72px, 12vw, 140px) clamp(22px, 4.8vw, 80px)",
        background: "#101111",
        color: "#f4eee5",
        fontFamily: '"Instrument Sans", "Helvetica Neue", Arial, sans-serif',
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.4rem",
      }}
    >
      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: "0.14em" }}>TBTX</p>
      <h1
        style={{
          margin: 0,
          fontSize: "clamp(42px, 8vw, 96px)",
          lineHeight: 0.94,
          letterSpacing: "-0.04em",
          fontWeight: 800,
          maxWidth: "12ch",
          textTransform: "uppercase",
        }}
      >
        This page isn't here.
      </h1>
      <p style={{ margin: 0, maxWidth: "32ch", fontSize: 18, lineHeight: 1.5, color: "#c8c3bd" }}>
        The work is still on the site. Come back in.
      </p>
      <p style={{ display: "flex", gap: "2rem", flexWrap: "wrap", margin: "1rem 0 0" }}>
        <a href="/" style={{ color: "#f4eee5", fontSize: 18, fontWeight: 600 }}>
          TBTX
        </a>
        <a href="/bbai" style={{ color: "#f4eee5", fontSize: 18, fontWeight: 600 }}>
          BizBuilders AI
        </a>
      </p>
    </main>
  );
}
