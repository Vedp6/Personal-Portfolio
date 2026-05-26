// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Footer.jsx  —  Simple branded footer
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position:   "relative",
        zIndex:     1,
        textAlign:  "center",
        padding:    "1.8rem 1.5rem",
        borderTop:  "1px solid var(--border)",
        color:      "var(--muted)",
        fontSize:   12.5,
        fontWeight: 700,
        letterSpacing: 0.3,
      }}
    >
      Designed &amp; built by{" "}
      <span style={{ color: "#a78bfa" }}>Vedant</span>
      {" · "}
      <span style={{ color: "#a78bfa" }}>React</span>
      {" + "}
      <span style={{ color: "#38bdf8" }}>Tailwind</span>
      {" · © "}
      {year}
    </footer>
  );
}
