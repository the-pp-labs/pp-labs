"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ProjectCard, Project } from "./ProjectCard";

const mockProjects: Project[] = [
  { id: 1, title: "AI Dashboard", category: "Product Design", image: "" },
  { id: 2, title: "Mobile Banking UI", category: "Fintech", image: "" },
  { id: 3, title: "Food/Product UI", category: "E-commerce", image: "" },
  { id: 4, title: "Analytics Platform", category: "Data Vis", image: "" },
  { id: 5, title: "E-commerce App", category: "Mobile Design", image: "" },
  { id: 6, title: "Creative Portfolio", category: "Web Design", image: "" },
  { id: 7, title: "Productivity App", category: "SaaS", image: "" },
  { id: 8, title: "Smart Home UI", category: "IoT", image: "" },
];

export function ArcCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const hoverRef = useRef(false);

  // Parallax refs
  const mouseX = useRef(0);
  const targetRotateY = useRef(0);
  const currentRotateY = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Configuration for the 3D arc
      const radiusX = typeof window !== "undefined" && window.innerWidth < 768 ? 400 : 900;
      const radiusZ = typeof window !== "undefined" && window.innerWidth < 768 ? 300 : 600;

      const totalCards = mockProjects.length;

      const updateCards = () => {
        // Continuous rotation
        if (!hoverRef.current) {
          progressRef.current += 0.0015; // Speed of rotation
        } else {
          progressRef.current += 0.0003; // Slow down on hover
        }

        // Parallax easing
        currentRotateY.current += (targetRotateY.current - currentRotateY.current) * 0.05;
        if (containerRef.current) {
          containerRef.current.style.transform = `rotateY(${currentRotateY.current}deg)`;
        }

        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          // Normalize progress around the circle
          const offset = index / totalCards;
          // angle goes from 0 to Math.PI * 2
          const angle = (progressRef.current + offset) * Math.PI * 2;

          // X is left-right, Z is front-back
          const x = Math.sin(angle) * radiusX;
          // INVERTED Z: center (angle=0) is -radiusZ (deepest), edges come closer to camera
          const z = -Math.cos(angle) * radiusZ;
          const y = -Math.cos(angle) * 30; // Subtle arc in Y

          // Depth calculations
          // We want cards to fade out when they come too close/pass behind the camera (z > 0)
          let opacity = 1;
          if (z > 0) {
            opacity = Math.max(0, 1 - (z / (radiusZ * 0.5)));
          }

          // Scale based on Z depth. CSS translateZ also scales visually, 
          // but we can add a slight physical scale to enhance the effect.
          // At center (z = -radiusZ), scale is slightly smaller. 
          // At edges (z = 0), scale is normal.
          const normalizedDepth = (z + radiusZ) / (radiusZ * 2); // 0 at center, 1 at back of camera
          const scale = 0.7 + normalizedDepth * 0.6;

          // Rotation to make cards face inward (concave)
          // angle=0 -> 0deg, angle=PI/4 -> -45deg (faces center)
          const rotateY = -angle * (180 / Math.PI);

          gsap.set(card, {
            x: x,
            y: y,
            z: z,
            scale: scale,
            opacity: opacity,
            filter: `grayscale(${z < 0 ? 0 : normalizedDepth})`,
            zIndex: Math.round(z), // Deeper cards (negative Z) have lower zIndex
            rotateY: rotateY,
          });
        });
      };

      gsap.ticker.add(updateCards);

      return () => {
        gsap.ticker.remove(updateCards);
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse X from -1 to 1
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      targetRotateY.current = mouseX.current * 10; // Max 10 degrees rotation
    };

    const handleWheel = (e: WheelEvent) => {
      // Allow scrolling to manually rotate the carousel
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      progressRef.current -= delta * 0.0002;
    };

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const touchX = e.touches[0].clientX;
      const deltaX = touchStartX - touchX;
      progressRef.current -= deltaX * 0.0002;
      touchStartX = touchX;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-paper flex flex-col items-center justify-center ring-scene">
      {/* 3D Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {mockProjects.map((project, i) => (
          <ProjectCard
            key={project.id}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            project={project}
            onMouseEnter={() => (hoverRef.current = true)}
            onMouseLeave={() => (hoverRef.current = false)}
            className="transition-[filter,opacity] duration-300" // We handle transform via GSAP so avoid transition on transform
          />
        ))}
      </div>

    </div>
  );
}
