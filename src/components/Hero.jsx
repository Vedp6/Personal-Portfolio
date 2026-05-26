// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Hero.jsx  —  Full-screen hero section
// ─────────────────────────────────────────────────────────────────────────────

import { useInView } from "../hooks/useInView";
import { useTyping } from "../hooks/useTyping";
import { ROLES } from "../data/index";
import avatarImg from "../assets/avatar.jpg";

export default function Hero() {
  const typed = useTyping(ROLES);
  const [ref, visible] = useInView(0.05);

  const goto = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "88px 1.5rem 40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 760,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(50px)",
          transition:
            "opacity 0.9s cubic-bezier(.34,1.56,.64,1), transform 0.9s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* ── Avatar ── */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: 28,
          }}
        >
          <div className="av-ring" />
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              zIndex: 1,
              animation: "bob 5s ease-in-out infinite",
              boxShadow: "0 0 40px rgba(167,139,250,0.25)",
            }}
          >
            <img
              src={avatarImg}
              alt="Your Name"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            <div
              className="online-dot"
              style={{
                position: "absolute",
                bottom: 6,
                right: 6,
                width: 20,
                height: 20,
                background: "#34d399",
                borderRadius: "50%",
                border: "3px solid var(--bg)",
                zIndex: 2,
              }}
            />
          </div>
        </div>

        {/* ── Available badge ── */}
        <div
          style={{
            display: "inline-block",
            background: "rgba(167,139,250,0.12)",
            border: "1px solid rgba(167,139,250,0.3)",
            borderRadius: 99,
            padding: "6px 18px",
            marginBottom: 16,
            fontSize: 12.5,
            fontWeight: 700,
            color: "#c4b5fd",
            letterSpacing: 0.5,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#34d399",
              display: "inline-block",
              marginRight: 7,
              animation: "ping 1.5s ease-in-out infinite",
              verticalAlign: "middle",
            }}
          />
          Available for work
        </div>

        {/* ── Name ── */}
        <h1
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(2.6rem, 7vw, 4.2rem)",
            lineHeight: 1.0,
            marginBottom: 6,
            letterSpacing: -1,
          }}
        >
          <span className="name-grad">Vedant Patil</span>
        </h1>

        {/* ── Typing role ── */}
        <div
          style={{
            fontSize: "clamp(1.05rem, 2.8vw, 1.45rem)",
            fontWeight: 800,
            minHeight: 42,
            marginBottom: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <span className="grad-txt">{typed}</span>
          <span className="cursor">|</span>
        </div>

        {/* ── Description ── */}
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.85,
            color: "var(--muted)",
            maxWidth: 540,
            margin: "0 auto 34px",
            fontWeight: 500,
          }}
        >
          Crafting pixel-perfect, performant web experiences. MERN Stack wizard,
          C systems programmer & Python automation expert — turning complex
          ideas into elegant code.
        </p>

        {/* ── CTA Buttons ── */}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button className="btn-primary" onClick={() => goto("projects")}>
            View Projects ✦
          </button>
          <button className="btn-outline" onClick={() => goto("contact")}>
            Hire Me →
          </button>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          style={{
            marginTop: 52,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: 0.4,
          }}
        >
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Scroll
          </span>
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
        </div>
      </div>
    </section>
  );
}
