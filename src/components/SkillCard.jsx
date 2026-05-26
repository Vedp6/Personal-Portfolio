// ─────────────────────────────────────────────────────────────────────────────
//  src/components/SkillCard.jsx  —  Single animated skill icon card
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useInView } from "../hooks/useInView";

/**
 * Props:
 *  skill  — { name, icon, glow, lvl }
 *  delay  — stagger delay in ms
 */
export default function SkillCard({ skill, delay = 0 }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   hovered ? skill.glow : "rgba(255,255,255,0.04)",
        border:       `1px solid ${
          hovered
            ? skill.glow.replace(".25", ".6").replace(".15", ".6").replace(".2", ".6")
            : "rgba(255,255,255,0.08)"
        }`,
        borderRadius: 18,
        padding:      "20px 10px 14px",
        display:      "flex",
        flexDirection:"column",
        alignItems:   "center",
        gap:          10,
        cursor:       "pointer",
        transition:   `all 0.45s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
        opacity:      visible ? 1 : 0,
        transform:    visible
          ? hovered ? "translateY(-6px) scale(1.07)" : "none"
          : "translateY(24px) scale(0.95)",
        position:     "relative",
        overflow:     "hidden",
        boxShadow:    hovered ? `0 8px 32px ${skill.glow}` : "none",
      }}
    >
      {/* Glow overlay */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: `radial-gradient(circle at 50% 0%, ${skill.glow}, transparent 70%)`,
          opacity:    hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          pointerEvents: "none",
        }}
      />

      {/* Icon */}
      <i
        className={skill.icon}
        style={{
          fontSize:  38,
          lineHeight: 1,
          transition: "transform 0.3s ease",
          transform:  hovered ? "scale(1.18) rotate(-5deg)" : "none",
          position:   "relative",
          zIndex:     1,
        }}
      />

      {/* Name */}
      <span
        style={{
          fontSize:      11.5,
          fontWeight:    800,
          textAlign:     "center",
          letterSpacing: 0.3,
          color:         hovered ? "var(--txt)" : "var(--muted)",
          transition:    "color 0.3s ease",
          position:      "relative",
          zIndex:        1,
        }}
      >
        {skill.name}
      </span>

      {/* Level bar */}
      <div
        style={{
          width:        "80%",
          height:       3,
          background:   "rgba(255,255,255,0.06)",
          borderRadius: 99,
          overflow:     "hidden",
          position:     "relative",
          zIndex:       1,
        }}
      >
        <div
          style={{
            height:          "100%",
            borderRadius:    99,
            background:      "linear-gradient(90deg,#a78bfa,#38bdf8)",
            width:           `${Math.round(skill.lvl * 100)}%`,
            transform:       visible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition:      `transform 1s ease ${delay + 300}ms`,
          }}
        />
      </div>
    </div>
  );
}
