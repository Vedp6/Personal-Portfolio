// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Contact.jsx  —  Contact form with EmailJS integration
// ─────────────────────────────────────────────────────────────────────────────

import { useState }     from "react";
import { useInView }    from "../hooks/useInView";
import { SOCIAL_LINKS } from "../data/index";

// ── Paste your EmailJS keys here ─────────────────────────────────────────────
// Sign up free at https://emailjs.com → get these 3 values from your dashboard
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID   
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID 
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [ref, visible] = useInView(0.1);

  // "idle" | "sending" | "sent" | "error"
  const [status, setStatus] = useState("idle");
  const [form,   setForm]   = useState({ name: "", email: "", message: "" });

  // ── handlers ────────────────────────────────────────────────────────────────
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("sending");

    try {
      // Dynamically import emailjs so the build doesn't break if the
      // package isn't installed yet (just remove the dynamic import once
      // you run  npm install @emailjs/browser)
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
        },
        PUBLIC_KEY
      );

      setStatus("sent");
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setForm({ name: "", email: "", message: "" });
  };

  // ── shared styles ────────────────────────────────────────────────────────────
  const labelStyle = {
    fontSize:      12,
    fontWeight:    800,
    color:         "var(--muted)",
    display:       "block",
    marginBottom:  6,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  };

  const inputStyle = {
    background:   "rgba(255,255,255,0.04)",
    border:       "1.5px solid var(--border2)",
    borderRadius: 12,
    padding:      "11px 14px",
    fontFamily:   "'Cabinet Grotesk', sans-serif",
    fontSize:     14,
    fontWeight:   500,
    color:        "var(--txt)",
    width:        "100%",
    outline:      "none",
    transition:   "border-color 0.25s, box-shadow 0.25s",
    opacity:      status === "sending" ? 0.6 : 1,
  };

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <section
      id="contact"
      style={{
        padding:    "5.5rem 1.5rem",
        position:   "relative",
        zIndex:     1,
        background: "linear-gradient(180deg,transparent,rgba(167,139,250,0.04),transparent)",
      }}
    >
      <div style={{ maxWidth: 580, margin: "0 auto" }}>

        {/* ── Section heading ── */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span className="sec-tag" style={{ display: "inline-block" }}>
            // contact
          </span>
          <div className="sec-divider" style={{ margin: "10px auto 14px" }} />
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
              fontSize:   14.5,
              color:      "var(--muted)",
              fontWeight: 500,
              marginTop:  8,
            }}
          >
            Have a project in mind? Let's talk and bring it to life.
          </p>
        </div>

        {/* ── Glass card ── */}
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

          {/* ════════════════ SUCCESS ════════════════ */}
          {status === "sent" && (
            <div style={{ textAlign: "center", padding: "2.5rem 0" }}>
              <div
                style={{
                  fontSize:   52,
                  marginBottom: 16,
                  animation:  "bob 2s ease-in-out infinite",
                  lineHeight: 1,
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
                Thanks, <strong style={{ color: "var(--txt)" }}>{form.name}</strong>!
                I got your message and will reply within 24 hours.
              </p>
              <button
                className="btn-outline"
                style={{ marginTop: 22 }}
                onClick={resetForm}
              >
                Send Another →
              </button>
            </div>
          )}

          {/* ════════════════ ERROR ════════════════ */}
          {status === "error" && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: 48, marginBottom: 14, lineHeight: 1 }}>😕</div>
              <h3
                style={{
                  fontFamily:   "'Clash Display', sans-serif",
                  fontSize:     "1.2rem",
                  fontWeight:   700,
                  marginBottom: 8,
                  color:        "var(--txt)",
                }}
              >
                Something went wrong
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>
                The message couldn't be sent. Please check your EmailJS keys or
                email me directly.
              </p>
              <button className="btn-outline" onClick={resetForm}>
                Try Again
              </button>
            </div>
          )}

          {/* ════════════════ FORM ════════════════ */}
          {(status === "idle" || status === "sending") && (
            <div>

              {/* Name + Email row */}
              <div
                style={{
                  display:             "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap:                 12,
                  marginBottom:        14,
                }}
              >
                <div>
                  <label style={labelStyle} htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Type here"
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="Type here"
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === "sending"}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle} htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Hey! I'd love to work with you on..."
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                />
              </div>

              {/* Submit button */}
              <button
                className="btn-primary"
                style={{
                  width:   "100%",
                  fontSize: 14.5,
                  opacity:  status === "sending" ? 0.7 : 1,
                  cursor:   status === "sending" ? "not-allowed" : "pointer",
                  pointerEvents: status === "sending" ? "none" : "auto",
                }}
                onClick={handleSubmit}
              >
                {status === "sending" ? "Sending... ⏳" : "Send Message ✦"}
              </button>

            </div>
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
                display:       "flex",
                alignItems:    "center",
                gap:           7,
                padding:       "8px 16px",
                border:        "1.5px solid var(--border2)",
                borderRadius:  12,
                textDecoration:"none",
                color:         "var(--muted)",
                fontSize:      12.5,
                fontWeight:    800,
                background:    "var(--glass)",
                transition:    "all 0.25s ease",
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
                : <span>{icon}</span>
              }
              {label}
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}