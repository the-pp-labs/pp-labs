"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

interface ParallaxState {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export function usePointerParallax() {
  const [state, setState] = useState<ParallaxState>({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (prefersReducedMotion) return;

    // Calculate normalized position -1 to 1
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    
    setState({ x, y });
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handlePointerMove]);

  return state;
}
