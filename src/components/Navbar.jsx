// ─────────────────────────────────────────────────────────────────────────────
//  src/components/Navbar.jsx  —  Fixed floating pill navbar with theme toggle
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { NAV_LINKS } from "../data/index";

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  // Shadow / blur intensifies after scrolling 40px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id) => {
    const target = id === "Home" ? "hero" : id.toLowerCase();
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  /* ── styles ── */
  const navStyle = {
    position:       "fixed",
    top:            16,
    left:           "50%",
    transform:      "translateX(-50%)",
    zIndex:         200,
    width:          "min(920px, calc(100% - 32px))",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "space-between",
    padding:        "12px 20px",
    background:     dark
      ? scrolled ? "rgba(6,6,18,0.85)" : "rgba(6,6,18,0.65)"
      : scrolled ? "rgba(240,238,255,0.90)" : "rgba(240,238,255,0.70)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border:         "1px solid var(--border2)",
    borderRadius:   20,
    transition:     "all 0.4s ease",
    boxShadow:      scrolled ? "0 8px 32px rgba(0,0,0,0.25)" : "none",
  };

  const linkStyle = {
    background:  "none",
    border:      "none",
    color:       "var(--muted)",
    fontFamily:  "'Cabinet Grotesk', sans-serif",
    fontSize:    13.5,
    fontWeight:  700,
    cursor:      "pointer",
    padding:     "6px 13px",
    borderRadius: 10,
    transition:  "all 0.2s ease",
  };

  return (
    <>
      {/* ── Main Nav Bar ── */}
      <nav style={navStyle}>

        {/* Logo */}
        <span
          style={{
            fontFamily:           "'Clash Display', sans-serif",
            fontWeight:           700,
            fontSize:             19,
            background:           "linear-gradient(135deg,#a78bfa,#38bdf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor:  "transparent",
            backgroundClip:       "text",
            cursor:               "pointer",
            userSelect:           "none",
          }}
          onClick={() => goto("Home")}
        >
          &lt;VedantPatil /&gt;
        </span>

        {/* Desktop Links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 2 }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color      = "#a78bfa";
                e.currentTarget.style.background = "rgba(167,139,250,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color      = "var(--muted)";
                e.currentTarget.style.background = "none";
              }}
              onClick={() => goto(link)}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right side: theme toggle + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

          {/* Theme toggle switch */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              width:        46,
              height:       26,
              borderRadius: 99,
              border:       "1px solid var(--border2)",
              background:   dark
                ? "linear-gradient(135deg,#7c3aed,#0891b2)"
                : "linear-gradient(135deg,#c4b5fd,#7dd3fc)",
              cursor:       "pointer",
              position:     "relative",
              flexShrink:   0,
              transition:   "background 0.3s",
            }}
          >
            <div
              style={{
                position:     "absolute",
                top:          3,
                left:         dark ? 22 : 3,
                width:        18,
                height:       18,
                borderRadius: "50%",
                background:   "#fff",
                transition:   "left 0.3s ease",
                fontSize:     10,
                display:      "flex",
                alignItems:   "center",
                justifyContent: "center",
                boxShadow:    "0 1px 4px rgba(0,0,0,0.3)",
              }}
            >
              {dark ? "🌙" : "☀️"}
            </div>
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background:     "none",
              border:         "1.5px solid var(--border2)",
              borderRadius:   10,
              width:          38,
              height:         38,
              cursor:         "pointer",
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            5,
              padding:        0,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width:        18,
                  height:       2,
                  background:   "var(--txt)",
                  borderRadius: 99,
                  transition:   "all 0.3s ease",
                  transform:
                    menuOpen && i === 0 ? "translateY(7px) rotate(45deg)"  :
                    menuOpen && i === 2 ? "translateY(-7px) rotate(-45deg)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile Dropdown Menu ── */}
      {menuOpen && (
        <div
          style={{
            position:        "fixed",
            top:             76,
            left:            "50%",
            transform:       "translateX(-50%)",
            zIndex:          199,
            width:           "min(920px, calc(100% - 32px))",
            background:      dark ? "rgba(6,6,18,0.95)" : "rgba(240,238,255,0.97)",
            backdropFilter:  "blur(20px)",
            border:          "1px solid var(--border2)",
            borderRadius:    16,
            padding:         "12px",
            display:         "flex",
            flexDirection:   "column",
            gap:             4,
            boxShadow:       "0 12px 40px rgba(0,0,0,0.3)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => goto(link)}
              style={{
                ...linkStyle,
                textAlign: "left",
                fontSize:  15,
                padding:   "10px 16px",
                borderRadius: 12,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color      = "#a78bfa";
                e.currentTarget.style.background = "rgba(167,139,250,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color      = "var(--muted)";
                e.currentTarget.style.background = "none";
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
