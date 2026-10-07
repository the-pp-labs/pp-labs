"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin } from "@/components/icons/Linkedin";
import { Whatsapp } from "@/components/icons/Whatsapp";

export function Navbar() {
  const pathname = usePathname();
  if (pathname === "/start" || pathname === "/intake") return null;

  const active = pathname === "/about" ? "ABOUT" : "DESIGN";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 text-xs font-semibold tracking-widest uppercase md:px-12 md:py-8 mix-blend-difference text-paper pointer-events-none">
      {/* Left - Location */}
      <div className="flex items-center space-x-1.5 pointer-events-auto">
        <svg
          className="w-3.5 h-3.5 fill-current shrink-0 -mt-0.5"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <span className="font-semibold tracking-widest text-xs">INDIA</span>
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
      <div className="flex items-center space-x-6 pointer-events-auto">
        <a
          href="mailto:thepplabs@gmail.com"
          className="hidden sm:block lowercase hover:opacity-70 transition-opacity"
        >
          thepplabs@gmail.com
        </a>
        <a
          href="https://wa.me/447343124861?text=hello%20PP%20labs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-70 transition-opacity"
          aria-label="WhatsApp"
        >
          <Whatsapp className="w-5 h-5" />
        </a>
        <a
          href="#"
          className="hover:opacity-70 transition-opacity"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </header>
  );
}
