import React from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { ExploreButton } from "@/components/ExploreButton";
import { ArcCarousel } from "@/components/ArcCarousel";
import { ScrollStage } from "@/components/ScrollStage";
import { ScrollSection } from "@/components/ScrollSection";

export default function Page() {
  return (
    <div className="bg-transparent w-full">
      {/* Fixed Footer Revealed Natively */}
      <footer className="fixed bottom-0 left-0 w-full min-h-[100svh] bg-ink flex flex-col items-center justify-center text-paper -z-10">
        <h1 className="text-4xl md:text-6xl font-display font-black tracking-widest uppercase mb-4">
          FOOTER
        </h1>
        <p className="text-sm md:text-base font-ui text-paper/60 uppercase tracking-[0.3em]">
          Revealed from underneath
        </p>
      </footer>

      {/* Opaque Content Wrapper to cover the footer until scroll finishes */}
      <div className="relative z-10 w-full bg-paper">
        <ScrollStage>
          {/* Layer 1: The Existing Homepage */}
          <ScrollSection>
            <main className="relative h-[100svh] w-full bg-paper overflow-hidden">
              <Navbar />
              
              {/* 3D DESIGN Background Text */}
              <div className="absolute top-[18%] left-0 right-0 z-10 pointer-events-none flex justify-center">
                <h1 className="text-[14vw] font-display font-black tracking-tight text-ink uppercase leading-none">
                  3D DESIGN
                </h1>
              </div>

              <div className="relative z-20">
                <ArcCarousel />
              </div>

              {/* Side Texts */}
              <div className="absolute bottom-[22%] w-full left-0 z-30 pointer-events-none">
                <p className="absolute right-[55%] md:right-[calc(50%+150px)] top-0 font-ui text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-widest text-ink transform -rotate-3 whitespace-nowrap">
                  FOUNDING ENGINEER
                </p>
                <p className="absolute left-[55%] md:left-[calc(50%+200px)] top-0 font-ui text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-widest text-ink transform rotate-3 whitespace-nowrap">
                  END-TO-END / FULL STACK
                </p>
              </div>

              {/* Center Character Overlay */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-[90vw] max-w-[500px] h-[75svh] flex justify-center items-end">
                <Image
                  src="/assets/hero-image.png"
                  alt="Hero Character"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  priority
                />
              </div>
            </main>
          </ScrollSection>

          {/* Layer 2: Section 2 Placeholder */}
          <ScrollSection>
            <div className="relative w-full h-full bg-[#111] flex flex-col items-center justify-center text-paper border-t border-paper/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <ExploreButton />
              <h1 className="text-4xl md:text-6xl font-display font-black tracking-widest uppercase mb-4">
                SECTION 2
              </h1>
              <p className="text-sm md:text-base font-ui text-paper/60 uppercase tracking-[0.3em]">
                Placeholder Content
              </p>
            </div>
          </ScrollSection>

          {/* Layer 3: Section 3 Placeholder */}
          <ScrollSection>
            <div className="w-full h-full bg-paper flex flex-col items-center justify-center text-ink border-t border-ink/10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
              <h1 className="text-4xl md:text-6xl font-display font-black tracking-widest uppercase mb-4">
                SECTION 3
              </h1>
              <p className="text-sm md:text-base font-ui text-ink/60 uppercase tracking-[0.3em]">
                Placeholder Content
              </p>
            </div>
          </ScrollSection>

          {/* Layer 4: Section 4 Placeholder */}
          <ScrollSection>
            <div className="w-full h-full bg-[#f4f4f4] flex flex-col items-center justify-center text-ink border-t border-ink/10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-10">
              <h1 className="text-4xl md:text-6xl font-display font-black tracking-widest uppercase mb-4">
                SECTION 4
              </h1>
              <p className="text-sm md:text-base font-ui text-ink/60 uppercase tracking-[0.3em]">
                Placeholder Content
              </p>
            </div>
          </ScrollSection>
        </ScrollStage>
      </div>
      
      {/* Spacer to allow scrolling past the ScrollStage to reveal the fixed footer */}
      <div className="w-full min-h-[100svh] pointer-events-none relative z-0"></div>
    </div>
  );
}
