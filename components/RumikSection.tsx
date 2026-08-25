"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrollStage } from "./ScrollContext";

export function RumikSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();
  const { visibleSections } = useScrollStage();
  
  // Use GSAP visible state if available (index 1), fallback to IntersectionObserver
  const isVisible = visibleSections.length > 0 ? visibleSections[1] : isInView;

  // Determine animation states based on reduced motion preference
  // Mask expands from the top instead of bottom
  const maskInitial = prefersReducedMotion ? { clipPath: "circle(150% at 50% 50%)" } : { clipPath: "circle(0% at 50% 0%)" };
  const maskAnimate = { clipPath: "circle(150% at 50% 50%)" };

  // Premium drop-in from top with blur, scale, and 3D rotation
  const phoneInitial = prefersReducedMotion 
    ? { y: "0%", scale: 1, filter: "blur(0px)", rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 } 
    : { y: "-60%", scale: 1.2, filter: "blur(20px)", rotateX: -30, rotateY: 20, rotateZ: 15, opacity: 0 };
    
  const phoneAnimate = { y: "0%", scale: 1, filter: "blur(0px)", rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 };

  return (
    <div className="relative w-full h-full bg-[#FAFAFA] flex flex-col md:flex-row overflow-hidden pt-28 md:pt-0">

      {/* LEFT: VISUAL AREA (Bottom on mobile) */}
      <div
        className="order-2 md:order-1 relative w-full flex-1 md:w-[55%] md:h-full flex items-start md:items-end justify-center mt-2 md:mt-0"
        ref={containerRef}
      >
        <div className="relative w-[50%] sm:w-[45%] md:w-[75%] max-w-[420px] aspect-[1/2] md:aspect-[3/5]" style={{ perspective: "1200px" }}>
          {/* Circular Mask Container */}
          <motion.div
            initial={maskInitial}
            animate={isVisible ? maskAnimate : maskInitial}
            transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Phone Translation & Scale & 3D Rotation */}
            <motion.div
              initial={phoneInitial}
              animate={isVisible ? phoneAnimate : phoneInitial}
              transition={{ duration: 2.0, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-full h-full origin-center"
            >
              <Image
                src="/assets/rumik.png"
                alt="Rumik AI Interface on iPhone"
                fill
                className="object-contain object-top md:object-bottom"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT: CONTENT AREA (Top on mobile) */}
      <div className="order-1 md:order-2 w-full md:w-[45%] flex-none md:flex-1 md:h-full flex flex-col justify-center px-8 md:px-12 lg:pr-24 lg:pl-0 z-10 text-ink pb-4 md:pb-0">

        {/* Eyebrow */}
        <span className="font-ui text-xs md:text-xs font-semibold tracking-[0.2em] uppercase mb-4 md:mb-6 opacity-70">
          rumik ai
        </span>

        {/* Headline */}
        <h2 className="font-ui font-black text-4xl sm:text-5xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-4 md:mb-8 max-w-[15ch]">
          building the<br />
          most human ai.
        </h2>

        {/* Secondary Copy */}
        <p className="font-ui text-sm md:text-sm opacity-60 leading-relaxed mb-6 md:mb-10 max-w-md">
          She chats, calls, sends voice notes, watches YouTube with you, plays chess, and exchanges gifs, stickers, emojis and much more.
        </p>

        {/* CTA */}
        <div>
          <button className="group relative inline-flex items-center font-ui text-sm md:text-sm font-semibold tracking-widest uppercase transition-all">
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
