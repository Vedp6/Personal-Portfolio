// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Projects.jsx  —  Featured projects grid section
// ─────────────────────────────────────────────────────────────────────────────

import ProjectCard from "./ProjectCard";
import { PROJECTS } from "../data/index";

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding:   "5.5rem 1.5rem",
        position:  "relative",
        zIndex:    1,
        background:"linear-gradient(180deg,transparent,rgba(56,189,248,0.03),transparent)",
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* ── Heading ── */}
        <span
          className="sec-tag"
          style={{ color: "#38bdf8" }}
        >
          // featured work
        </span>
        <div
          className="sec-divider"
          style={{ background: "linear-gradient(90deg,#38bdf8,#fb7185)" }}
        />
        <h2
          style={{
            fontFamily:   "'Clash Display', sans-serif",
            fontWeight:   700,
            fontSize:     "clamp(1.8rem, 4vw, 2.6rem)",
            marginBottom: 6,
          }}
        >
          Projects That Ship
        </h2>
        <p
          style={{
            fontSize:     14.5,
            color:        "var(--muted)",
            fontWeight:   500,
            marginBottom: "2.5rem",
          }}
        >
          A selection of real-world applications — all built with production
          in mind.
        </p>

        {/* ── Projects grid ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap:                 20,
          }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
