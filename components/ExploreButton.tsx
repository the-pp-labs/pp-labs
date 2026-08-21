"use client";

import React from "react";
import { ArrowDown } from "lucide-react";

export function ExploreButton() {
  const handleExploreClick = () => {
    // Scroll down to the end of the timeline (150vh per the ScrollStage configuration)
    window.scrollTo({
      top: window.innerHeight * 1.5,
      behavior: "smooth"
    });
  };

  return (
    <div className="explore-tab absolute bottom-full left-1/2 -translate-x-1/2 z-50">
      <button 
        onClick={handleExploreClick}
        className="flex flex-col items-center justify-start pt-4 w-[64px] h-[72px] bg-ink rounded-t-full group hover:bg-accent transition-colors duration-300 cursor-pointer pointer-events-auto outline-none"
      >
        <span className="text-[8px] tracking-widest font-bold uppercase text-paper mb-1">
          EXPLORE
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-paper animate-[arrow-loop_1.5s_infinite]" />
      </button>
    </div>
  );
}
