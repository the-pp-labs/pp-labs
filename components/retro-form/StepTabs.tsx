"use client";

import React from "react";
import { retroSound } from "./RetroAudio";

interface StepTabsProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
  maxStepReached: number;
  onSelectStep: (step: number) => void;
}

export function StepTabs({
  currentStep,
  totalSteps,
  stepNames,
  maxStepReached,
  onSelectStep,
}: StepTabsProps) {
  return (
    <div className="w-full select-none">
      {/* Progress Line & Breadcrumb */}
      <div className="flex items-center justify-between font-retro text-[10px] sm:text-xs text-[#141811] mb-2 px-1">
        <span className="font-bold tracking-wider">
          PHASE: 0{currentStep} // 0{totalSteps}
        </span>
        <span className="font-retro-mono text-[10px] tracking-widest text-[#242b1f] uppercase">
          {stepNames[currentStep - 1]}
        </span>
      </div>

      {/* Segmented Retro Tabs matching Image 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-[2.5px] border-[#141811] bg-[#828D67] retro-shadow-sm overflow-hidden">
        {stepNames.map((name, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isPassed = stepNum < currentStep;
          const isAccessible = stepNum <= maxStepReached;

          return (
            <button
              key={name}
              type="button"
              disabled={!isAccessible}
              onClick={() => {
                if (isAccessible && !isActive) {
                  retroSound.playBeep(650, 0.04);
                  onSelectStep(stepNum);
                }
              }}
              className={`
                relative py-2.5 px-2 md:px-3 text-center font-retro text-[9px] sm:text-[11px] font-bold tracking-wider uppercase transition-colors
                border-r-[2px] last:border-r-0 md:last:border-r-0 border-b-[2px] md:border-b-0 border-[#141811]
                ${isActive
                  ? "bg-[#141811] text-[#D1DCC0] cursor-default"
                  : isAccessible
                    ? "bg-[#98A37C] text-[#141811] hover:bg-[#A3AE87] cursor-pointer"
                    : "bg-[#8A956F] text-[#4F5B40] cursor-not-allowed opacity-75"
                }
              `}
            >
              <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                <span>0{stepNum}</span>
                <span className="hidden sm:inline-block">.</span>
                <span className="truncate">{name}</span>
                {isPassed && (
                  <span className="inline-block text-[10px] text-[#5A7788] font-black">
                    [✓]
                  </span>
                )}
                {isActive && (
                  <span className="inline-block w-1.5 h-1.5 bg-[#5A7788] animate-ping ml-0.5" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
