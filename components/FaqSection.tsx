"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How long does a website take?",
    answer: "Most websites take around 2–4 weeks from kickoff to launch, depending on the scope, number of pages, content, and feedback cycles. Smaller projects can move faster, while larger builds may need more time."
  },
  {
    question: "How do payments work?",
    answer: "Projects are typically split into clear payment stages so everything stays straightforward. We confirm the scope and payment schedule before work begins, so you always know what is due and when."
  },
  {
    question: "How many revisions are included?",
    answer: "Revisions are included during the design and build process so we can refine the work together. The exact number depends on the project scope and is agreed on before we start."
  },
  {
    question: "Do you help with domains and hosting?",
    answer: "Yes. We can help you choose a domain, set up hosting, connect everything correctly, and get the website ready for launch. If you already have hosting and a domain, we can work with your existing setup."
  },
  {
    question: "What happens after launch?",
    answer: "Launch is not the end of the process. We make sure the website is working correctly, help with any immediate issues, and can continue supporting updates, improvements, and future changes when needed."
  },
  {
    question: "What counts as a small edit?",
    answer: "Small edits are simple content or visual changes such as adjusting text, replacing an image, changing a color, or making minor spacing adjustments. Larger structural changes or new sections are treated separately."
  },
  {
    question: "Do you only build for creatives?",
    answer: "No. We work with different types of businesses and ideas. Whether you're a creative, founder, startup, personal brand, or established business, the goal is to build a website that fits what you're trying to become."
  },
  {
    question: "What is the 7 day confidence guarantee?",
    answer: "You should feel confident about what you're investing in. The 7 day confidence guarantee gives you a defined window after delivery to raise concerns and make sure the final website meets the agreed expectations."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const midpoint = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, midpoint);
  const rightFaqs = faqs.slice(midpoint);

  return (
    <div className="relative w-full h-full py-20 md:py-28 px-4 md:px-8 lg:px-12 bg-[#F1EFE7] text-black overflow-y-auto overflow-x-hidden">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 w-full h-full opacity-100 z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/faq-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col items-center">
        
        {/* Header Block */}
        <div className="w-full flex flex-col items-start mb-12 md:mb-16 pl-2">
          <span className="font-ui text-[9px] md:text-[10px] font-medium tracking-widest uppercase mb-4 text-black/60">
            FAQ
          </span>
          
          <h2 className="font-sans font-black text-[15vw] md:text-[12vw] lg:text-[150px] xl:text-[160px] leading-[0.85] tracking-[-0.04em] text-black mb-5 uppercase">
            HAVE QUESTIONS?
          </h2>
          
          <p className="font-ui text-[13px] md:text-sm lg:text-base font-medium text-black/90 max-w-2xl tracking-wide">
            Alright nerd. Here are the things people usually ask before we build.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="w-full flex flex-col lg:flex-row gap-3 md:gap-4 lg:gap-6 pb-12">
          
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-3 md:gap-4">
            {leftFaqs.map((faq, i) => {
              const actualIdx = i;
              const isOpen = openIndex === actualIdx;
              
              return (
                <button
                  key={i}
                  onClick={() => toggleOpen(actualIdx)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex flex-col px-6 md:px-8 py-4 md:py-5 bg-white/40 border border-black/5 rounded-[20px] hover:bg-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-full flex justify-between items-center gap-4">
                    <span className="font-sans font-black text-[13px] md:text-[15px] text-black pr-4 leading-tight tracking-tight">
                      {faq.question}
                    </span>
                    <span className="shrink-0 font-sans font-black text-lg md:text-xl text-black transition-transform duration-300">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 font-ui text-[12px] md:text-[14px] text-black/80 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-3 md:gap-4">
            {rightFaqs.map((faq, i) => {
              const actualIdx = i + midpoint;
              const isOpen = openIndex === actualIdx;
              
              return (
                <button
                  key={i}
                  onClick={() => toggleOpen(actualIdx)}
                  aria-expanded={isOpen}
                  className="w-full text-left flex flex-col px-6 md:px-8 py-4 md:py-5 bg-white/40 border border-black/5 rounded-[20px] hover:bg-white/60 transition-colors focus:outline-none focus:ring-2 focus:ring-black/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="w-full flex justify-between items-center gap-4">
                    <span className="font-sans font-black text-[13px] md:text-[15px] text-black pr-4 leading-tight tracking-tight">
                      {faq.question}
                    </span>
                    <span className="shrink-0 font-sans font-black text-lg md:text-xl text-black transition-transform duration-300">
                      {isOpen ? "−" : "+"}
                    </span>
                  </div>
                  
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 font-ui text-[12px] md:text-[14px] text-black/80 leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
