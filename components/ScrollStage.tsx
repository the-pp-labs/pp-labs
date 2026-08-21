"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollStageProps {
  children: React.ReactNode;
}

export function ScrollStage({ children }: ScrollStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (!containerRef.current || childrenArray.length === 0) return;
    
    const sections = sectionsRef.current.filter(Boolean);
    if (sections.length < 2) return;

    if (prefersReducedMotion) {
      gsap.set(sections, { clearProps: "all" });
      return;
    }

    let ctx = gsap.context(() => {
      // Set all sections except the first one to be 100% translated down
      gsap.set(sections.slice(1), { yPercent: 100 });

      // Create a timeline bound to the scroll of the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          // 150% scroll distance per incoming section for a smooth, physical feel
          end: `+=${(sections.length - 1) * 150}%`,
          scrub: 1, // Smooth easing when scrolling stops
          anticipatePin: 1,
        },
      });

      // Animate each section sequentially
      sections.forEach((sec, i) => {
        if (i === 0) return; // First section is already in place
        
        const exploreBtn = sec.querySelector('.explore-tab');

        // As the user scrolls, this moves the section up to cover the previous one
        tl.to(sec, {
          yPercent: 0,
          ease: "none",
          duration: 1, // Explicitly set duration to map against timeline cleanly
        });

        if (exploreBtn) {
          // Fade the button out midway so it disappears naturally
          tl.to(exploreBtn, {
            autoAlpha: 0,
            duration: 0.15,
            ease: "power2.inOut",
          }, "<0.33"); // Starts fading exactly when it hits the middle of the screen
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [childrenArray.length, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] overflow-hidden">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            ref: (el: HTMLDivElement | null) => {
              sectionsRef.current[index] = el;
            },
            zIndex: index + 1, // Sequential z-index stacking
          });
        }
        return child;
      })}
    </div>
  );
}
