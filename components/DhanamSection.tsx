"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useScrollStage } from "./ScrollContext";

export function DhanamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();
  const { visibleSections } = useScrollStage();
  
  // Use GSAP visible state if available (index 2), fallback to IntersectionObserver
  const isVisible = visibleSections.length > 0 ? visibleSections[2] : isInView;

  // Determine animation states based on reduced motion preference
  const maskInitial = prefersReducedMotion ? { clipPath: "circle(150% at 50% 50%)" } : { clipPath: "circle(0% at 50% 100%)" };
  const maskAnimate = { clipPath: "circle(150% at 50% 50%)" };

  const phoneInitial = prefersReducedMotion ? { y: "0%", scale: 1 } : { y: "110%", scale: 0.94 };
  const phoneAnimate = { y: "0%", scale: 1 };

  return (
    <div className="relative w-full h-full bg-white flex flex-col md:flex-row overflow-hidden pt-28 md:pt-0">

      {/* LEFT: CONTENT AREA */}
      <div className="w-full md:w-[45%] flex-none md:flex-1 md:h-full flex flex-col justify-center px-8 md:px-12 lg:pl-24 lg:pr-12 z-10 text-ink pb-4 md:pb-0">

        {/* Eyebrow */}
        <span className="font-ui text-xs md:text-xs font-semibold tracking-[0.2em] uppercase mb-4 md:mb-6 opacity-70">
          dhanam collections
        </span>

        {/* Headline */}
        <h2 className="font-ui font-black text-5xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-4 md:mb-8 max-w-[15ch]">
          Woven by hand,<br />
          worn with pride.
        </h2>

        {/* Secondary Copy */}
        <p className="font-ui text-base md:text-base opacity-70 leading-relaxed mb-6 md:mb-10 max-w-md">
          Authentic Indian weaves, brought into modern wardrobes.
        </p>

        {/* CTA */}
        <div>
          <button className="group relative inline-flex items-center font-ui text-sm md:text-sm font-semibold tracking-widest uppercase transition-all">
            <span className="relative pb-1">
              explore collection
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-ink transform origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-0" />
            </span>
          </button>
        </div>

      </div>

      {/* RIGHT: VISUAL AREA */}
      <div
        className="relative w-full flex-1 md:w-[55%] md:h-full flex items-start md:items-end justify-center mt-2 md:mt-0"
        ref={containerRef}
      >
        <div className="relative w-[50%] sm:w-[45%] md:w-[75%] max-w-[420px] aspect-[1/2] md:aspect-[3/5]" style={{ perspective: "1200px" }}>
          {/* Circular Mask Container */}
          <motion.div
            initial={maskInitial}
            animate={isVisible ? maskAnimate : maskInitial}
            transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Phone Translation & Scale & 3D Rotation */}
            {/* Mirrored rotation: positive Y and Z so it swings in from the right */}
            <motion.div
              initial={{ ...phoneInitial, rotateX: 70, rotateY: 30, rotateZ: 20, opacity: 0 }}
              animate={isVisible ? { ...phoneAnimate, rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 1 } : { ...phoneInitial, rotateX: 70, rotateY: 30, rotateZ: 20, opacity: 0 }}
              transition={{ duration: 2.0, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
              className="relative w-full h-full origin-bottom"
            >
              <Image
                src="/assets/dhanam.png"
                alt="Dhanam Collections on iPhone"
                fill
                className="object-contain object-top md:object-bottom"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
