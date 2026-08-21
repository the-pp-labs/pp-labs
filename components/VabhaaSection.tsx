"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function VabhaaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();

  // Adapted mask for a wide laptop: an ellipse instead of a perfect circle
  const maskInitial = prefersReducedMotion ? { clipPath: "ellipse(150% 150% at 50% 50%)" } : { clipPath: "ellipse(0% 0% at 50% 100%)" };
  const maskAnimate = { clipPath: "ellipse(150% 150% at 50% 50%)" };
  
  // No rotation, just a clean, premium slide and scale up
  const laptopInitial = prefersReducedMotion ? { y: "0%", scale: 1 } : { y: "25%", scale: 0.95 };
  const laptopAnimate = { y: "0%", scale: 1 };

  return (
    <div className="relative w-full h-full bg-[#FDFBF7] flex flex-col items-center justify-start overflow-hidden pt-20 md:pt-24 lg:pt-28 pb-0">
      
      {/* TOP: CONTENT AREA */}
      <div className="w-full flex flex-col items-center text-center z-10 text-[#2D2A26] px-4 md:px-8 shrink-0">
        
        {/* Logo / Eyebrow */}
        <span className="font-ui font-bold tracking-[0.2em] text-[#8B2E2E] uppercase mb-1 md:mb-2 text-[10px]">
          VABHAA FOODS
        </span>
        
        {/* Headline */}
        <h2 className="font-ui font-black text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight mb-2 max-w-3xl text-[#2D2A26]">
          A taste of home,<br />
          in every jar.
        </h2>
        
        {/* Supporting Copy */}
        <p className="font-ui text-[10px] md:text-xs font-medium opacity-80 leading-relaxed mb-4 md:mb-5 max-w-md text-[#4A4743]">
          Traditional flavours, thoughtfully made for the modern pantry.
        </p>
        
        {/* CTA */}
        <button className="group relative inline-flex items-center font-ui text-[9px] md:text-[10px] font-semibold tracking-widest uppercase transition-all px-5 py-2 md:px-6 md:py-2.5 bg-[#8B2E2E] text-[#FDFBF7] rounded-full hover:bg-[#722323] shadow-md">
          SHOP THE PANTRY &nbsp; →
        </button>

      </div>

      {/* BOTTOM: VISUAL AREA */}
      <div 
        className="relative w-full flex-1 flex items-end justify-center mt-4 md:mt-8 min-h-0"
        ref={containerRef}
      >
        {/* Laptop Container - Maximize width to force the image to be huge */}
        <div className="relative w-[95%] md:w-[90%] lg:w-[88%] h-full max-w-[1500px]">
          {/* Mask Container */}
          <motion.div
            initial={maskInitial}
            animate={isInView ? maskAnimate : maskInitial}
            transition={{ duration: 3.0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Laptop Translation & Scale */}
            <motion.div
              initial={{ ...laptopInitial, opacity: 0 }}
              animate={isInView ? { ...laptopAnimate, opacity: 1 } : { ...laptopInitial, opacity: 0 }}
              transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
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
