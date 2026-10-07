"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { retroSound } from "./RetroAudio";

interface RetroHeaderProps {
  crtActive: boolean;
  onToggleCrt: () => void;
  onOpenAdmin: () => void;
}

export function RetroHeader({ crtActive, onToggleCrt, onOpenAdmin }: RetroHeaderProps) {
  const [soundOn, setSoundOn] = useState(true);
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    setSoundOn(retroSound.enabled);
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const newState = retroSound.toggle();
    setSoundOn(newState);
  };

  return (
    <header className="w-full bg-[#828D67] border-b-[2.5px] border-[#141811] px-4 py-2.5 font-retro text-[10px] sm:text-xs text-[#141811] select-none sticky top-0 z-40">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Studio & Terminal Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold tracking-wider">
            <span className="inline-block w-2.5 h-2.5 bg-[#141811] animate-pulse" />
            <span>PP-LABS</span>
            <span className="opacity-60">// TERMINAL v2.4</span>
          </div>
          <span className="hidden md:inline-block px-1.5 py-0.5 bg-[#96A17C] border border-[#141811] text-[9px]">
            SYS_CLK: {timeStr || "--:--:--"}
          </span>
        </div>

        {/* Center: System Status */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="px-2 py-0.5 bg-[#5A7788] text-[#D1DCC0] border border-[#141811] font-bold tracking-wide">
            PORT: 3000 [ONLINE]
          </span>
          <span className="opacity-80">MUMBAI INTAKE NODE</span>
        </div>

        {/* Right: Controls & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className="retro-pressable px-2 py-1 bg-[#98A37C] border border-[#141811] text-[#141811] text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            title="Toggle Retro 8-bit Audio Effects"
          >
            <span>SFX:</span>
            <span className={soundOn ? "text-[#141811] font-black underline" : "opacity-40"}>
              {soundOn ? "ON" : "OFF"}
            </span>
          </button>

          {/* CRT Scanline Filter Toggle */}
          <button
            type="button"
            onClick={() => {
              retroSound.playClick();
              onToggleCrt();
            }}
            className="retro-pressable px-2 py-1 bg-[#98A37C] border border-[#141811] text-[#141811] text-[9px] sm:text-[10px] font-bold flex items-center gap-1 cursor-pointer"
            title="Toggle Retro CRT Scanline Overlay"
          >
            <span>CRT:</span>
            <span className={crtActive ? "text-[#141811] font-black underline" : "opacity-40"}>
              {crtActive ? "ON" : "OFF"}
            </span>
          </button>

          {/* Admin Leads Dossier */}
          <button
            type="button"
            onClick={() => {
              retroSound.playBeep(900, 0.05);
              onOpenAdmin();
            }}
            className="retro-pressable px-2.5 py-1 bg-[#5A7788] text-[#D1DCC0] border border-[#141811] text-[9px] sm:text-[10px] font-bold cursor-pointer"
            title="Open Agency Leads Manager (PRD Section 13)"
          >
            DOSSIER
          </button>

          {/* Exit / Return to Main Website */}
          <Link
            href="/"
            onClick={() => retroSound.playClick()}
            className="retro-pressable px-2.5 py-1 bg-[#A26868] text-[#141811] border border-[#141811] text-[9px] sm:text-[10px] font-bold hover:bg-[#b07070] cursor-pointer"
            title="Return to Agency Main Website"
          >
            EXIT ✕
          </Link>
        </div>
      </div>
    </header>
  );
}
