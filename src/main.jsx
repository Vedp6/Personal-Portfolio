// ─────────────────────────────────────────────────────────────────────────────
//  src/main.jsx  —  React entry point
// ─────────────────────────────────────────────────────────────────────────────

import React      from "react";
import ReactDOM   from "react-dom/client";
import App        from "./App";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/*
     * ThemeProvider wraps everything so any component
     * can call useTheme() to read dark/light state or toggle it.
     */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
