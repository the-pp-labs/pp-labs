"use client";

import React from "react";
import { retroSound } from "./RetroAudio";

interface RetroTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  sublabel?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
}

export function RetroTextarea({
  label,
  sublabel,
  error,
  required,
  maxLength = 1000,
  value = "",
  onChange,
  onFocus,
  rows = 4,
  ...props
}: RetroTextareaProps) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className="w-full flex flex-col gap-1.5 font-retro text-[#141811]">
      {/* Label Bar */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs">
        <label className="font-bold flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-[#A26868] font-black">*</span>}
        </label>
        <div className="flex items-center gap-2">
          {sublabel && (
            <span className="font-retro-mono text-[10px] text-[#2F3826] opacity-80">
              {sublabel}
            </span>
          )}
          <span className="font-retro-mono text-[10px] bg-[#939E79] px-1.5 py-0.5 border border-[#141811]">
            [{currentLength}/{maxLength}]
          </span>
        </div>
      </div>

      {/* Textarea container */}
      <div
        className={`
          relative border-[2.5px] border-[#141811] bg-[#A1AC86]
          transition-all duration-100
          ${error ? "border-[#A26868] shadow-[0_0_0_2px_#A26868]" : "focus-within:border-[#141811] focus-within:bg-[#AFB993] retro-shadow-sm"}
        `}
      >
        <textarea
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          onFocus={(e) => {
            retroSound.playBeep(920, 0.03);
            onFocus?.(e);
          }}
          className="w-full bg-transparent p-3 font-retro-mono text-xs sm:text-sm text-[#141811] placeholder:text-[#525F43] placeholder:font-retro focus:outline-none resize-none leading-relaxed tracking-wide"
          {...props}
        />

        {/* Retro resize dots aesthetic matching Image 2 */}
        <div className="absolute bottom-1 right-1 pointer-events-none select-none text-[#141811] font-mono text-[9px] opacity-70">
          . :
        </div>
      </div>

      {/* Retro Error Box matching Image 2 */}
      {error && (
        <div className="flex items-center gap-2 mt-1 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px] sm:text-[11px]">
          <span className="font-black">[!]</span>
          <span className="font-retro-mono">{error}</span>
        </div>
      )}
    </div>
  );
}
