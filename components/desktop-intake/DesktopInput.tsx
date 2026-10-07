"use client";

import React from "react";

interface DesktopInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
}

export function DesktopInput({
  label,
  sublabel,
  icon,
  error,
  required,
  className = "",
  value,
  onChange,
  ...props
}: DesktopInputProps) {
  return (
    <div className="w-full flex flex-col gap-1.5 text-[#28331E]">
      {/* Label Bar */}
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

      {/* Input Box */}
      <div
        className={`
          flex items-stretch rounded-xl border-[2px] border-[#28331E] bg-[#FFFFFF] overflow-hidden
          shadow-[2px_2px_0px_rgba(40,51,30,0.12)] transition-all
          ${error ? "border-[#EA7070] shadow-[0_0_0_2px_#EA7070]" : "focus-within:border-[#5D6D50] focus-within:shadow-[3px_3px_0px_#28331E]"}
        `}
      >
        {/* Left Icon Square */}
        {icon && (
          <div className="flex items-center justify-center px-3 bg-[#F4EFE6] border-r-[2px] border-[#28331E] text-sm text-[#28331E] shrink-0 select-none">
            {icon}
          </div>
        )}

        <input
          value={value}
          onChange={onChange}
          className={`
            w-full bg-transparent px-3.5 py-2.5 font-sans text-xs sm:text-sm text-[#28331E]
            placeholder:text-[#9AA589] focus:outline-none tracking-normal
            ${className}
          `}
          {...props}
        />
      </div>

      {/* Error Callout */}
      {error && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FDE8E8] border-[1.5px] border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
          <span>[!]</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
