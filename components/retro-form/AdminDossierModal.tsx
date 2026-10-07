"use client";

import React, { useState, useEffect } from "react";
import { retroSound } from "./RetroAudio";

interface Lead {
  id: string;
  created_at: string;
  submission_date: string;
  submission_time: string;
  lead_status: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  preferred_contact_method: string;
  website_type: string;
  website_purpose: string[];
  website_purpose_other?: string;
  has_existing_website: string;
  existing_website_url?: string;
  business_description: string;
  required_features: string[];
  required_features_other?: string;
  design_preferences: string[];
  design_reference_urls?: string;
  branding_assets: string[];
  content_status: string;
  budget_range: string;
  timeline: string;
  has_domain: string;
  has_hosting: string;
  needs_hosting_help: string;
  additional_information?: string;
  lead_source?: string;
  contact_permission: boolean;
  summary: string;
}

const STATUS_OPTIONS = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Won",
  "Lost",
];

interface AdminDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDossierModal({ isOpen, onClose }: AdminDossierModalProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        if (data.leads.length > 0 && !selectedLead) {
          setSelectedLead(data.leads[0]);
        }
      }
    } catch (err) {
      console.error("Failed to load leads", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  const handleUpdateStatus = async (leadId: string, newStatus: string) => {
    try {
      setUpdatingId(leadId);
      retroSound.playBeep(700, 0.05);
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, lead_status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, lead_status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (!isOpen) return null;

  const filteredLeads = leads.filter((lead) => {
    const matchesFilter =
      statusFilter === "ALL" ||
      lead.lead_status.toLowerCase() === statusFilter.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      lead.full_name?.toLowerCase().includes(query) ||
      lead.business_name?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.website_type?.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#8B966F] border-[3px] border-[#141811] retro-shadow flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#141811] text-[#D1DCC0] px-4 py-2.5 flex items-center justify-between font-retro select-none shrink-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="w-2.5 h-2.5 bg-[#5A7788] inline-block" />
            <span className="font-bold tracking-wider">
              PP LABS // AGENCY LEAD MANAGEMENT DOSSIER
            </span>
            <span className="hidden sm:inline-block text-[10px] opacity-75">
              [PRD SEC 13]
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              retroSound.playClick();
              onClose();
            }}
            className="px-2 py-0.5 bg-[#A26868] text-[#141811] text-[10px] font-bold hover:bg-[#b07474] retro-pressable"
          >
            ✕ CLOSE [ESC]
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 bg-[#828D67] border-b-[2px] border-[#141811] flex flex-wrap items-center justify-between gap-3 font-retro shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <span className="text-xs font-bold text-[#141811]">SEARCH:</span>
            <input
              type="text"
              placeholder="SEARCH BY NAME, CLIENT, EMAIL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#A1AC86] border-[2px] border-[#141811] px-2.5 py-1 text-xs font-retro-mono text-[#141811] placeholder:text-[#525F43] focus:outline-none uppercase"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto text-[10px]">
            {["ALL", "NEW", "QUALIFIED", "PROPOSAL SENT", "WON", "LOST"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  retroSound.playBeep(750, 0.03);
                  setStatusFilter(st);
                }}
                className={`
                  px-2 py-1 border border-[#141811] font-bold uppercase transition-colors
                  ${statusFilter === st
                    ? "bg-[#141811] text-[#D1DCC0]"
                    : "bg-[#98A37C] text-[#141811] hover:bg-[#A3AE87]"
                  }
                `}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Split Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-[#8B966F]">
          {/* Left Table / List */}
          <div className="md:col-span-6 lg:col-span-5 border-b md:border-b-0 md:border-r-[2px] border-[#141811] overflow-y-auto max-h-[380px] md:max-h-none">
            {loading ? (
              <div className="p-8 text-center font-retro text-xs text-[#141811]">
                [ SCANNING DATA BANKS... ]
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-8 text-center font-retro text-xs text-[#141811]">
                NO LEADS FOUND MATCHING FILTER
              </div>
            ) : (
              <div className="divide-y-[1.5px] divide-[#141811]">
                {filteredLeads.map((lead) => {
                  const isSelected = selectedLead?.id === lead.id;
                  return (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => {
                        retroSound.playClick();
                        setSelectedLead(lead);
                      }}
                      className={`
                        w-full text-left p-3 font-retro transition-colors cursor-pointer select-none
                        ${isSelected
                          ? "bg-[#5A7788] text-[#E8EFE0]"
                          : "bg-[#919D77] text-[#141811] hover:bg-[#9CA881]"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-retro-mono opacity-80">{lead.id}</span>
                        <span
                          className={`
                            px-1.5 py-0.5 border border-[#141811] text-[9px] font-bold uppercase
                            ${lead.lead_status === "New"
                              ? "bg-[#D1DCC0] text-[#141811]"
                              : lead.lead_status === "Won"
                                ? "bg-[#8BC34A] text-[#141811]"
                                : lead.lead_status === "Lost"
                                  ? "bg-[#A26868] text-[#141811]"
                                  : "bg-[#828D67] text-[#D1DCC0]"
                            }
                          `}
                        >
                          {lead.lead_status}
                        </span>
                      </div>
                      <div className="font-bold text-xs truncate">
                        {lead.full_name}
                        {lead.business_name && (
                          <span className="opacity-80 font-normal">
                            {" "}
                            // {lead.business_name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-retro-mono mt-1 opacity-80">
                        <span className="truncate">{lead.website_type}</span>
                        <span>{lead.budget_range}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Lead Details Dossier */}
          <div className="md:col-span-6 lg:col-span-7 p-4 overflow-y-auto bg-[#8F9975] flex flex-col">
            {selectedLead ? (
              <div className="space-y-4">
                {/* Dossier Header */}
                <div className="border-[2px] border-[#141811] p-3 bg-[#A1AC86] retro-shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="font-retro text-[10px] opacity-75">
                        DOSSIER FILE:
                      </span>
                      <h3 className="font-retro text-sm font-black text-[#141811]">
                        {selectedLead.full_name} ({selectedLead.business_name})
                      </h3>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-1.5 font-retro text-[10px]">
                      <span className="font-bold">STATUS:</span>
                      <select
                        value={selectedLead.lead_status}
                        disabled={updatingId === selectedLead.id}
                        onChange={(e) =>
                          handleUpdateStatus(selectedLead.id, e.target.value)
                        }
                        className="bg-[#939E79] border-[1.5px] border-[#141811] px-1.5 py-0.5 text-[#141811] font-retro text-[10px] focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-retro-mono text-[#141811]">
                    <div>EMAIL: {selectedLead.email}</div>
                    <div>PHONE: {selectedLead.phone}</div>
                    <div>METHOD: {selectedLead.preferred_contact_method}</div>
                    <div>DATE: {selectedLead.submission_date} {selectedLead.submission_time}</div>
                  </div>
                </div>

                {/* Concise Summary Receipt Box (PRD Section 14) */}
                <div className="border-[2px] border-[#141811] bg-[#141811] text-[#D1DCC0] p-3 font-retro-mono text-xs">
                  <div className="font-retro text-[10px] text-[#A1AC86] mb-1.5 border-b border-[#353D2A] pb-1">
                    [PRD SEC 14: AUTO-GENERATED LEAD SUMMARY]
                  </div>
                  <pre className="whitespace-pre-wrap font-retro-mono text-[11px] leading-relaxed">
                    {selectedLead.summary}
                  </pre>
                </div>

                {/* Full Details Breakdown */}
                <div className="border-[2px] border-[#141811] p-3 bg-[#98A37C] space-y-2.5 font-retro text-xs text-[#141811]">
                  <div className="font-bold border-b border-[#141811] pb-1 text-[11px]">
                    PROJECT SCOPE SPECIFICATIONS
                  </div>

                  <div>
                    <span className="font-bold text-[10px]">BUSINESS DESCRIPTION:</span>
                    <p className="font-retro-mono text-[11px] bg-[#A1AC86] p-2 border border-[#141811] mt-0.5 leading-relaxed">
                      {selectedLead.business_description || "N/A"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-retro-mono text-[10px]">
                    <div>
                      <span className="font-bold font-retro">PURPOSE:</span>{" "}
                      {Array.isArray(selectedLead.website_purpose)
                        ? selectedLead.website_purpose.join(", ")
                        : "N/A"}
                    </div>
                    <div>
                      <span className="font-bold font-retro">EXISTING SITE:</span>{" "}
                      {selectedLead.has_existing_website === "Yes"
                        ? selectedLead.existing_website_url || "Yes"
                        : "No"}
                    </div>
                    <div>
                      <span className="font-bold font-retro">DOMAIN & HOSTING:</span>{" "}
                      Domain: {selectedLead.has_domain} / Host: {selectedLead.has_hosting}
                    </div>
                    <div>
                      <span className="font-bold font-retro">HOSTING HELP:</span>{" "}
                      {selectedLead.needs_hosting_help}
                    </div>
                    <div>
                      <span className="font-bold font-retro">CONTENT STATUS:</span>{" "}
                      {selectedLead.content_status}
                    </div>
                    <div>
                      <span className="font-bold font-retro">LEAD SOURCE:</span>{" "}
                      {selectedLead.lead_source || "N/A"}
                    </div>
                  </div>

                  {selectedLead.design_reference_urls && (
                    <div>
                      <span className="font-bold text-[10px]">DESIGN REFERENCES:</span>
                      <p className="font-retro-mono text-[10px] break-all">
                        {selectedLead.design_reference_urls}
                      </p>
                    </div>
                  )}

                  {selectedLead.additional_information && (
                    <div>
                      <span className="font-bold text-[10px]">ADDITIONAL NOTES:</span>
                      <p className="font-retro-mono text-[10px] bg-[#A1AC86] p-2 border border-[#141811] mt-0.5">
                        {selectedLead.additional_information}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="m-auto text-center font-retro text-xs text-[#141811]">
                SELECT A LEAD FROM THE REGISTER TO VIEW DOSSIER
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#828D67] border-t-[2px] border-[#141811] px-4 py-2 flex items-center justify-between font-retro text-[10px] text-[#141811] shrink-0">
          <span>TOTAL LEADS: {leads.length}</span>
          <span>PP-LABS TELEMETRY SECURE DISK STORE</span>
        </div>
      </div>
    </div>
  );
}
