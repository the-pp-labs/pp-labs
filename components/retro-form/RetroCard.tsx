"use client";

import React from "react";
import { retroSound } from "./RetroAudio";

interface RetroCardProps {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  isMulti?: boolean;
}

export function RetroCard({
  label,
  description,
  icon,
  selected,
  onClick,
  isMulti = false,
}: RetroCardProps) {
  return (
    <button
      type="button"
      onClick={() => {
        retroSound.playClick();
        onClick();
      }}
      className={`
        relative text-left p-3 sm:p-3.5 border-[2.5px] border-[#141811] transition-all duration-100 select-none cursor-pointer
        ${selected
          ? "bg-[#5A7788] text-[#E8EFE0] retro-shadow"
          : "bg-[#98A37C] text-[#141811] hover:bg-[#A3AE87] retro-shadow-sm"
        }
        retro-pressable
      `}
    >
      {/* Top Header with Indicator */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className={`
                w-6 h-6 flex items-center justify-center border-[1.5px] border-[#141811] text-xs font-black
                ${selected ? "bg-[#141811] text-[#E8EFE0]" : "bg-[#8E9973] text-[#141811]"}
              `}
            >
              {icon}
            </div>
          )}
          <span className="font-retro text-xs sm:text-sm font-bold tracking-wide">
            {label}
          </span>
        </div>

        {/* Retro Box Indicator matching Image 2 */}
        <div
          className={`
            w-4 h-4 border-[2px] border-[#141811] flex items-center justify-center shrink-0 mt-0.5
            ${selected ? "bg-[#141811]" : "bg-[#A1AC86]"}
          `}
        >
          {selected && (
            isMulti ? (
              // Retro Checkbox filled square
              <div className="w-2 h-2 bg-[#D1DCC0]" />
            ) : (
              // Retro Radio inner dot
              <div className="w-1.5 h-1.5 bg-[#D1DCC0] rounded-[1px]" />
            )
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p
          className={`
            font-retro-mono text-[10px] sm:text-[11px] leading-relaxed
            ${selected ? "text-[#E8EFE0] opacity-90" : "text-[#27301F] opacity-80"}
          `}
        >
          {description}
        </p>
      )}
    </button>
  );
}
