"use client";

import React, { useState, useEffect } from "react";

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

interface DesktopAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesktopAdminModal({ isOpen, onClose }: DesktopAdminModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#FAF7EE] border-[2.5px] border-[#28331E] rounded-2xl shadow-[6px_8px_0px_#28331E] flex flex-col overflow-hidden">
        {/* Title Bar */}
        <div className="bg-[#5D6D50] text-[#FAF7EE] px-4 py-2 flex items-center justify-between border-b-[2px] border-[#28331E] select-none shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight">
              Agency Leads Management
            </span>
            <span className="text-[10px] font-mono bg-[#48553E] px-1.5 py-0.5 rounded">
              PRD SEC 13
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-0.5 rounded-md bg-[#FAF7EE] border border-[#28331E] text-xs font-mono font-bold text-[#28331E] hover:bg-[#F2ECE0] cursor-pointer"
          >
            Close
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 bg-[#EDE7DA] border-b-[2px] border-[#28331E] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <span className="text-xs font-mono font-bold text-[#28331E]">SEARCH:</span>
            <input
              type="text"
              placeholder="Search by client, business, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-[1.5px] border-[#28331E] rounded-lg px-3 py-1 text-xs font-sans text-[#28331E] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
            {["ALL", "NEW", "QUALIFIED", "PROPOSAL SENT", "WON", "LOST"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`
                  px-2.5 py-1 rounded-lg border-[1.5px] border-[#28331E] font-bold uppercase transition-colors
                  ${statusFilter === st
                    ? "bg-[#5D6D50] text-white"
                    : "bg-white text-[#28331E] hover:bg-[#FAF7EE]"
                  }
                `}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Content Split */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden bg-[#FAF7EE]">
          {/* List */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r-[2px] border-[#28331E] overflow-y-auto max-h-[360px] md:max-h-none divide-y divide-[#EDE7DA]">
            {loading ? (
              <div className="p-8 text-center font-mono text-xs text-[#556346]">
                Loading leads register...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-8 text-center font-mono text-xs text-[#556346]">
                No leads found matching filter.
              </div>
            ) : (
              filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                return (
                  <button
                    key={lead.id}
                    type="button"
                    onClick={() => setSelectedLead(lead)}
                    className={`
                      w-full text-left p-3 transition-colors cursor-pointer select-none
                      ${isSelected ? "bg-[#EDE7DA]" : "hover:bg-[#F5EFE6]"}
                    `}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="font-bold text-[#5D6D50]">{lead.id}</span>
                      <span
                        className={`
                          px-2 py-0.5 rounded-full border border-[#28331E] text-[10px] font-bold
                          ${lead.lead_status === "New"
                            ? "bg-[#DDEED0] text-[#244211]"
                            : lead.lead_status === "Won"
                              ? "bg-[#C4E8C2] text-[#124210]"
                              : lead.lead_status === "Lost"
                                ? "bg-[#F7D2D2] text-[#611616]"
                                : "bg-[#FAF7EE] text-[#28331E]"
                          }
                        `}
                      >
                        {lead.lead_status}
                      </span>
                    </div>
                    <div className="font-bold text-xs sm:text-sm text-[#28331E] truncate">
                      {lead.full_name}
                      {lead.business_name && (
                        <span className="font-normal text-[#556346]">
                          {" "}
                          ({lead.business_name})
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono mt-1 text-[#6A7859]">
                      <span className="truncate">{lead.website_type}</span>
                      <span>{lead.budget_range}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-7 p-4 sm:p-5 overflow-y-auto bg-[#FFFFFF] flex flex-col space-y-4">
            {selectedLead ? (
              <>
                <div className="border-[1.5px] border-[#28331E] rounded-xl p-3.5 bg-[#FAF7EE]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono text-[#6A7859]">CLIENT DOSSIER</span>
                      <h3 className="font-bold text-base text-[#28331E]">
                        {selectedLead.full_name} — {selectedLead.business_name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <span className="font-bold">STATUS:</span>
                      <select
                        value={selectedLead.lead_status}
                        disabled={updatingId === selectedLead.id}
                        onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value)}
                        className="bg-white border-[1.5px] border-[#28331E] rounded px-2 py-0.5 text-xs font-mono focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#556346]">
                    <div>Email: {selectedLead.email}</div>
                    <div>Phone: {selectedLead.phone}</div>
                    <div>Method: {selectedLead.preferred_contact_method}</div>
                    <div>Date: {selectedLead.submission_date}</div>
                  </div>
                </div>

                {/* PRD Section 14 Summary */}
                <div className="rounded-xl border-[1.5px] border-[#28331E] bg-[#FAF7EE] p-3.5 font-mono text-xs">
                  <div className="font-bold text-[11px] text-[#5D6D50] mb-1 border-b border-[#D8CEBA] pb-1">
                    PRD SEC 14: LEAD SUMMARY
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-[#28331E]">
                    {selectedLead.summary}
                  </pre>
                </div>

                <div className="rounded-xl border-[1.5px] border-[#28331E] bg-[#FFFFFF] p-3.5 space-y-2 text-xs">
                  <div className="font-mono font-bold text-[#5D6D50]">PROJECT SCOPE</div>
                  <p className="bg-[#FAF7EE] p-2.5 rounded-lg border border-[#EDE7DA] leading-relaxed">
                    {selectedLead.business_description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#556346]">
                    <div>Domain: {selectedLead.has_domain}</div>
                    <div>Hosting: {selectedLead.has_hosting}</div>
                    <div>Hosting Help: {selectedLead.needs_hosting_help}</div>
                    <div>Content Status: {selectedLead.content_status}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="m-auto text-center font-mono text-xs text-[#556346]">
                Select a lead to inspect dossier
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#EDE7DA] border-t-[2px] border-[#28331E] px-4 py-2 flex items-center justify-between text-[11px] font-mono text-[#556346] shrink-0">
          <span>Total Records: {leads.length}</span>
          <span>PP Labs Client Database</span>
        </div>
      </div>
    </div>
  );
}
