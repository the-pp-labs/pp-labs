import React from "react";
import Image from "next/image";
import { ExploreButton } from "@/components/ExploreButton";
import { ArcCarousel } from "@/components/ArcCarousel";
import { ScrollStage } from "@/components/ScrollStage";
import { ScrollSection } from "@/components/ScrollSection";
import { RumikSection } from "@/components/RumikSection";
import { DhanamSection } from "@/components/DhanamSection";
import { VabhaaSection } from "@/components/VabhaaSection";
import { CtaSection } from "@/components/CtaSection";

export default function Page() {
  return (
    <div className="bg-transparent w-full">
      {/* Fixed Footer Revealed Natively */}
      <footer className="fixed bottom-0 left-0 w-full min-h-[100svh] bg-[#050505] flex flex-col items-center justify-center text-white -z-10 overflow-hidden">

        {/* CENTER CONTENT */}
        <div className="flex flex-col items-center justify-center gap-8 md:gap-12 w-full max-w-4xl px-4">

          {/* Top Email & Icons */}
          <div className="flex items-center gap-4 text-[10px] md:text-[11px] font-sans font-bold tracking-widest uppercase opacity-90">
            <a href="mailto:pplabs@gmail.com" className="hover:opacity-70 transition-opacity">
              pplabs@gmail.com
            </a>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="-mt-0.5">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="-mt-0.5">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </div>

          {/* Massive Geometric PP Logo */}
          <div className="group relative w-[180px] md:w-[260px] lg:w-[320px] aspect-[1.5] transition-all flex items-center justify-center cursor-default">
            {/* Solid Red Logo (Hidden by default, fades in on hover) */}
            <Image
              src="/assets/pp-logo-v2.png"
              alt="PP Labs Logo Solid"
              fill
              className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
            />
            {/* White Outline Logo (Visible by default, fades out on hover) */}
            <Image
              src="/assets/pp-logo-outline.png"
              alt="PP Labs Logo Outline"
              fill
              className="object-contain opacity-100 transition-opacity duration-300 group-hover:opacity-0 z-20"
            />
          </div>

          {/* Labs Text */}
          <div className="text-[10px] md:text-xs font-sans font-bold tracking-[0.4em] uppercase opacity-90 mt-2">
            Labs
          </div>

        </div>
      </footer>

      {/* Opaque Content Wrapper to cover the footer until scroll finishes */}
      <div className="relative z-10 w-full bg-paper">
        <ScrollStage>
          {/* Layer 1: The Existing Homepage */}
          <ScrollSection>
            <main className="relative h-[100svh] w-full bg-paper overflow-hidden">
              {/* 3D DESIGN Background Text */}
              {/* Background Text (Desktop removed per request) */}

              {/* Background Text (Mobile) */}
              <div className="md:hidden absolute top-[18%] left-0 right-0 z-10 pointer-events-none flex items-center justify-center text-center">
                <h1 className="text-[12vw] font-display font-bold tracking-tight text-ink uppercase leading-none whitespace-nowrap">
                  PRODUCT DESIGN
                </h1>
              </div>

              <div className="relative z-20">
                <ArcCarousel />
              </div>

              {/* Side Texts (Desktop Only) */}
              <div className="hidden md:block absolute bottom-[22%] w-full left-0 z-30 pointer-events-none">
                <p className="absolute right-[55%] md:right-[calc(50%+150px)] top-0 font-ui text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-widest text-ink transform -rotate-3 whitespace-nowrap">
                  FOUNDING ENGINEER
                </p>
                <p className="absolute left-[55%] md:left-[calc(50%+200px)] top-0 font-ui text-[10px] md:text-xs lg:text-sm font-bold uppercase tracking-widest text-ink transform rotate-3 whitespace-nowrap">
                  END-TO-END / FULL STACK
                </p>
              </div>

              {/* Scrolling Bar (Mobile Only) */}
              <div className="md:hidden absolute bottom-4 w-full left-0 z-30 pointer-events-none overflow-hidden whitespace-nowrap py-2 border-y border-ink/10 flex">
                <div className="inline-block animate-marquee font-ui text-[10px] font-bold uppercase tracking-widest text-ink whitespace-nowrap">
                  FOUNDING PRODUCT DESIGNER • END-TO-END / FULL STACK • FOUNDING PRODUCT DESIGNER • END-TO-END / FULL STACK • FOUNDING PRODUCT DESIGNER • END-TO-END / FULL STACK • FOUNDING PRODUCT DESIGNER • END-TO-END / FULL STACK • 
                </div>
              </div>

              {/* Center Character Overlay */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none w-[90vw] max-w-[500px] h-[75svh] flex justify-center items-end">
                <Image
                  src="/assets/hero-image-v2.png"
                  alt="Hero Character"
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </main>
          </ScrollSection>

          {/* Layer 2: Rumik Section */}
          <ScrollSection>
            <div className="relative w-full h-full border-t border-paper/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <div className="hidden md:block">
                <ExploreButton />
              </div>
              <RumikSection />
            </div>
          </ScrollSection>

          {/* Layer 3: Dhanam Section */}
          <ScrollSection>
            <div className="relative w-full h-full border-t border-paper/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
              <DhanamSection />
            </div>
          </ScrollSection>

          {/* Layer 4: Vabhaa Section */}
          <ScrollSection>
            <div className="relative w-full h-full border-t border-ink/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-10">
              <VabhaaSection />
            </div>
          </ScrollSection>

          {/* Layer 5: Final CTA Card */}
          <ScrollSection>
            <div className="relative w-full h-full bg-[#050505] border-t border-ink/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20">
              <CtaSection />
            </div>
          </ScrollSection>
        </ScrollStage>
      </div>

      {/* Spacer to allow scrolling past the ScrollStage to reveal the fixed footer */}
      <div className="w-full min-h-[100svh] pointer-events-none relative z-0"></div>
    </div>
  );
}
