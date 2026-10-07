"use client";

import React from "react";
import { retroSound } from "./RetroAudio";

interface RetroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
}

export function RetroInput({
  label,
  sublabel,
  icon,
  error,
  required,
  className = "",
  value,
  onChange,
  onFocus,
  ...props
}: RetroInputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5 font-retro text-[#141811]">
      {/* Label Bar */}
      <div className="flex items-center justify-between text-[11px] sm:text-xs">
        <label className="font-bold flex items-center gap-1">
          <span>{label}</span>
          {required && <span className="text-[#A26868] font-black">*</span>}
        </label>
        {sublabel && (
          <span className="font-retro-mono text-[10px] text-[#2F3826] opacity-80">
            {sublabel}
          </span>
        )}
      </div>

      {/* Input container matching Image 2 */}
      <div
        className={`
          flex items-stretch border-[2.5px] border-[#141811] bg-[#A1AC86]
          transition-all duration-100
          ${error ? "border-[#A26868] shadow-[0_0_0_2px_#A26868]" : "focus-within:border-[#141811] focus-within:bg-[#AFB993] retro-shadow-sm"}
        `}
      >
        {/* Left Icon Square */}
        {icon && (
          <div className="flex items-center justify-center px-2.5 sm:px-3 bg-[#939E79] border-r-[2px] border-[#141811] text-[#141811] shrink-0 select-none">
            {icon}
          </div>
        )}

        {/* Input Element */}
        <input
          value={value}
          onChange={(e) => {
            onChange?.(e);
          }}
          onFocus={(e) => {
            retroSound.playBeep(980, 0.03);
            onFocus?.(e);
          }}
          className={`
            w-full bg-transparent px-3 py-2.5 font-retro-mono text-xs sm:text-sm text-[#141811] placeholder:text-[#525F43] placeholder:font-retro
            focus:outline-none uppercase tracking-wide
            ${className}
          `}
          {...props}
        />
      </div>

      {/* Retro Error Box matching Image 2 Red Box */}
      {error && (
        <div className="flex items-center gap-2 mt-1 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px] sm:text-[11px] animate-fadeIn">
          <span className="font-black">[!]</span>
          <span className="font-retro-mono">{error}</span>
        </div>
      )}
    </div>
  );
}
