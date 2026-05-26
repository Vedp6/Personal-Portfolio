// ─────────────────────────────────────────────────────────────────────────────
//  src/components/ProjectCard.jsx  —  Single animated project card
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { useInView } from "../hooks/useInView";

/**
 * Props:
 *  project — { title, sub, desc, tags, icon, color, glow, github, live }
 *  delay   — stagger delay in ms
 */
export default function ProjectCard({ project, delay = 0 }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  const { title, sub, desc, tags, icon, color, glow, github, live } = project;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:   "var(--glass)",
        border:       `1px solid ${hovered ? glow.replace(".15", ".55") : "rgba(255,255,255,0.08)"}`,
        borderRadius: 22,
        padding:      "1.6rem",
        transition:   `all 0.4s cubic-bezier(.34,1.56,.64,1) ${delay}ms`,
        opacity:      visible ? 1 : 0,
        transform:    visible
          ? hovered ? "translateY(-7px)" : "none"
          : "translateY(36px)",
        position:     "relative",
        overflow:     "hidden",
        boxShadow:    hovered ? `0 14px 48px ${glow}` : "none",
      }}
    >
      {/* Top glow overlay */}
      <div
        style={{
          position:      "absolute",
          inset:         0,
          background:    `radial-gradient(ellipse at top, ${glow}, transparent 65%)`,
          opacity:       hovered ? 1 : 0,
          transition:    "opacity 0.4s ease",
          pointerEvents: "none",
          borderRadius:  "inherit",
        }}
      />

      {/* ── Header row: icon + links ── */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-start",
          marginBottom:   14,
          position:       "relative",
          zIndex:         1,
        }}
      >
        {/* Project icon */}
        <div
          style={{
            width:         50,
            height:        50,
            borderRadius:  14,
            background:    glow,
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            fontSize:      24,
            flexShrink:    0,
          }}
        >
          {icon}
        </div>

        {/* GitHub / Live links */}
        <div style={{ display: "flex", gap: 7 }}>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize:     12,
              fontWeight:   700,
              fontFamily:   "'Cabinet Grotesk', sans-serif",
              borderRadius: 9,
              padding:      "4px 11px",
              border:       "1px solid var(--border2)",
              color:        "var(--muted)",
              background:   "transparent",
              textDecoration: "none",
              transition:   "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color       = "var(--txt)";
              e.currentTarget.style.borderColor = "var(--txt)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color       = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border2)";
            }}
          >
            GitHub
          </a>
          <a
            href={live}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize:     12,
              fontWeight:   700,
              fontFamily:   "'Cabinet Grotesk', sans-serif",
              borderRadius: 9,
              padding:      "4px 11px",
              border:       `1px solid ${color}55`,
              color:        color,
              background:   glow,
              textDecoration: "none",
              transition:   "all 0.2s",
            }}
          >
            Live ↗
          </a>
        </div>
      </div>

      {/* ── Title ── */}
      <h3
        style={{
          fontFamily:  "'Clash Display', sans-serif",
          fontSize:    15.5,
          fontWeight:  600,
          marginBottom: 8,
          position:    "relative",
          zIndex:      1,
          color:       "var(--txt)",
        }}
      >
        {title}{" "}
        <span style={{ color: "var(--muted)", fontSize: 13, fontWeight: 400 }}>
          — {sub}
        </span>
      </h3>

      {/* ── Description ── */}
      <p
        style={{
          fontSize:    13,
          lineHeight:  1.7,
          color:       "var(--muted)",
          marginBottom: 14,
          position:    "relative",
          zIndex:      1,
        }}
      >
        {desc}
      </p>

      {/* ── Tags ── */}
      <div
        style={{
          display:   "flex",
          flexWrap:  "wrap",
          gap:       6,
          position:  "relative",
          zIndex:    1,
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag.n}
            style={{
              fontSize:     11.5,
              fontWeight:   800,
              borderRadius: 99,
              padding:      "3px 11px",
              background:   glow,
              color:        color,
              display:      "flex",
              alignItems:   "center",
              gap:          5,
            }}
          >
            {tag.i && <i className={tag.i} style={{ fontSize: 13 }} />}
            {tag.n}
          </span>
        ))}
      </div>
    </div>
  );
}
