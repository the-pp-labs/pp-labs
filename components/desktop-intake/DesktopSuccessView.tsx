"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DesktopWindow } from "./DesktopWindow";
import {
  CheckCircle2,
  FileText,
  MessageSquare,
  ArrowUpRight,
  Copy,
  Printer,
  Check,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

interface DesktopSuccessViewProps {
  leadData: any;
  leadSummary: string;
  onReset: () => void;
}

export function DesktopSuccessView({
  leadData,
  leadSummary,
  onReset,
}: DesktopSuccessViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(leadSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <DesktopWindow>
        {/* Celebration Header */}
        <div className="text-center py-4 sm:py-6 border-b-[2px] border-[#28331E] mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#E8F3DE] border-[2px] border-[#28331E] shadow-[3px_3px_0px_#28331E] flex items-center justify-center text-[#4B6334]">
            <CheckCircle2 className="w-7 h-7 stroke-[2]" />
          </div>
          <span className="font-mono text-xs uppercase px-2.5 py-1 bg-[#5D6D50] text-[#FAF7EE] rounded-full inline-block mb-2 font-bold">
            TRANSMISSION CONFIRMED // {leadData.id}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#28331E] tracking-tight">
            Thanks! Your enquiry has been received.
          </h1>
          <p className="text-xs sm:text-sm text-[#556346] max-w-lg mx-auto mt-2 leading-relaxed">
            We&apos;ll review your requirements and get back to you shortly to discuss your project.
          </p>
        </div>

        {/* What Happens Next? (PRD Section 11) */}
        <div className="mb-6">
          <h2 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#28331E] mb-3 flex items-center gap-2">
            <span>[ WHAT HAPPENS NEXT? ]</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                step: "01",
                title: "We review requirements",
                desc: "Our engineering and design leads inspect your scope, features, and timeline.",
                icon: <FileText className="w-4 h-4 text-[#5D6D50] stroke-[2]" />,
              },
              {
                step: "02",
                title: "We contact you",
                desc: `We'll reach out via ${leadData.preferred_contact_method || "WhatsApp/Email"} to discuss design options.`,
                icon: <MessageSquare className="w-4 h-4 text-[#5D6D50] stroke-[2]" />,
              },
              {
                step: "03",
                title: "Next steps & estimate",
                desc: "We provide wireframe concepts, timeline milestones, and full cost estimate.",
                icon: <ArrowUpRight className="w-4 h-4 text-[#5D6D50] stroke-[2]" />,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="p-3.5 rounded-xl bg-[#FFFFFF] border-[1.5px] border-[#28331E] shadow-[2px_2px_0px_rgba(40,51,30,0.12)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold bg-[#FAF7EE] border border-[#28331E] px-1.5 py-0.5 rounded">
                      PHASE {item.step}
                    </span>
                    <div className="w-6 h-6 rounded-md bg-[#FAF7EE] border border-[#28331E]/30 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#28331E] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#556346] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concise Lead Summary Dossier (PRD Section 14) */}
        <div className="rounded-xl border-[2px] border-[#28331E] bg-[#FFFFFF] p-4 sm:p-5 shadow-[3px_3px_0px_#28331E] mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#28331E]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#28331E]">
                LEAD SUMMARY DOSSIER
              </span>
              <span className="text-[10px] font-mono bg-[#EDE7DA] px-2 py-0.5 rounded border border-[#28331E]">
                PRD SEC 14
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF7EE] border border-[#28331E] text-xs font-mono font-semibold hover:bg-[#F4EFE6] cursor-pointer shadow-[1px_1px_0px_#28331E]"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#5D6D50]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Summary"}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FAF7EE] border border-[#28331E] text-xs font-mono font-semibold hover:bg-[#F4EFE6] cursor-pointer shadow-[1px_1px_0px_#28331E]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAF7EE] rounded-lg border-[1.5px] border-[#28331E] font-mono text-xs">
            <pre className="whitespace-pre-wrap leading-relaxed text-[#28331E]">
              {leadSummary}
            </pre>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#6A7859]">
            <span>Client: {leadData.full_name} ({leadData.email})</span>
            <span>Date: {leadData.submission_date} {leadData.submission_time}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EDE7DA] border-[1.5px] border-[#28331E] text-xs font-mono font-bold hover:bg-[#E5DFCE] cursor-pointer shadow-[2px_2px_0px_#28331E]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>SUBMIT ANOTHER ENQUIRY</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5D6D50] text-[#FAF7EE] border-[2px] border-[#28331E] text-xs sm:text-sm font-mono font-bold tracking-wide hover:bg-[#687B5B] cursor-pointer shadow-[3px_3px_0px_#28331E]"
          >
            <span>RETURN TO PP LABS HOME</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </DesktopWindow>
    </div>
  );
}
