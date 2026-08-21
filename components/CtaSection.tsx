"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%", once: true });
  const prefersReducedMotion = useReducedMotion();

  const animationProps = prefersReducedMotion 
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 40 },
        animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
      };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center py-8 md:py-16">
      <motion.div 
        {...animationProps}
        className="w-[92%] md:w-[94%] max-w-[1400px] h-[85%] max-h-[700px] min-h-[400px] flex flex-col items-center justify-center rounded-[38px] md:rounded-[48px] border-[1.5px] border-white/70 px-6 md:px-16 text-center"
      >
        <h2 className="font-sans font-black text-[12vw] md:text-[8vw] lg:text-[120px] leading-[0.9] tracking-[-0.04em] text-white mb-6 md:mb-8 lowercase">
          the best time to<br />
          start is now
        </h2>
        
        <p className="font-ui text-[10px] md:text-xs lg:text-sm text-white/80 font-medium mb-10 md:mb-12 max-w-lg tracking-wide">
          Your website should feel like the business you are trying to become.
        </p>

        <button className="group relative inline-flex items-center justify-center font-sans text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase transition-all px-6 py-2.5 md:px-8 md:py-3 bg-[#FDFBF7] text-[#0B0B0B] rounded-full hover:bg-white hover:-translate-y-0.5">
          LETS GO
        </button>
      </motion.div>
    </div>
  );
}
