"use client";

import React, { useState, useEffect } from "react";

const words = ["PRODUCT", "GRAPHIC", "UI/UX", "MOTION", "3D"];

export function RotatingText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Wait a tiny bit while blank, then switch to the next word
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        setCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }

    if (charIndex < currentWord.length) {
      // Type next character
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 50); // Faster typing speed
      return () => clearTimeout(timeout);
    } else {
      // Word is completely typed out, pause before making it disappear
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [wordIndex, charIndex, isDeleting]);

  const currentWord = words[wordIndex];
  // If isDeleting is true, show nothing so it instantly disappears
  const visibleChars = isDeleting ? "" : currentWord.substring(0, charIndex);

  return (
    <div className="flex items-center justify-center gap-[2vw] w-full origin-center transition-all duration-150">
      <div className="flex">
        {visibleChars.split("").map((char, i) => {
          // The most recently appeared character is styled as an outline,
          // but ONLY while the word is still typing. Once fully typed, it becomes solid.
          const isTyping = charIndex < currentWord.length;
          const isLast = i === charIndex - 1 && isTyping;
          return (
            <span
              key={`${wordIndex}-${i}`}
              className={isLast ? "text-transparent" : "text-ink"}
              style={{
                WebkitTextStroke: isLast ? "3px #10100F" : "0px",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
      <span>DESIGN</span>
    </div>
  );
}
