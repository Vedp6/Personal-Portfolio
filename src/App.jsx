// ─────────────────────────────────────────────────────────────────────────────
//  src/App.jsx  —  Root component: wires all sections together
// ─────────────────────────────────────────────────────────────────────────────

import { useTheme } from "./context/ThemeContext";

// Layout
import Navbar    from "./components/Navbar";
import Footer    from "./components/Footer";
import Particles from "./components/Particles";

// Sections
import Hero     from "./components/Hero";
import About    from "./components/About";
import Skills   from "./components/Skills";
import Projects from "./components/Projects";
import Contact  from "./components/Contact";

// Global styles
import "./styles/global.css";

export default function App() {
  const { themeVars } = useTheme();

  return (
    /*
     * themeVars injects all CSS custom properties (--bg, --txt, etc.)
     * onto the root wrapper so every child can use var(--bg) etc.
     */
    <div
      style={{
        ...themeVars,
        background: "var(--bg)",
        color:      "var(--txt)",
        minHeight:  "100vh",
        overflowX:  "hidden",
        transition: "background 0.4s ease, color 0.4s ease",
        fontFamily: "'Cabinet Grotesk', sans-serif",
      }}
    >
      {/* ── Animated particle network (fixed, behind everything) ── */}
      <Particles />

      {/* ── Floating pill navbar ── */}
      <Navbar />

      {/* ── Page sections ── */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
