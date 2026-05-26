// ─────────────────────────────────────────────────────────────────────────────
//  src/context/ThemeContext.jsx  —  Global dark / light theme state
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(true);

  const toggle = () => setDark((d) => !d);

  // CSS variable map applied to the root wrapper
  const themeVars = {
    "--bg":       dark ? "#060612"                  : "#f0eeff",
    "--bg2":      dark ? "#0c0c1e"                  : "#e8e4ff",
    "--glass":    dark ? "rgba(255,255,255,0.04)"   : "rgba(255,255,255,0.6)",
    "--glass-b":  dark ? "rgba(255,255,255,0.06)"   : "rgba(255,255,255,0.85)",
    "--txt":      dark ? "#f0eeff"                  : "#1a1035",
    "--muted":    dark ? "#8878cc"                  : "#6b5ca5",
    "--border":   dark ? "rgba(255,255,255,0.08)"   : "rgba(100,80,200,0.12)",
    "--border2":  dark ? "rgba(255,255,255,0.14)"   : "rgba(100,80,200,0.22)",
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle, themeVars }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
