"use client";

import React from "react";
import { retroSound } from "./RetroAudio";

interface RetroCheckboxProps {
  label: string;
  sublabel?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function RetroCheckbox({
  label,
  sublabel,
  checked,
  onChange,
  disabled = false,
}: RetroCheckboxProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          retroSound.playClick();
          onChange(!checked);
        }
      }}
      className={`
        w-full flex items-center justify-between gap-3 p-2 sm:p-2.5 border-[2px] border-[#141811] text-left select-none cursor-pointer
        transition-all duration-75
        ${checked
          ? "bg-[#9FB089] text-[#141811] retro-shadow-sm"
          : "bg-[#919D77] text-[#141811] hover:bg-[#9CA881]"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "retro-pressable"}
      `}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Retro Square Checkbox matching Image 2 Chekbox buttons */}
        <div
          className={`
            w-4 h-4 border-[2px] border-[#141811] flex items-center justify-center shrink-0
            ${checked ? "bg-[#141811]" : "bg-[#A1AC86]"}
          `}
        >
          {checked && <div className="w-2 h-2 bg-[#D1DCC0]" />}
        </div>

        <span className="font-retro text-xs sm:text-[13px] font-bold tracking-wide truncate">
          {label}
        </span>
      </div>

      {sublabel && (
        <span className="font-retro-mono text-[10px] text-[#293321] opacity-75 shrink-0">
          {sublabel}
        </span>
      )}
    </button>
  );
}

interface RetroRadioProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function RetroRadio({
  label,
  sublabel,
  selected,
  onSelect,
  disabled = false,
}: RetroRadioProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          retroSound.playClick();
          onSelect();
        }
      }}
      className={`
        w-full flex items-center justify-between gap-3 p-2 sm:p-2.5 border-[2px] border-[#141811] text-left select-none cursor-pointer
        transition-all duration-75
        ${selected
          ? "bg-[#5A7788] text-[#E8EFE0] retro-shadow-sm"
          : "bg-[#919D77] text-[#141811] hover:bg-[#9CA881]"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "retro-pressable"}
      `}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Retro Radio box matching Image 2 Radio buttons */}
        <div
          className={`
            w-4 h-4 border-[2px] border-[#141811] flex items-center justify-center shrink-0
            ${selected ? "bg-[#141811]" : "bg-[#A1AC86]"}
          `}
        >
          {selected && <div className="w-1.5 h-1.5 bg-[#D1DCC0] rounded-[1px]" />}
        </div>

        <span className="font-retro text-xs sm:text-[13px] font-bold tracking-wide truncate">
          {label}
        </span>
      </div>

      {sublabel && (
        <span
          className={`font-retro-mono text-[10px] shrink-0 ${
            selected ? "text-[#E8EFE0] opacity-90" : "text-[#293321] opacity-75"
          }`}
        >
          {sublabel}
        </span>
      )}
    </button>
  );
}
