"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin } from "@/components/icons/Linkedin";

export function Navbar() {
  const pathname = usePathname();
  const active = pathname === "/about" ? "ABOUT" : "DESIGN";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 text-xs font-semibold tracking-widest uppercase md:px-12 md:py-8 mix-blend-difference text-paper pointer-events-none">
      {/* Left */}
      <div className="flex items-center space-x-2 pointer-events-auto">
        <div className="w-4 h-4 bg-paper rounded-full" />
        <span className="hidden sm:block">MUMBAI, INDIA</span>
      </div>

      {/* Center - Sliding Tabs */}
      <nav className="relative flex border border-paper/20 rounded-full p-1 backdrop-blur-md pointer-events-auto">
        {/* Sliding Pill Background */}
        <div
          className="absolute top-1 bottom-1 w-[80px] sm:w-[90px] bg-paper rounded-full transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
          style={{ transform: active === "DESIGN" ? "translateX(0)" : "translateX(100%)" }}
        />

        <Link
          href="/"
          className={`relative z-10 w-[80px] sm:w-[90px] py-2 flex items-center justify-center rounded-full transition-colors duration-300 ${active === "DESIGN" ? "text-ink" : "text-paper hover:opacity-70"
            }`}
        >
          DESIGN
        </Link>
        <Link
          href="/about"
          className={`relative z-10 w-[80px] sm:w-[90px] py-2 flex items-center justify-center rounded-full transition-colors duration-300 ${active === "ABOUT" ? "text-ink" : "text-paper hover:opacity-70"
            }`}
        >
          ABOUT
        </Link>
      </nav>

      {/* Right */}
      <div className="flex items-center space-x-6">
        <a
          href="mailto:hello@example.com"
          className="hidden sm:block hover:opacity-70 transition-opacity"
        >
          HELLO@EXAMPLE.COM
        </a>
        <a href="#" className="hover:opacity-70 transition-opacity">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
}
