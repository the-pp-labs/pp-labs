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
import { RotatingText } from "@/components/RotatingText";

export default function Page() {
  return (
    <div className="bg-transparent w-full">
      {/* Fixed Footer Revealed in Bottom Half */}
      <footer className="fixed bottom-0 left-0 w-full h-[50svh] bg-black flex flex-col items-center justify-center text-white -z-10 overflow-hidden select-none">
        {/* Background Artwork */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/assets/footer-bg.jpg"
            alt="Footer Background Art"
            fill
            priority
            className="object-cover object-center opacity-75"
          />
          {/* Subtle top edge fade for seamless curtain slide */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
          {/* Ambient vignette for depth and logo clarity */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.75) 100%)",
            }}
          />
        </div>

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-3 w-full max-w-4xl px-4 pointer-events-auto">

          {/* Massive Geometric PP Logo */}
          <div className="group relative w-[180px] md:w-[240px] lg:w-[280px] aspect-[1.5] transition-all flex items-center justify-center cursor-pointer">
            {/* Solid Red Logo (Hidden by default, fades in on hover) */}
            <Image
              src="/assets/pp-logo-v2.png"
              alt="PP Labs Logo Solid"
              fill
              className="object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)] z-10"
            />
            {/* White Outline Logo (Visible by default, fades out on hover) */}
            <Image
              src="/assets/pp-logo-outline.png"
              alt="PP Labs Logo Outline"
              fill
              className="object-contain opacity-100 transition-opacity duration-300 group-hover:opacity-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] z-20"
            />
          </div>

          {/* Labs Text */}
          <div className="text-[10px] md:text-xs font-sans font-bold tracking-[0.45em] uppercase text-white/90 mt-1 drop-shadow-md">
            Labs
          </div>

        </div>
      </footer>

      {/* Content Wrapper */}
      <div className="relative z-10 w-full">
        <ScrollStage>
          {/* Layer 1: The Existing Homepage */}
          <ScrollSection>
            <main className="relative h-[100svh] w-full bg-paper overflow-hidden">
              {/* Fixed Explore Button overlay for Layer 1 */}
              <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 z-50 explore-tab pointer-events-none">
                <ExploreButton />
              </div>
              {/* 3D DESIGN Background Text */}
              {/* Background Text (Desktop removed per request) */}

              {/* Background Text (Mobile) */}
              <div className="md:hidden absolute top-[15%] left-0 right-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="text-[12vw] font-display font-medium tracking-normal text-ink uppercase leading-none whitespace-nowrap w-full">
                  <RotatingText />
                </div>
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
          <ScrollSection className="bg-[#050505]">
            <div className="relative w-full h-full bg-[#050505] z-20">
              <CtaSection />
            </div>
          </ScrollSection>
        </ScrollStage>
      </div>

      {/* Spacer to allow scrolling half-way to reveal the bottom-half fixed footer */}
      <div className="w-full h-[50svh] pointer-events-none relative z-0"></div>
    </div>
  );
}
