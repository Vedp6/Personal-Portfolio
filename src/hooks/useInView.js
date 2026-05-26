// ─────────────────────────────────────────────────────────────────────────────
//  src/hooks/useInView.js  —  IntersectionObserver scroll-reveal hook
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState, useEffect } from "react";

/**
 * Returns [ref, isVisible].
 * Once the element enters the viewport it stays "visible" (one-shot).
 *
 * @param {number} threshold  0–1 fraction of element that must be visible
 */
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}
