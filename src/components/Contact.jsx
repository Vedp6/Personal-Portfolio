// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Contact.jsx  —  Contact form + social links section
// ─────────────────────────────────────────────────────────────────────────────

import { useState }    from "react";
import { useInView }   from "../hooks/useInView";
import { SOCIAL_LINKS } from "../data/index";

export default function Contact() {
  const [ref, visible] = useInView(0.1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };

  /* ── shared label style ── */
  const labelStyle = {
    fontSize:      12,
    fontWeight:    800,
    color:         "var(--muted)",
    display:       "block",
    marginBottom:  6,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  };

  return (
    <section
      id="contact"
      style={{
        padding:   "5.5rem 1.5rem",
        position:  "relative",
        zIndex:    1,
        background:"linear-gradient(180deg,transparent,rgba(167,139,250,0.04),transparent)",
      }}
    >
      <div style={{ maxWidth: 580, margin: "0 auto" }}>

        {/* ── Heading ── */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="sec-tag" style={{ display: "inline-block" }}>
            // contact
          </span>
          <div
            className="sec-divider"
            style={{ margin: "10px auto 14px" }}
          />
          <h2
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize:   "clamp(1.8rem, 4vw, 2.6rem)",
            }}
          >
            Let's Build Together
          </h2>
          <p
            style={{
              fontSize:  14.5,
              color:     "var(--muted)",
              fontWeight: 500,
              marginTop:  8,
            }}
          >
            Have a project in mind? Let's talk and bring it to life.
          </p>
        </div>

        {/* ── Card ── */}
        <div
          ref={ref}
          style={{
            background:           "var(--glass-b)",
            border:               "1px solid var(--border2)",
            borderRadius:         26,
            padding:              "2.2rem",
            backdropFilter:       "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            opacity:              visible ? 1 : 0,
            transform:            visible ? "none" : "translateY(30px)",
            transition:           "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {sent ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
              <div
                style={{
                  fontSize:   52,
                  marginBottom: 16,
                  animation:  "bob 2s ease-in-out infinite",
                }}
              >
                🚀
              </div>
              <h3
                style={{
                  fontFamily:   "'Clash Display', sans-serif",
                  fontSize:     "1.4rem",
                  fontWeight:   700,
                  marginBottom: 8,
                  color:        "var(--txt)",
                }}
              >
                Message Sent!
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14 }}>
                Thanks for reaching out, {form.name}. I'll reply within 24
                hours!
              </p>
              <button
                className="btn-outline"
                style={{ marginTop: 20 }}
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", email: "", message: "" });
                }}
              >
                Send Another
              </button>
            </div>
          ) : (
            /* ── Form ── */
            <>
              {/* Name + Email row */}
              <div
                className="input-row-2col"
                style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap:                 12,
                  marginBottom:        14,
                }}
              >
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    name="name"
                    placeholder="Type here"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Type here"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Hey! I'd love to work with you on..."
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* Submit */}
              <button
                className="btn-primary"
                style={{ width: "100%", fontSize: 14 }}
                onClick={handleSubmit}
              >
                Send Message ✦
              </button>
            </>
          )}
        </div>

        {/* ── Social links ── */}
        <div
          style={{
            display:        "flex",
            justifyContent: "center",
            gap:            10,
            marginTop:      24,
            flexWrap:       "wrap",
          }}
        >
          {SOCIAL_LINKS.map(({ icon, label, href, devicon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noreferrer"
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          7,
                padding:      "8px 16px",
                border:       "1.5px solid var(--border2)",
                borderRadius: 12,
                textDecoration:"none",
                color:        "var(--muted)",
                fontSize:     12.5,
                fontWeight:   800,
                background:   "var(--glass)",
                transition:   "all 0.25s ease",
                backdropFilter:"blur(8px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#a78bfa";
                e.currentTarget.style.color       = "#a78bfa";
                e.currentTarget.style.background  = "rgba(167,139,250,0.08)";
                e.currentTarget.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border2)";
                e.currentTarget.style.color       = "var(--muted)";
                e.currentTarget.style.background  = "var(--glass)";
                e.currentTarget.style.transform   = "none";
              }}
            >
              {devicon
                ? <i className={devicon} style={{ fontSize: 16 }} />
                : <span>{icon}</span>}
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
