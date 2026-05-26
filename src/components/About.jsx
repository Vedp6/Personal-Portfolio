// ─────────────────────────────────────────────────────────────────────────────
//  src/components/About.jsx  —  About strip with stats & tech stack row
// ─────────────────────────────────────────────────────────────────────────────

import { useInView } from "../hooks/useInView";
import { STATS }     from "../data/index";

// Mini tech-row shown inside the About card
const TECH_ROWS = [
  {
    label: "Frontend",
    items: [
      { i: "devicon-react-original colored",   n: "React"   },
      { i: "devicon-javascript-plain colored",  n: "JS"      },
      { i: "devicon-tailwindcss-plain colored", n: "Tailwind" },
    ],
  },
  {
    label: "Backend",
    items: [
      { i: "devicon-nodejs-plain colored",   n: "Node"    },
      { i: "devicon-express-original",       n: "Express" },
      { i: "devicon-mongodb-plain colored",  n: "MongoDB" },
    ],
  },
  {
    label: "Languages",
    items: [
      { i: "devicon-python-plain colored",    n: "Python" },
      { i: "devicon-c-plain colored",         n: "C"      },
      { i: "devicon-typescript-plain colored", n: "TS"    },
    ],
  },
];

function StatCard({ num, label, delay, visible }) {
  return (
    <div
      style={{
        background:  "var(--glass)",
        border:      "1px solid var(--border)",
        borderRadius: 16,
        padding:     "1.2rem",
        opacity:     visible ? 1 : 0,
        transform:   visible ? "none" : "translateY(20px)",
        transition:  `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div
        style={{
          fontFamily:  "'Clash Display', sans-serif",
          fontSize:    "2rem",
          fontWeight:  700,
          lineHeight:  1,
          color:       "#a78bfa",
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontSize:      12,
          fontWeight:    700,
          color:         "var(--muted)",
          marginTop:     4,
          letterSpacing: 0.3,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function About() {
  const [leftRef,  leftVis]  = useInView(0.1);
  const [rightRef, rightVis] = useInView(0.1);

  return (
    <section
      id="about"
      style={{
        background:  "linear-gradient(135deg,rgba(167,139,250,0.06),rgba(56,189,248,0.04))",
        borderTop:   "1px solid var(--border)",
        borderBottom:"1px solid var(--border)",
        padding:     "5rem 1.5rem",
        position:    "relative",
        zIndex:      1,
      }}
    >
      <div
        style={{
          maxWidth:             1060,
          margin:               "0 auto",
          display:              "grid",
          gridTemplateColumns:  "1fr 1fr",
          gap:                  "3rem",
          alignItems:           "center",
        }}
        className="about-grid"
      >
        {/* ── Left: text + stats ── */}
        <div
          ref={leftRef}
          style={{
            opacity:    leftVis ? 1 : 0,
            transform:  leftVis ? "none" : "translateX(-30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span className="sec-tag">// about me</span>
          <div className="sec-divider" />
          <h2
            style={{
              fontFamily:  "'Clash Display', sans-serif",
              fontWeight:  700,
              fontSize:    "clamp(1.7rem,4vw,2.4rem)",
              lineHeight:  1.2,
              marginBottom: 14,
            }}
          >
            Passionate about<br />clean, fast code
          </h2>
          <p
            style={{
              fontSize:   14.5,
              lineHeight: 1.85,
              color:      "var(--muted)",
              fontWeight: 500,
            }}
          >
            I'm a full-stack developer with deep expertise in the MERN
            ecosystem, building scalable web applications from database to
            deployment. I love solving algorithmic problems in C and
            automating workflows with Python. Every line I write is meant
            to be readable, maintainable and fast.
          </p>

          {/* Stats grid */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "1fr 1fr",
              gap:                 14,
              marginTop:           "1.5rem",
            }}
          >
            {STATS.map((s, i) => (
              <StatCard
                key={s.label}
                num={s.num}
                label={s.label}
                delay={i * 100}
                visible={leftVis}
              />
            ))}
          </div>
        </div>

        {/* ── Right: tech rows ── */}
        <div
          ref={rightRef}
          style={{
            display:    "flex",
            flexDirection: "column",
            gap:        12,
            opacity:    rightVis ? 1 : 0,
            transform:  rightVis ? "none" : "translateX(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {TECH_ROWS.map((row) => (
            <div
              key={row.label}
              style={{
                background:   "var(--glass)",
                border:       "1px solid var(--border)",
                borderRadius: 16,
                padding:      "14px 18px",
                display:      "flex",
                alignItems:   "center",
                gap:          14,
              }}
            >
              <span
                style={{
                  fontSize:      11,
                  fontWeight:    800,
                  color:         "var(--muted)",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  minWidth:      72,
                }}
              >
                {row.label}
              </span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {row.items.map((it) => (
                  <div
                    key={it.n}
                    style={{
                      display:      "flex",
                      alignItems:   "center",
                      gap:          6,
                      background:   "rgba(255,255,255,0.04)",
                      border:       "1px solid var(--border)",
                      borderRadius: 8,
                      padding:      "5px 10px",
                    }}
                  >
                    <i className={it.i} style={{ fontSize: 17 }} />
                    <span
                      style={{
                        fontSize:   12,
                        fontWeight: 700,
                        color:      "var(--muted)",
                      }}
                    >
                      {it.n}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 640px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
