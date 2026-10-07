"use client";

import React from "react";
import { Check } from "lucide-react";

interface DesktopTabsProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
  maxStepReached: number;
  onSelectStep: (step: number) => void;
}

export function DesktopTabs({
  currentStep,
  totalSteps,
  stepNames,
  maxStepReached,
  onSelectStep,
}: DesktopTabsProps) {
  return (
    <div className="w-full mb-6 select-none">
      {/* OS Folder Tab Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 border-b-[2.5px] border-[#28331E]">
        {stepNames.map((name, idx) => {
          const stepNum = idx + 1;
          const isActive = currentStep === stepNum;
          const isAccessible = stepNum <= maxStepReached;
          const isCompleted = stepNum < currentStep;

          return (
            <button
              key={name}
              type="button"
              disabled={!isAccessible}
              onClick={() => {
                if (isAccessible && !isActive) {
                  onSelectStep(stepNum);
                }
              }}
              className={`
                relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-xl font-mono text-xs sm:text-sm font-bold tracking-tight
                border-t-[2px] border-x-[2px] border-[#28331E] transition-all whitespace-nowrap cursor-pointer -mb-[2.5px]
                ${isActive
                  ? "bg-[#FAF7EE] text-[#28331E] shadow-[0_-2px_0px_#FAF7EE] z-10 border-b-transparent"
                  : isAccessible
                    ? "bg-[#E6DFCE] text-[#556346] hover:bg-[#EDE7D9] z-0"
                    : "bg-[#D8D1BE] text-[#8C987D] cursor-not-allowed opacity-60 z-0"
                }
              `}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`
                    w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-sans
                    ${isActive
                      ? "bg-[#5D6D50] text-[#FAF7EE]"
                      : isCompleted
                        ? "bg-[#28331E] text-white"
                        : "bg-[#B8C2A8] text-[#28331E]"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : stepNum}
                </span>
                <span>{name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
