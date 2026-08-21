"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function RumikSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();

  // Determine animation states based on reduced motion preference
  const maskInitial = prefersReducedMotion ? { clipPath: "circle(150% at 50% 50%)" } : { clipPath: "circle(0% at 50% 100%)" };
  const maskAnimate = { clipPath: "circle(150% at 50% 50%)" };
  
  const phoneInitial = prefersReducedMotion ? { y: "0%", scale: 1 } : { y: "110%", scale: 0.94 };
  const phoneAnimate = { y: "0%", scale: 1 };

  return (
    <div className="relative w-full h-full bg-[#FAFAFA] flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT: VISUAL AREA */}
      <div 
        className="relative w-full md:w-[55%] h-[55%] md:h-full flex items-end justify-center pt-12 md:pt-24"
        ref={containerRef}
      >
        <div className="relative w-[75%] max-w-[420px] aspect-[1/2] md:aspect-[3/5]" style={{ perspective: "1200px" }}>
          {/* Circular Mask Container */}
          <motion.div
            initial={maskInitial}
            animate={isInView ? maskAnimate : maskInitial}
            transition={{ duration: 3.0, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Phone Translation & Scale & 3D Rotation */}
            <motion.div
              initial={{ ...phoneInitial, rotateX: 70, rotateY: -30, rotateZ: -20, opacity: 0 }}
              animate={isInView ? { ...phoneAnimate, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 } : { ...phoneInitial, rotateX: 70, rotateY: -30, rotateZ: -20, opacity: 0 }}
              transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full origin-bottom"
            >
              <Image
                src="/assets/rumik.png"
                alt="Rumik AI Interface on iPhone"
                fill
                className="object-contain object-bottom"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT: CONTENT AREA */}
      <div className="w-full md:w-[45%] h-[45%] md:h-full flex flex-col justify-center px-8 md:px-12 lg:pr-24 lg:pl-0 z-10 text-ink pb-12 md:pb-0">
        
        {/* Eyebrow */}
        <span className="font-ui text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase mb-4 md:mb-6 opacity-70">
          rumik ai
        </span>
        
        {/* Headline */}
        <h2 className="font-ui font-black text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 md:mb-8 max-w-[15ch]">
          building the<br />
          most human ai.
        </h2>
        
        {/* Supporting Copy */}
        <p className="font-ui text-sm md:text-base font-medium opacity-90 mb-3 max-w-md">
          Silk, Mesh & Peek power our first true companion, Ira.
        </p>
        
        {/* Secondary Copy */}
        <p className="font-ui text-xs md:text-sm opacity-60 leading-relaxed mb-8 md:mb-10 max-w-md">
          She chats, calls, sends voice notes, watches YouTube with you, plays chess, and exchanges gifs, stickers, emojis and much more.
        </p>
        
        {/* CTA */}
        <div>
          <button className="group relative inline-flex items-center font-ui text-xs md:text-sm font-semibold tracking-widest uppercase transition-all">
            <span className="relative pb-1">
              talk to ira
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-ink transform origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-0" />
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
