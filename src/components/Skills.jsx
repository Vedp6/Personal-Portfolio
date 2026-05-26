// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Skills.jsx  —  Filterable skills grid with icon cards
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import SkillCard     from "./SkillCard";
import { SKILL_CATS } from "../data/index";

const CATEGORIES = Object.keys(SKILL_CATS);

export default function Skills() {
  const [active, setActive] = useState("All");

  return (
    <section
      id="skills"
      style={{
        padding:   "5.5rem 1.5rem",
        position:  "relative",
        zIndex:    1,
        background:"linear-gradient(180deg,transparent,rgba(167,139,250,0.04),transparent)",
      }}
    >
      <div style={{ maxWidth: 1060, margin: "0 auto" }}>

        {/* ── Heading ── */}
        <span className="sec-tag">// skills &amp; tools</span>
        <div className="sec-divider" />
        <h2
          style={{
            fontFamily:  "'Clash Display', sans-serif",
            fontWeight:  700,
            fontSize:    "clamp(1.8rem, 4vw, 2.6rem)",
            marginBottom: 6,
          }}
        >
          Technologies I Work With
        </h2>
        <p
          style={{
            fontSize:     14.5,
            color:        "var(--muted)",
            fontWeight:   500,
            marginBottom: "2.5rem",
          }}
        >
          From frontend polish to backend power — here's my full toolkit.
        </p>

        {/* ── Category filter buttons ── */}
        <div
          style={{
            display:    "flex",
            flexWrap:   "wrap",
            gap:        10,
            marginBottom: "2rem",
          }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding:      "7px 18px",
                  borderRadius: 99,
                  fontSize:     13,
                  fontWeight:   800,
                  fontFamily:   "'Cabinet Grotesk', sans-serif",
                  cursor:       "pointer",
                  transition:   "all 0.25s ease",
                  border:       isActive ? "none" : "1.5px solid var(--border2)",
                  background:   isActive
                    ? "linear-gradient(135deg,#7c3aed,#4f46e5)"
                    : "transparent",
                  color:        isActive ? "#fff" : "var(--muted)",
                  boxShadow:    isActive
                    ? "0 4px 16px rgba(124,58,237,0.4)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(167,139,250,0.1)";
                    e.currentTarget.style.color      = "#a78bfa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color      = "var(--muted)";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* ── Skills grid ── */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(112px, 1fr))",
            gap:                 14,
          }}
        >
          {SKILL_CATS[active].map((skill, i) => (
            <SkillCard
              key={skill.name + active}
              skill={skill}
              delay={i * 45}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
