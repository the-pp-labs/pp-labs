"use client";

import React from "react";
import { Check } from "lucide-react";

interface DesktopCheckboxProps {
  label: string;
  sublabel?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function DesktopCheckbox({
  label,
  sublabel,
  checked,
  onChange,
  disabled = false,
}: DesktopCheckboxProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border-[1.5px] border-[#28331E] text-left select-none cursor-pointer
        transition-all duration-100
        ${checked
          ? "bg-[#F7F2E6] shadow-[2px_2px_0px_#5D6D50] border-[#5D6D50]"
          : "bg-[#FFFFFF] shadow-[1px_1px_0px_rgba(40,51,30,0.1)] hover:bg-[#FAF7F0]"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Checkbox Squircle */}
        <div
          className={`
            w-4 h-4 rounded-md border-[1.5px] border-[#28331E] flex items-center justify-center shrink-0
            ${checked ? "bg-[#5D6D50] text-white" : "bg-[#F4EFE6]"}
          `}
        >
          {checked && <Check className="w-2.5 h-2.5 stroke-[3] text-white" />}
        </div>

        <span className="font-sans text-xs sm:text-sm font-semibold text-[#28331E] truncate">
          {label}
        </span>
      </div>

      {sublabel && (
        <span className="font-mono text-[10px] text-[#6A7859] opacity-80 shrink-0">
          {sublabel}
        </span>
      )}
    </button>
  );
}

interface DesktopRadioProps {
  label: string;
  sublabel?: string;
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function DesktopRadio({
  label,
  sublabel,
  selected,
  onSelect,
  disabled = false,
}: DesktopRadioProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onSelect()}
      className={`
        w-full flex items-center justify-between gap-3 p-2.5 sm:p-3 rounded-xl border-[1.5px] border-[#28331E] text-left select-none cursor-pointer
        transition-all duration-100
        ${selected
          ? "bg-[#F7F2E6] shadow-[2px_2px_0px_#5D6D50] border-[#5D6D50]"
          : "bg-[#FFFFFF] shadow-[1px_1px_0px_rgba(40,51,30,0.1)] hover:bg-[#FAF7F0]"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Radio Circle */}
        <div
          className={`
            w-4 h-4 rounded-full border-[1.5px] border-[#28331E] flex items-center justify-center shrink-0
            ${selected ? "bg-[#5D6D50]" : "bg-[#F4EFE6]"}
          `}
        >
          {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
        </div>

        <span className="font-sans text-xs sm:text-sm font-semibold text-[#28331E] truncate">
          {label}
        </span>
      </div>

      {sublabel && (
        <span className="font-mono text-[10px] text-[#6A7859] opacity-80 shrink-0">
          {sublabel}
        </span>
      )}
    </button>
  );
}
