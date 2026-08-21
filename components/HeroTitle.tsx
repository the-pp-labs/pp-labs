import React from "react";

export function HeroTitle() {
  return (
    <div className="pointer-events-none absolute left-0 right-0 top-[15%] z-10 flex flex-col items-center justify-center text-center mix-blend-difference text-paper">
      <h1 className="font-display text-[15vw] leading-[0.8] tracking-tight uppercase">
        GRAPHIC <br />
        <span className="italic pl-[10vw]">DESIGN</span>
      </h1>
      <p className="mt-8 font-ui text-sm tracking-[0.3em] uppercase opacity-70">
        SELECTED WORKS — 2026
      </p>
    </div>
  );
}
