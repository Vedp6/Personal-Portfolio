// ─────────────────────────────────────────────────────────────────────────────
//  src/hooks/useTyping.js  —  Typewriter / delete animation hook
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";

/**
 * Cycles through an array of words with a typewriter + delete effect.
 *
 * @param {string[]} words       Words to cycle through
 * @param {number}   typeSpeed   ms per character while typing   (default 80)
 * @param {number}   deleteSpeed ms per character while deleting (default 38)
 * @param {number}   pauseMs     ms to pause at end of word      (default 1900)
 * @returns {string} Currently displayed text
 */
export function useTyping(words, typeSpeed = 80, deleteSpeed = 38, pauseMs = 1900) {
  const [txt, setTxt]     = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timer;

    if (!deleting && txt === word) {
      // Finished typing → wait, then start deleting
      timer = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && txt === "") {
      // Finished deleting → move to next word
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      // Still typing or deleting
      timer = setTimeout(
        () =>
          setTxt(
            deleting
              ? word.slice(0, txt.length - 1)
              : word.slice(0, txt.length + 1)
          ),
        deleting ? deleteSpeed : typeSpeed
      );
    }

    return () => clearTimeout(timer);
  }, [txt, deleting, wordIdx, words, typeSpeed, deleteSpeed, pauseMs]);

  return txt;
}
