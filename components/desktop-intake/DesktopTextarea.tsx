"use client";

import React from "react";

interface DesktopTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  sublabel?: string;
  error?: string;
  required?: boolean;
  maxLength?: number;
}

export function DesktopTextarea({
  label,
  sublabel,
  error,
  required,
  maxLength = 1000,
  value = "",
  onChange,
  rows = 4,
  ...props
}: DesktopTextareaProps) {
  const currentLength = typeof value === "string" ? value.length : 0;

  return (
    <div className="w-full flex flex-col gap-1.5 text-[#28331E]">
      {/* Label Bar */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
        <label className="flex items-center gap-1 font-mono uppercase tracking-wide">
          <span>{label}</span>
          {required && <span className="text-[#EA7070] font-black">*</span>}
        </label>
        <div className="flex items-center gap-2">
          {sublabel && (
            <span className="text-[11px] font-mono text-[#6A7859] opacity-85">
              {sublabel}
            </span>
          )}
          <span className="font-mono text-[10px] bg-[#EDE7DA] px-2 py-0.5 rounded border border-[#28331E]">
            {currentLength}/{maxLength}
          </span>
        </div>
      </div>

      {/* Textarea Box */}
      <div
        className={`
          relative rounded-xl border-[2px] border-[#28331E] bg-[#FFFFFF] overflow-hidden
          shadow-[2px_2px_0px_rgba(40,51,30,0.12)] transition-all
          ${error ? "border-[#EA7070] shadow-[0_0_0_2px_#EA7070]" : "focus-within:border-[#5D6D50] focus-within:shadow-[3px_3px_0px_#28331E]"}
        `}
      >
        <textarea
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent p-3.5 font-sans text-xs sm:text-sm text-[#28331E] placeholder:text-[#9AA589] focus:outline-none resize-none leading-relaxed"
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
