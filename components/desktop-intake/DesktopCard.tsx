"use client";

import React from "react";
import { Check } from "lucide-react";

interface DesktopCardProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  isMulti?: boolean;
}

export function DesktopCard({
  label,
  description,
  icon,
  selected,
  onClick,
  isMulti = false,
}: DesktopCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative text-left p-3.5 sm:p-4 rounded-xl border-[2px] transition-all duration-120 cursor-pointer select-none
        ${selected
          ? "bg-[#F7F2E6] border-[#5D6D50] shadow-[3px_3px_0px_#5D6D50] translate-y-[-1px]"
          : "bg-[#FFFFFF] border-[#28331E] shadow-[2px_2px_0px_rgba(40,51,30,0.12)] hover:shadow-[3px_3px_0px_#28331E] hover:translate-y-[-1px]"
        }
      `}
    >
      {/* Top Header with Icon and Indicator */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div
              className={`
                w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold border-[1.5px] border-[#28331E]
                ${selected ? "bg-[#5D6D50] text-[#FAF7EE]" : "bg-[#EDE7DA] text-[#28331E]"}
              `}
            >
              {icon}
            </div>
          )}
          <span className="font-mono text-xs sm:text-sm font-bold text-[#28331E]">
            {label}
          </span>
        </div>

        {/* Selected Badge */}
        <div
          className={`
            w-4 h-4 rounded-full border-[1.5px] border-[#28331E] flex items-center justify-center shrink-0 mt-0.5
            ${selected ? "bg-[#5D6D50] text-white" : "bg-[#F4EFE6]"}
          `}
        >
          {selected && (
            <Check className="w-2.5 h-2.5 stroke-[3] text-white" />
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="font-sans text-[11px] sm:text-xs text-[#526043] leading-relaxed">
          {description}
        </p>
      )}
    </button>
  );
}
