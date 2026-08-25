"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ScrollProvider, useScrollStage } from "./ScrollContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Disable automatic scroll restoration so the page always loads at the top,
  // preventing GSAP sections from rendering halfway through their animation on refresh.
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}

interface ScrollStageProps {
  children: React.ReactNode;
}

function ScrollStageInner({ children }: ScrollStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const { setVisibleSections } = useScrollStage();
  const [isReady, setIsReady] = useState(false);

  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    if (!containerRef.current || childrenArray.length === 0) return;

    // Force scroll to top on mount so the presentation always starts fresh
    window.scrollTo(0, 0);

    const sections = sectionsRef.current.filter(Boolean);
    if (sections.length < 2) return;

    if (prefersReducedMotion) {
      gsap.set(sections, { clearProps: "all" });
      setIsReady(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Set all sections except the first one to be 110% translated down (fixes shadow bleeding at bottom)
      gsap.set(sections.slice(1), { yPercent: 110 });

      // Mark as ready once GSAP has safely pushed everything down
      setIsReady(true);

      // Create a timeline bound to the scroll of the container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          // 150% scroll distance per incoming section for a smooth, physical feel
          end: `+=${(sections.length - 1) * 150}%`,
          scrub: 1, // Smooth easing when scrolling stops
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const numTransitions = sections.length - 1;
            if (numTransitions <= 0) return;

            const newVisible = sections.map((_, i) => {
              if (i === 0) return progress <= 1 / numTransitions + 0.05;
              const startEnter = (i - 1) / numTransitions;
              const fullyCovered = (i + 1) / numTransitions;
              return progress >= startEnter - 0.05 && progress <= fullyCovered + 0.05;
            });

            setVisibleSections((prev) => {
              const changed = newVisible.some((val, idx) => val !== prev[idx]);
              return changed ? newVisible : prev;
            });
          }
        },
      });

      // Animate each section sequentially
      sections.forEach((sec, i) => {
        if (i === 0 || !sec) return; // First section is already in place

        const prevSec = sections[i - 1];
        const exploreBtn = sec.querySelector('.explore-tab');

        // As the user scrolls, this moves the section up to cover the previous one
        tl.to(sec, {
          yPercent: 0,
          ease: "none",
          duration: 1, // Explicitly set duration to map against timeline cleanly
        });

        // The 3D stacking effect: push the previous section back and fade it out to prevent overlap bleed
        if (prevSec) {
          tl.to(prevSec, {
            scale: 0.92,
            yPercent: -15,
            opacity: 0,
            ease: "none",
            duration: 1,
            transformOrigin: "top center",
          }, "<"); // Run concurrently with the new section sliding up
        }

        if (exploreBtn) {
          // Fade the button out midway so it disappears naturally
          tl.to(exploreBtn, {
            autoAlpha: 0,
            duration: 0.15,
            ease: "power2.inOut",
          }, "<0.33"); // Starts fading exactly when it hits the middle of the screen
        }
      });

      // Fade out the background right before the final transition finishes so the footer reveals properly
      tl.to("#scroll-stage-bg", {
        opacity: 0,
        ease: "none",
        duration: 0.2, // fast fade
      }, "-=0.2");
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [childrenArray.length, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative w-full h-[100svh] overflow-hidden">
      {/* Background to fill the gaps created by the 3D stacking shrink effect */}
      <div id="scroll-stage-bg" className="absolute inset-0 bg-paper z-0" />
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const validChild = child as React.ReactElement<React.HTMLProps<HTMLDivElement>>;
          return React.cloneElement(validChild, {
            ref: (el: HTMLDivElement | null) => {
              sectionsRef.current[index] = el;
            },
            style: {
              ...(validChild.props.style || {}),
              zIndex: index + 1, // Sequential z-index stacking applied directly to styles
              visibility: (!isReady && index !== 0) ? "hidden" : "visible", // Hide until GSAP pushes them down
            },
          });
        }
        return child;
      })}
    </div>
  );
}

export function ScrollStage({ children }: ScrollStageProps) {
  return (
    <ScrollProvider>
      <ScrollStageInner>{children}</ScrollStageInner>
    </ScrollProvider>
  );
}
