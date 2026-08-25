"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrollStage } from "./ScrollContext";

export function VabhaaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();
  const { visibleSections } = useScrollStage();
  
  // Use GSAP visible state if available (index 3), fallback to IntersectionObserver
  const isVisible = visibleSections.length > 0 ? visibleSections[3] : isInView;

  // Adapted mask for a wide laptop: an ellipse instead of a perfect circle
  const maskInitial = prefersReducedMotion ? { clipPath: "ellipse(150% 150% at 50% 50%)" } : { clipPath: "ellipse(0% 0% at 50% 100%)" };
  const maskAnimate = { clipPath: "ellipse(150% 150% at 50% 50%)" };

  // No rotation, just a clean, premium slide and scale up
  const laptopInitial = prefersReducedMotion ? { y: "0%", scale: 1 } : { y: "25%", scale: 0.95 };
  const laptopAnimate = { y: "0%", scale: 1 };

  return (
    <div className="relative w-full h-full bg-[#FDFBF7] flex flex-col items-center justify-start overflow-hidden pt-20 md:pt-24 lg:pt-28 pb-0">

      {/* TOP: CONTENT AREA */}
      <div className="w-full flex flex-col items-center text-center z-10 text-[#2D2A26] px-6 md:px-8 shrink-0">

        {/* Logo / Eyebrow */}
        <span className="font-ui font-bold tracking-[0.2em] text-[#8B2E2E] uppercase mb-3 md:mb-2 text-xs md:text-[10px]">
          VABHAA FOODS
        </span>

        {/* Headline */}
        <h2 className="font-ui font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4 md:mb-2 max-w-3xl text-[#2D2A26]">
          A taste of home,<br />
          in every jar.
        </h2>

        {/* Supporting Copy */}
        <p className="font-ui text-sm md:text-base font-medium opacity-80 leading-relaxed mb-6 md:mb-5 max-w-md text-[#4A4743]">
          Traditional flavours, thoughtfully made for the modern pantry.
        </p>

        {/* CTA */}
        <a 
          href="https://vabhaa.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center font-ui text-xs md:text-[10px] font-semibold tracking-widest uppercase transition-all px-8 py-3 md:px-6 md:py-2.5 bg-[#8B2E2E] text-[#FDFBF7] rounded-full hover:bg-[#722323] shadow-md"
        >
          SHOP THE PANTRY &nbsp; →
        </a>

      </div>

      {/* BOTTOM: VISUAL AREA */}
      <div
        className="relative w-full flex-1 flex items-start md:items-end justify-center mt-8 md:mt-8 min-h-0"
        ref={containerRef}
      >
        {/* Laptop Container - Fully visible and centered on mobile */}
        <div className="relative w-[95%] sm:w-[90%] md:w-[90%] lg:w-[88%] aspect-[1.5] md:aspect-auto md:h-full max-w-[1500px]">
          {/* Mask Container */}
          <motion.div
            initial={maskInitial}
            animate={isVisible ? maskAnimate : maskInitial}
            transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Laptop Translation & Scale */}
            <motion.div
              initial={{ ...laptopInitial, opacity: 0 }}
              animate={isVisible ? { ...laptopAnimate, opacity: 1 } : { ...laptopInitial, opacity: 0 }}
              transition={{ duration: 2.0, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="relative w-full h-full origin-bottom"
            >
              <Image
                src="/assets/vabhaa-v2.png"
                alt="Vabhaa Foods on Laptop"
                fill
                className="object-contain object-bottom"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
