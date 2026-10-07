"use client";

import React, { useState, useRef, useEffect } from "react";
import { retroSound } from "./RetroAudio";

interface Option {
  value: string;
  label: string;
}

interface RetroSelectProps {
  label?: string;
  sublabel?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function RetroSelect({
  label,
  sublabel,
  options,
  value,
  onChange,
  placeholder = "CHOOSE ONE",
  error,
  required,
}: RetroSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-1.5 font-retro text-[#141811] relative">
      {label && (
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
      )}

      {/* Retro Dropdown Box matching Image 2 Dropdown */}
      <button
        type="button"
        onClick={() => {
          retroSound.playClick();
          setIsOpen(!isOpen);
        }}
        className={`
          w-full flex items-center justify-between px-3 py-2.5 border-[2.5px] border-[#141811] bg-[#A1AC86]
          text-left font-retro text-xs sm:text-sm text-[#141811] select-none cursor-pointer transition-all
          ${isOpen ? "bg-[#B4BE98]" : "hover:bg-[#ACB791]"}
          ${error ? "border-[#A26868] shadow-[0_0_0_2px_#A26868]" : "retro-shadow-sm"}
        `}
      >
        <span className={selectedOption ? "font-bold tracking-wide" : "opacity-60"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="font-mono text-xs ml-2 select-none">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown Menu matching Image 2 */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 border-[2.5px] border-[#141811] bg-[#919D77] retro-shadow max-h-60 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  retroSound.playBeep(800, 0.04);
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-3 py-2 font-retro text-xs border-b border-[#141811] last:border-b-0
                  transition-colors cursor-pointer select-none
                  ${isSelected
                    ? "bg-[#141811] text-[#D1DCC0] font-bold"
                    : "text-[#141811] hover:bg-[#828D67]"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  {isSelected && <span className="text-[10px]">[SELECTED]</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 mt-1 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px] sm:text-[11px]">
          <span className="font-black">[!]</span>
          <span className="font-retro-mono">{error}</span>
        </div>
      )}
    </div>
  );
}
