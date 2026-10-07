"use client";

import React from "react";

interface DesktopWindowProps {
  pathTitle?: string;
  title?: string;
  children: React.ReactNode;
  showPeachAccent?: boolean;
  className?: string;
}

export function DesktopWindow({
  pathTitle,
  title,
  children,
  showPeachAccent = true,
  className = "",
}: DesktopWindowProps) {
  return (
    <div
      className={`
        w-full desktop-window bg-[#FAF7EE] border-[2.5px] border-[#28331E]
        rounded-[18px] shadow-[4px_6px_0px_#28331E] overflow-hidden
        ${className}
      `}
    >
      {/* Clean Window Title Bar (No paths, No X mark) */}
      <div className="bg-[#5D6D50] border-b-[2.5px] border-[#28331E] px-4 py-2 flex items-center select-none h-7">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#3D4734] border border-[#28331E]/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3D4734] border border-[#28331E]/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#3D4734] border border-[#28331E]/40" />
        </div>
      </div>

      {/* Peach / Orange Header Accent Ribbon */}
      {showPeachAccent && (
        <div className="w-full h-3 sm:h-3.5 bg-[#F3A775] border-b-[2px] border-[#28331E]" />
      )}

      {/* Window Interior Content */}
      <div className="p-4 sm:p-7 text-[#28331E]">{children}</div>
    </div>
  );
}
