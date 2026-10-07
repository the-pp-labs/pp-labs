"use client";

import React, { useState } from "react";
import Link from "next/link";
import { retroSound } from "./RetroAudio";

interface SubmissionSuccessViewProps {
  leadData: any;
  leadSummary: string;
  onReset: () => void;
}

export function SubmissionSuccessView({
  leadData,
  leadSummary,
  onReset,
}: SubmissionSuccessViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    retroSound.playBeep(1100, 0.05);
    navigator.clipboard.writeText(leadSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    retroSound.playClick();
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 font-retro text-[#141811] animate-fadeIn pb-12">
      {/* Top Retro Alert Banner */}
      <div className="border-[3px] border-[#141811] bg-[#141811] text-[#D1DCC0] p-4 retro-shadow">
        <div className="flex items-center justify-between text-[10px] sm:text-xs mb-2 border-b border-[#313926] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#5A7788] inline-block animate-ping" />
            <span className="font-bold tracking-wider">
              TRANSMISSION STATUS: 200 OK // CONFIRMED
            </span>
          </div>
          <span className="font-retro-mono opacity-80">REF: {leadData.id}</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#E8EFE0] my-2">
          Thanks! Your enquiry has been received.
        </h1>
        <p className="font-retro-mono text-xs sm:text-sm text-[#A1AC86] leading-relaxed">
          We&apos;ll review your requirements and get back to you shortly to discuss your project.
        </p>
      </div>

      {/* What Happens Next? (PRD Section 11) */}
      <div className="border-[2.5px] border-[#141811] bg-[#98A37C] p-4 sm:p-5 retro-shadow-sm">
        <h2 className="font-bold text-sm sm:text-base mb-3 flex items-center gap-2">
          <span>[ WHAT HAPPENS NEXT? ]</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              step: "01",
              title: "We review your requirements",
              desc: "Our engineering and design leads inspect your scope, features, and timeline.",
            },
            {
              step: "02",
              title: "We contact you",
              desc: `We'll reach out via ${leadData.preferred_contact_method || "WhatsApp/Email"} to discuss design options.`,
            },
            {
              step: "03",
              title: "Next steps / estimate",
              desc: "We share a detailed proposal, wireframe concept, and project roadmap.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-3 bg-[#8B966F] border-[2px] border-[#141811] flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-black bg-[#141811] text-[#D1DCC0] px-1.5 py-0.5 inline-block mb-2">
                  PHASE {item.step}
                </span>
                <h3 className="font-bold text-xs mb-1">{item.title}</h3>
                <p className="font-retro-mono text-[11px] leading-relaxed opacity-85">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concise Lead Summary Dossier (PRD Section 14) */}
      <div className="border-[2.5px] border-[#141811] bg-[#A1AC86] p-4 sm:p-5 retro-shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b-[2px] border-[#141811]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black">LEAD SUMMARY DOSSIER</span>
            <span className="text-[10px] font-retro-mono bg-[#8B966F] px-1.5 py-0.5 border border-[#141811]">
              [PRD SEC 14]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="retro-pressable px-2.5 py-1 bg-[#828D67] border border-[#141811] text-[10px] font-bold cursor-pointer hover:bg-[#8F9A72]"
            >
              {copied ? "[✓ COPIED!]" : "[COPY SUMMARY]"}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="retro-pressable px-2.5 py-1 bg-[#828D67] border border-[#141811] text-[10px] font-bold cursor-pointer hover:bg-[#8F9A72]"
            >
              [PRINT / PDF]
            </button>
          </div>
        </div>

        {/* Formatted Lead Summary Receipt */}
        <div className="p-3.5 bg-[#8F9975] border-[2px] border-[#141811] font-retro-mono text-xs">
          <pre className="whitespace-pre-wrap leading-relaxed text-[#141811]">
            {leadSummary}
          </pre>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between text-[10px] font-retro-mono opacity-80">
          <span>Client: {leadData.full_name} ({leadData.email})</span>
          <span>Submitted: {leadData.submission_date} {leadData.submission_time}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => {
            retroSound.playClick();
            onReset();
          }}
          className="retro-pressable px-4 py-2.5 bg-[#828D67] border-[2px] border-[#141811] font-retro text-xs font-bold hover:bg-[#8E9973] cursor-pointer"
        >
          ← SUBMIT ANOTHER ENQUIRY
        </button>

        <Link
          href="/"
          onClick={() => retroSound.playClick()}
          className="retro-pressable px-6 py-2.5 bg-[#141811] text-[#D1DCC0] border-[2px] border-[#141811] font-retro text-xs sm:text-sm font-bold tracking-wider hover:bg-[#20271b] cursor-pointer"
        >
          RETURN TO PP LABS HOME →
        </Link>
      </div>
    </div>
  );
}
