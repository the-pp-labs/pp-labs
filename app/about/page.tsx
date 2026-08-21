"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.main 
      initial={{ opacity: 0, filter: "blur(10px)", scale: 0.99 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
    >
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/about-bg.jpeg"
          alt="About Background"
          fill
          className="object-cover object-center pointer-events-none opacity-80"
          priority
        />
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-4 text-center max-w-5xl mx-auto mix-blend-plus-lighter">
        <span className="text-[10px] md:text-xs font-ui tracking-[0.3em] uppercase text-paper/60 mb-6">
          PP LABS
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[5.5rem] font-ui font-bold leading-[1.1] md:leading-[1.05] tracking-[-0.02em] mb-8 text-paper/85 whitespace-nowrap">
          The two dudes<br />
          behind the PP labs.
        </h1>
        <p className="text-xs md:text-base lg:text-lg font-ui text-paper/70 max-w-2xl leading-relaxed">
          Before the labs and everything, it was two mates figuring out how to make websites that felt less dead. This is the bit where the labs gets a face.
        </p>
      </div>
    </motion.main>
  );
}
