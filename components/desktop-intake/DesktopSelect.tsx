"use client";

import React, { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface DesktopSelectProps {
  label?: string;
  sublabel?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export function DesktopSelect({
  label,
  sublabel,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  error,
  required,
}: DesktopSelectProps) {
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
    <div ref={containerRef} className="w-full flex flex-col gap-1.5 text-[#28331E] relative">
      {label && (
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
          <label className="flex items-center gap-1 font-mono uppercase tracking-wide">
            <span>{label}</span>
            {required && <span className="text-[#EA7070] font-black">*</span>}
          </label>
          {sublabel && (
            <span className="text-[11px] font-mono text-[#6A7859] opacity-85">
              {sublabel}
            </span>
          )}
        </div>
      )}

      {/* Select Box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-[2px] border-[#28331E] bg-[#FFFFFF]
          text-left font-sans text-xs sm:text-sm text-[#28331E] select-none cursor-pointer transition-all
          ${isOpen ? "shadow-[3px_3px_0px_#28331E] border-[#5D6D50]" : "shadow-[2px_2px_0px_rgba(40,51,30,0.12)] hover:bg-[#FAF7EE]"}
          ${error ? "border-[#EA7070] shadow-[0_0_0_2px_#EA7070]" : ""}
        `}
      >
        <span className={selectedOption ? "font-medium" : "text-[#9AA589]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="text-xs font-mono ml-2 text-[#5D6D50]">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full z-50 rounded-xl border-[2px] border-[#28331E] bg-[#FFFFFF] shadow-[4px_6px_0px_#28331E] max-h-60 overflow-y-auto divide-y divide-[#EDE7DA]">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-3.5 py-2.5 font-sans text-xs sm:text-sm transition-colors cursor-pointer select-none
                  ${isSelected
                    ? "bg-[#F7F2E6] text-[#28331E] font-bold"
                    : "text-[#28331E] hover:bg-[#FAF7EE]"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#5D6D50] stroke-[2.5]" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FDE8E8] border-[1.5px] border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
          <span>[!]</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
