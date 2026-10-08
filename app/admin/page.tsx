"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Lock,
  Unlock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  Search,
  Download,
  Mail,
  MessageSquare,
  Phone,
  ExternalLink,
  Trash2,
  Copy,
  Check,
  Clock,
  Sparkles,
  AlertCircle,
  Save,
  FileText,
  ChevronRight,
  TrendingUp,
  Inbox,
  Send,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";

interface Lead {
  id: string;
  created_at: string;
  submission_date: string;
  submission_time: string;
  lead_status: string;
  notes?: string;
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

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  New: { bg: "bg-[#EBF3E6]", text: "text-[#2A5214]", border: "border-[#8FB974]" },
  Contacted: { bg: "bg-[#E6F0F7]", text: "text-[#1C4E75]", border: "border-[#7EA9CB]" },
  Qualified: { bg: "bg-[#FEF5E7]", text: "text-[#85530D]", border: "border-[#E1B56E]" },
  "Proposal Sent": { bg: "bg-[#F3EBF9]", text: "text-[#62238E]", border: "border-[#B88ED7]" },
  Negotiation: { bg: "bg-[#FFF0E6]", text: "text-[#9E450E]", border: "border-[#F19D66]" },
  Won: { bg: "bg-[#DCF3D8]", text: "text-[#1B5717]", border: "border-[#52B44A]" },
  Lost: { bg: "bg-[#FBE8E8]", text: "text-[#8B1C1C]", border: "border-[#D97D7D]" },
};

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Leads State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");

  // Editing Note State
  const [leadNotes, setLeadNotes] = useState<Record<string, string>>({});
  const [savingNoteId, setSavingNoteId] = useState<string | null>(null);
  const [savedNoteSuccess, setSavedNoteSuccess] = useState<string | null>(null);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | null>(null);

  // Copy Feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Test Email Modal
  const [isTestEmailOpen, setIsTestEmailOpen] = useState(false);
  const [testEmailInput, setTestEmailInput] = useState("");
  const [testEmailSending, setTestEmailSending] = useState(false);
  const [testEmailStatus, setTestEmailStatus] = useState<{
    success: boolean;
    provider: string;
    message: string;
  } | null>(null);

  // Email Config Diagnostics
  const [emailDiag, setEmailDiag] = useState<{
    hasResend: boolean;
    hasSmtp: boolean;
    notificationEmail: string;
    activeProvider: string;
  } | null>(null);

  // Delete Confirm Modal
  const [deleteLeadId, setDeleteLeadId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Check auth on mount
  useEffect(() => {
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchLeads();
        fetchEmailDiagnostics();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passcode.trim()) {
      setAuthError("Please enter your admin passcode.");
      return;
    }

    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setPasscode("");
        fetchLeads();
        fetchEmailDiagnostics();
      } else {
        setAuthError(data.error || "Incorrect passcode.");
      }
    } catch {
      setAuthError("Failed to connect to authentication server.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      setLeads([]);
      setSelectedLeadId(null);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
        // Initialize notes dictionary
        const notesMap: Record<string, string> = {};
        data.leads.forEach((l: Lead) => {
          notesMap[l.id] = l.notes || "";
        });
        setLeadNotes(notesMap);

        if (data.leads.length > 0 && !selectedLeadId) {
          setSelectedLeadId(data.leads[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmailDiagnostics = async () => {
    try {
      const res = await fetch("/api/admin/test-email");
      const data = await res.json();
      setEmailDiag(data);
      if (data.notificationEmail && !testEmailInput) {
        setTestEmailInput(data.notificationEmail);
      }
    } catch (e) {
      console.error("Failed to load email diagnostics", e);
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      setUpdatingStatusId(leadId);
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
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    try {
      setSavingNoteId(leadId);
      const noteContent = leadNotes[leadId] || "";
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, notes: noteContent }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, notes: noteContent } : l))
        );
        setSavedNoteSuccess(leadId);
        setTimeout(() => setSavedNoteSuccess(null), 2500);
      }
    } catch (err) {
      console.error("Failed to save note", err);
    } finally {
      setSavingNoteId(null);
    }
  };

  const handleDeleteLead = async () => {
    if (!deleteLeadId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/leads?id=${deleteLeadId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l.id !== deleteLeadId));
        if (selectedLeadId === deleteLeadId) {
          const remaining = leads.filter((l) => l.id !== deleteLeadId);
          setSelectedLeadId(remaining.length > 0 ? remaining[0].id : null);
        }
        setDeleteLeadId(null);
      }
    } catch (err) {
      console.error("Failed to delete lead", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCopySummary = (lead: Lead) => {
    const text = `
=== PP LABS CLIENT INTAKE DOSSIER ===
ID: ${lead.id}
DATE: ${lead.submission_date} (${lead.submission_time})
STATUS: ${lead.lead_status}

CLIENT: ${lead.full_name}
BUSINESS: ${lead.business_name}
EMAIL: ${lead.email}
PHONE: ${lead.phone}
PREFERRED CONTACT: ${lead.preferred_contact_method}

WEBSITE TYPE: ${lead.website_type}
BUDGET RANGE: ${lead.budget_range}
TIMELINE: ${lead.timeline}

PURPOSE: ${Array.isArray(lead.website_purpose) ? lead.website_purpose.join(", ") : lead.website_purpose}
REQUIRED FEATURES: ${Array.isArray(lead.required_features) ? lead.required_features.join(", ") : lead.required_features}
DESIGN STYLES: ${Array.isArray(lead.design_preferences) ? lead.design_preferences.join(", ") : lead.design_preferences}
BRANDING ASSETS: ${Array.isArray(lead.branding_assets) ? lead.branding_assets.join(", ") : lead.branding_assets}
EXISTING SITE: ${lead.existing_website_url || "None"}
DOMAIN: ${lead.has_domain || "N/A"} | HOSTING: ${lead.has_hosting || "N/A"}

PROJECT DESCRIPTION:
${lead.business_description}

INTERNAL NOTES:
${lead.notes || "None"}
=====================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendTestEmail = async () => {
    setTestEmailSending(true);
    setTestEmailStatus(null);
    try {
      const res = await fetch("/api/admin/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmailInput }),
      });
      const data = await res.json();
      if (data.success) {
        setTestEmailStatus({
          success: true,
          provider: data.provider || "active",
          message: `Test email dispatched to ${data.recipient || testEmailInput}!`,
        });
      } else {
        setTestEmailStatus({
          success: false,
          provider: "error",
          message: data.error || "Failed to dispatch test email.",
        });
      }
    } catch {
      setTestEmailStatus({
        success: false,
        provider: "error",
        message: "Network error sending test email.",
      });
    } finally {
      setTestEmailSending(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = [
      "ID",
      "Date",
      "Time",
      "Status",
      "Full Name",
      "Business Name",
      "Email",
      "Phone",
      "Website Type",
      "Budget Range",
      "Timeline",
      "Preferred Contact",
      "Features",
      "Design Preferences",
      "Existing Site",
      "Notes",
    ];

    const rows = leads.map((l) => [
      l.id,
      l.submission_date,
      l.submission_time,
      l.lead_status,
      `"${(l.full_name || "").replace(/"/g, '""')}"`,
      `"${(l.business_name || "").replace(/"/g, '""')}"`,
      l.email,
      `"${l.phone}"`,
      `"${l.website_type}"`,
      `"${l.budget_range}"`,
      `"${l.timeline}"`,
      l.preferred_contact_method,
      `"${(Array.isArray(l.required_features) ? l.required_features.join("; ") : "").replace(/"/g, '""')}"`,
      `"${(Array.isArray(l.design_preferences) ? l.design_preferences.join("; ") : "").replace(/"/g, '""')}"`,
      `"${l.existing_website_url || "No"}"`,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pp_labs_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    if (leads.length === 0) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(leads, null, 2)
    )}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `pp_labs_leads_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        const matchesStatus =
          statusFilter === "ALL" ||
          lead.lead_status.toLowerCase() === statusFilter.toLowerCase();
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          lead.id?.toLowerCase().includes(q) ||
          lead.full_name?.toLowerCase().includes(q) ||
          lead.business_name?.toLowerCase().includes(q) ||
          lead.email?.toLowerCase().includes(q) ||
          lead.phone?.toLowerCase().includes(q) ||
          lead.website_type?.toLowerCase().includes(q) ||
          lead.budget_range?.toLowerCase().includes(q) ||
          lead.notes?.toLowerCase().includes(q);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.created_at || a.submission_date).getTime();
        const dateB = new Date(b.created_at || b.submission_date).getTime();
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [leads, statusFilter, searchQuery, sortBy]);

  const selectedLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || null;
  }, [leads, selectedLeadId]);

  // Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => l.lead_status === "New").length;
    const won = leads.filter((l) => l.lead_status === "Won").length;
    const inProgress = leads.filter(
      (l) => ["Contacted", "Qualified", "Proposal Sent", "Negotiation"].includes(l.lead_status)
    ).length;

    return { total, newLeads, won, inProgress };
  }, [leads]);

  // If loading session check
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen desktop-grid flex items-center justify-center p-4">
        <div className="bg-[#FAF7EE] border-[2.5px] border-[#28331E] rounded-2xl p-8 shadow-[6px_8px_0px_#28331E] flex items-center gap-3 font-mono text-sm text-[#28331E]">
          <RefreshCw className="w-5 h-5 animate-spin text-[#5D6D50]" />
          <span>INITIALIZING PP LABS WORKSTATION...</span>
        </div>
      </div>
    );
  }

  // PASSCODE LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen desktop-grid flex items-center justify-center p-4 sm:p-6 select-none">
        <div className="w-full max-w-md bg-[#FAF7EE] border-[2.5px] border-[#28331E] rounded-2xl shadow-[8px_10px_0px_#28331E] overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-[#5D6D50] text-[#FAF7EE] px-4 py-2.5 flex items-center justify-between border-b-[2px] border-[#28331E]">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#FAF7EE]" />
              <span className="font-mono text-xs font-bold tracking-wider">
                PP LABS // SYSTEM ACCESS
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FAF7EE]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FAF7EE]/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FAF7EE]" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#EDE7DA] border-[2px] border-[#28331E] flex items-center justify-center shadow-[2px_2px_0px_#28331E]">
                <Lock className="w-6 h-6 text-[#28331E]" />
              </div>
              <h1 className="font-sans text-xl sm:text-2xl font-black text-[#28331E] tracking-tight">
                ADMIN CONSOLE
              </h1>
              <p className="font-mono text-xs text-[#556346] leading-relaxed">
                Enter your administrative passcode to review client dossiers and manage pipeline inquiries.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block font-mono text-[11px] font-bold tracking-wider text-[#28331E] uppercase">
                SECURITY PASSCODE
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  placeholder="Enter passcode..."
                  autoFocus
                  className="w-full bg-[#FFFFFF] border-[2px] border-[#28331E] rounded-xl px-4 py-3 pr-11 font-mono text-sm text-[#28331E] placeholder:text-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#5D6D50] shadow-[inset_2px_2px_0px_rgba(40,51,30,0.08)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#556346] hover:text-[#28331E] p-1 cursor-pointer"
                  title={showPasscode ? "Hide Passcode" : "Show Passcode"}
                >
                  {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {authError && (
                <div className="flex items-center gap-1.5 text-xs text-[#8B1C1C] font-mono pt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-[#28331E] hover:bg-[#3D4C2F] active:translate-y-0.5 text-[#FAF7EE] py-3 rounded-xl border-[2px] border-[#28331E] font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-[3px_4px_0px_#5D6D50] transition-all cursor-pointer disabled:opacity-50"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>VERIFYING CREDENTIALS...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>UNLOCK WORKSTATION</span>
                </>
              )}
            </button>

            <div className="pt-2 border-t border-[#EDE7DA] flex items-center justify-between text-[11px] font-mono text-[#6A7859]">
              <Link href="/" className="hover:underline flex items-center gap-1">
                ← Return to Agency
              </Link>
              <span className="text-[#8B966F]">PP Labs Production Workstation</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen desktop-grid text-[#28331E] pb-16 selection:bg-[#5D6D50] selection:text-[#FAF7EE]">
      {/* TOP SYSTEM NAV BAR */}
      <header className="sticky top-0 z-40 bg-[#FAF7EE]/95 backdrop-blur-md border-b-[2.5px] border-[#28331E] shadow-[0_2px_4px_rgba(40,51,30,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#5D6D50] text-[#FAF7EE] border-[1.5px] border-[#28331E] flex items-center justify-center font-mono font-bold text-xs shadow-[2px_2px_0px_#28331E]">
              PP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[#28331E]">
                  PP LABS // ADMIN CONSOLE
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono bg-[#EBF3E6] text-[#2A5214] border border-[#8FB974] px-1.5 py-0.2 rounded font-semibold">
                  SECURE SESSION
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#6A7859] hidden sm:block">
                LEADS DISPATCH & CRM PROTOCOL
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            {/* Quick Test Email Button */}
            <button
              type="button"
              onClick={() => {
                setIsTestEmailOpen(true);
                setTestEmailStatus(null);
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[1.5px] border-[#28331E] bg-[#FFFFFF] hover:bg-[#F5EFE6] text-[#28331E] font-bold shadow-[2px_2px_0px_#28331E] cursor-pointer transition-all"
            >
              <Send className="w-3.5 h-3.5 text-[#5D6D50]" />
              <span>TEST EMAIL ALERT</span>
            </button>

            {/* Visit Site */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border-[1.5px] border-[#28331E] bg-[#FFFFFF] hover:bg-[#F5EFE6] text-[#28331E] font-bold shadow-[2px_2px_0px_#28331E] cursor-pointer transition-all"
            >
              <span className="hidden sm:inline">VIEW SITE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Client Intake */}
            <Link
              href="/start"
              target="_blank"
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg border-[1.5px] border-[#28331E] bg-[#FFFFFF] hover:bg-[#F5EFE6] text-[#28331E] font-bold shadow-[2px_2px_0px_#28331E] cursor-pointer transition-all"
            >
              <span>INTAKE FORM</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[1.5px] border-[#8B1C1C] bg-[#FBE8E8] text-[#8B1C1C] font-bold hover:bg-[#F5D5D5] shadow-[2px_2px_0px_#8B1C1C] cursor-pointer transition-all"
              title="End session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">LOGOUT</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* METRICS ROW */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-[#FAF7EE] border-[2px] border-[#28331E] rounded-xl p-4 shadow-[3px_4px_0px_#28331E]">
            <div className="flex items-center justify-between text-xs font-mono text-[#6A7859] mb-1">
              <span>TOTAL INQUIRIES</span>
              <Inbox className="w-4 h-4 text-[#5D6D50]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#28331E]">
              {metrics.total}
            </div>
            <div className="text-[10px] font-mono text-[#8B966F] mt-1">
              Registered in leads.json
            </div>
          </div>

          <div className="bg-[#FAF7EE] border-[2px] border-[#28331E] rounded-xl p-4 shadow-[3px_4px_0px_#28331E]">
            <div className="flex items-center justify-between text-xs font-mono text-[#2A5214] mb-1">
              <span>NEW / UNPROCESSED</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#52B44A] animate-pulse" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#2A5214]">
              {metrics.newLeads}
            </div>
            <div className="text-[10px] font-mono text-[#2A5214] mt-1">
              Awaiting first contact
            </div>
          </div>

          <div className="bg-[#FAF7EE] border-[2px] border-[#28331E] rounded-xl p-4 shadow-[3px_4px_0px_#28331E]">
            <div className="flex items-center justify-between text-xs font-mono text-[#6A7859] mb-1">
              <span>IN PIPELINE</span>
              <TrendingUp className="w-4 h-4 text-[#85530D]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#85530D]">
              {metrics.inProgress}
            </div>
            <div className="text-[10px] font-mono text-[#85530D] mt-1">
              Qualified or proposing
            </div>
          </div>

          <div className="bg-[#FAF7EE] border-[2px] border-[#28331E] rounded-xl p-4 shadow-[3px_4px_0px_#28331E]">
            <div className="flex items-center justify-between text-xs font-mono text-[#6A7859] mb-1">
              <span>WON DEALS</span>
              <Sparkles className="w-4 h-4 text-[#1B5717]" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#1B5717]">
              {metrics.won}
            </div>
            <div className="text-[10px] font-mono text-[#1B5717] mt-1">
              {metrics.total > 0 ? `${Math.round((metrics.won / metrics.total) * 100)}% conversion rate` : "No submissions"}
            </div>
          </div>
        </section>

        {/* EMAIL DISPATCH BANNER (STATUS) */}
        {emailDiag && (
          <div className="bg-[#FAF7EE] border-[1.5px] border-[#28331E] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#4E5C40]">
              <Mail className="w-4 h-4 text-[#5D6D50] shrink-0" />
              <span>
                <strong>Email Alert Dispatcher:</strong> Active via{" "}
                <span className="underline font-bold text-[#28331E]">{emailDiag.activeProvider}</span>.
                Target inbox: <code className="bg-[#EDE7DA] px-1.5 py-0.5 rounded text-[#28331E]">{emailDiag.notificationEmail}</code>
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsTestEmailOpen(true);
                setTestEmailStatus(null);
              }}
              className="text-[#5D6D50] hover:text-[#28331E] font-bold underline cursor-pointer text-[11px]"
            >
              Configure / Test Dispatch →
            </button>
          </div>
        )}

        {/* CONTROL TOOLBAR */}
        <section className="bg-[#FAF7EE] border-[2px] border-[#28331E] rounded-xl p-3 sm:p-4 shadow-[3px_4px_0px_#28331E] space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6A7859]" />
              <input
                type="text"
                placeholder="Search leads by name, company, email, phone, budget or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FFFFFF] border-[1.5px] border-[#28331E] rounded-lg pl-9 pr-4 py-2 font-mono text-xs text-[#28331E] placeholder:text-[#9A9588] focus:outline-none focus:ring-1 focus:ring-[#5D6D50]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[#6A7859] hover:text-[#28331E] bg-[#EDE7DA] px-1.5 py-0.5 rounded"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Actions: Sort, Export, Refresh */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs font-mono">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFFFFF] border-[1.5px] border-[#28331E] rounded-lg px-2.5 py-2 font-mono text-xs text-[#28331E] focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>

              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-[1.5px] border-[#28331E] bg-[#FFFFFF] hover:bg-[#F2ECE0] text-[#28331E] font-bold cursor-pointer transition-all shadow-[1px_1px_0px_#28331E]"
                title="Download CSV spreadsheet"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </button>

              <button
                type="button"
                onClick={handleExportJSON}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-[1.5px] border-[#28331E] bg-[#FFFFFF] hover:bg-[#F2ECE0] text-[#28331E] font-bold cursor-pointer transition-all shadow-[1px_1px_0px_#28331E]"
                title="Download JSON backup"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">JSON</span>
              </button>

              <button
                type="button"
                onClick={fetchLeads}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border-[1.5px] border-[#28331E] bg-[#5D6D50] hover:bg-[#4C5B40] text-[#FAF7EE] font-bold cursor-pointer transition-all shadow-[1px_1px_0px_#28331E] disabled:opacity-50"
                title="Refresh leads"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">REFRESH</span>
              </button>
            </div>
          </div>

          {/* Status Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
            <span className="text-[10px] text-[#6A7859] font-bold uppercase shrink-0 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              STATUS:
            </span>
            {["ALL", ...STATUS_OPTIONS].map((status) => {
              const isSelected = statusFilter === status;
              const count =
                status === "ALL"
                  ? leads.length
                  : leads.filter((l) => l.lead_status.toLowerCase() === status.toLowerCase()).length;

              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`
                    px-2.5 py-1 rounded-lg border-[1.5px] font-bold uppercase shrink-0 transition-all cursor-pointer text-[11px] flex items-center gap-1.5
                    ${isSelected
                      ? "bg-[#28331E] text-[#FAF7EE] border-[#28331E] shadow-[2px_2px_0px_#5D6D50]"
                      : "bg-[#FFFFFF] text-[#28331E] border-[#28331E] hover:bg-[#F5EFE6]"
                    }
                  `}
                >
                  <span>{status}</span>
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded-full ${
                      isSelected ? "bg-[#5D6D50] text-[#FAF7EE]" : "bg-[#EDE7DA] text-[#4E5C40]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* WORKSTATION DUAL PANE (MASTER-DETAIL) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[580px]">
          {/* LEFT: LEADS MASTER LIST */}
          <div className="lg:col-span-5 bg-[#FAF7EE] border-[2px] border-[#28331E] rounded-xl shadow-[4px_6px_0px_#28331E] flex flex-col overflow-hidden max-h-[750px]">
            {/* List Header */}
            <div className="bg-[#EDE7DA] px-4 py-2.5 border-b-[2px] border-[#28331E] flex items-center justify-between text-xs font-mono font-bold text-[#28331E] shrink-0">
              <span>REGISTERED INQUIRIES ({filteredLeads.length})</span>
              <span className="text-[10px] text-[#6A7859]">CLICK TO INSPECT</span>
            </div>

            {/* List Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#EDE7DA]">
              {loading ? (
                <div className="p-12 text-center font-mono text-xs text-[#6A7859] flex flex-col items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-[#5D6D50]" />
                  <span>Loading client records...</span>
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center font-mono text-xs text-[#6A7859] space-y-2">
                  <Inbox className="w-8 h-8 mx-auto text-[#A39E93]" />
                  <div className="font-bold text-[#28331E]">No matching inquiries found</div>
                  <p className="text-[11px] text-[#8B966F]">
                    {searchQuery
                      ? "Try searching for a different keyword or resetting filters."
                      : "New submissions through /start will automatically populate here."}
                  </p>
                </div>
              ) : (
                filteredLeads.map((lead) => {
                  const isSelected = selectedLeadId === lead.id;
                  const statusStyle =
                    STATUS_COLORS[lead.lead_status] || {
                      bg: "bg-[#FAF7EE]",
                      text: "text-[#28331E]",
                      border: "border-[#28331E]",
                    };

                  return (
                    <button
                      key={lead.id}
                      type="button"
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={`
                        w-full text-left p-3.5 transition-all cursor-pointer select-none relative
                        ${isSelected
                          ? "bg-[#FFFFFF] border-l-4 border-l-[#28331E] shadow-[inset_0_0_8px_rgba(40,51,30,0.04)]"
                          : "hover:bg-[#F7F2E7]"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#5D6D50]">{lead.id}</span>
                          {lead.lead_status === "New" && (
                            <span className="w-2 h-2 rounded-full bg-[#52B44A] animate-pulse" title="New Unread Lead" />
                          )}
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                        >
                          {lead.lead_status}
                        </span>
                      </div>

                      <div className="font-bold text-sm text-[#28331E] truncate mb-0.5">
                        {lead.full_name}
                        {lead.business_name && (
                          <span className="font-normal text-[#556346] text-xs">
                            {" "}
                            &bull; {lead.business_name}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6A7859] mt-2">
                        <span className="truncate max-w-[170px] bg-[#EDE7DA] px-1.5 py-0.5 rounded text-[10px] font-semibold text-[#28331E]">
                          {lead.website_type}
                        </span>
                        <span className="font-bold text-[#28331E]">{lead.budget_range}</span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8B966F] mt-2 pt-1 border-t border-[#F2ECE0]">
                        <span>{lead.submission_date}</span>
                        <span>{lead.timeline}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* List Footer */}
            <div className="bg-[#EDE7DA] px-4 py-2 border-t-[2px] border-[#28331E] text-[11px] font-mono text-[#6A7859] flex items-center justify-between shrink-0">
              <span>Showing {filteredLeads.length} of {leads.length}</span>
              <span>LIVE CRM SYSTEM</span>
            </div>
          </div>

          {/* RIGHT: DETAILED LEAD DOSSIER INSPECTOR */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border-[2px] border-[#28331E] rounded-xl shadow-[4px_6px_0px_#28331E] flex flex-col overflow-hidden max-h-[750px]">
            {selectedLead ? (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                {/* Dossier Header */}
                <div className="border-[2px] border-[#28331E] rounded-xl p-4 bg-[#FAF7EE] shadow-[2px_3px_0px_#28331E]">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#5D6D50] uppercase">
                          CLIENT DOSSIER
                        </span>
                        <span className="font-mono text-xs font-bold text-[#28331E] bg-[#EDE7DA] px-2 py-0.5 rounded">
                          {selectedLead.id}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#28331E] mt-1">
                        {selectedLead.full_name}
                      </h2>
                      <div className="text-xs sm:text-sm font-semibold text-[#556346]">
                        {selectedLead.business_name || "Independent"} &bull; Received on{" "}
                        {selectedLead.submission_date} at {selectedLead.submission_time}
                      </div>
                    </div>

                    {/* Status Changer */}
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-[#28331E]">STATUS:</span>
                      <select
                        value={selectedLead.lead_status}
                        disabled={updatingStatusId === selectedLead.id}
                        onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                        className="bg-[#FFFFFF] border-[1.5px] border-[#28331E] rounded-lg px-2.5 py-1 text-xs font-mono font-bold focus:outline-none cursor-pointer shadow-[1px_1px_0px_#28331E]"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Quick Action Toolbar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#EDE7DA] text-xs font-mono">
                    {/* WhatsApp */}
                    {selectedLead.phone && (
                      <a
                        href={`https://wa.me/${(selectedLead.phone || "").replace(/[^0-9]/g, "")}?text=Hi%20${encodeURIComponent(
                          selectedLead.full_name
                        )},%20thank%20you%20for%20your%20inquiry%20with%20PP%20Labs!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366] text-white font-bold hover:brightness-105 border border-[#1DA851] shadow-[1px_1px_0px_#28331E]"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    )}

                    {/* Email */}
                    <a
                      href={`mailto:${selectedLead.email}?subject=PP%20Labs%20Project%20Inquiry%20-%20${encodeURIComponent(
                        selectedLead.business_name || selectedLead.full_name
                      )}`}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#28331E] text-[#FAF7EE] font-bold hover:bg-[#3D4C2F] border border-[#28331E] shadow-[1px_1px_0px_#28331E]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Email</span>
                    </a>

                    {/* Copy Summary */}
                    <button
                      type="button"
                      onClick={() => handleCopySummary(selectedLead)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FFFFFF] text-[#28331E] font-bold hover:bg-[#F2ECE0] border border-[#28331E] shadow-[1px_1px_0px_#28331E] cursor-pointer"
                    >
                      {copiedId === selectedLead.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#2A5214]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Dossier</span>
                        </>
                      )}
                    </button>

                    {/* Delete Lead */}
                    <button
                      type="button"
                      onClick={() => setDeleteLeadId(selectedLead.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#FBE8E8] text-[#8B1C1C] font-bold hover:bg-[#F5D5D5] border border-[#8B1C1C] shadow-[1px_1px_0px_#8B1C1C] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* INTERNAL AGENCY NOTES & MEMO */}
                <div className="border-[1.5px] border-[#28331E] rounded-xl p-4 bg-[#FAF7EE] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#5D6D50] flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      INTERNAL AGENCY NOTES (PRIVATE)
                    </span>
                    {savedNoteSuccess === selectedLead.id && (
                      <span className="text-[10px] font-mono text-[#2A5214] font-bold bg-[#DDEED0] px-2 py-0.5 rounded">
                        ✓ Note Saved
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={2}
                    value={leadNotes[selectedLead.id] || ""}
                    onChange={(e) =>
                      setLeadNotes({ ...leadNotes, [selectedLead.id]: e.target.value })
                    }
                    placeholder="Add private agency notes (e.g. called client on phone, scheduled scoping call for Friday, sent initial wireframe proposal...)"
                    className="w-full bg-[#FFFFFF] border-[1.5px] border-[#28331E] rounded-lg p-2.5 font-sans text-xs text-[#28331E] placeholder:text-[#A39E93] focus:outline-none focus:ring-1 focus:ring-[#5D6D50]"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSaveNotes(selectedLead.id)}
                      disabled={savingNoteId === selectedLead.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5D6D50] hover:bg-[#4C5B40] text-[#FAF7EE] font-mono text-xs font-bold shadow-[1px_1px_0px_#28331E] cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Save className="w-3 h-3" />
                      <span>{savingNoteId === selectedLead.id ? "Saving..." : "Save Notes"}</span>
                    </button>
                  </div>
                </div>

                {/* SCOPE & REQUIREMENTS BREAKDOWN */}
                <div className="space-y-4">
                  {/* Contact Info Table */}
                  <div className="border-[1.5px] border-[#28331E] rounded-xl p-4 bg-[#FFFFFF]">
                    <div className="font-mono text-xs font-bold text-[#5D6D50] mb-2.5 uppercase">
                      1. Contact Information
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[#6A7859]">Email: </span>
                        <a href={`mailto:${selectedLead.email}`} className="font-bold underline text-[#28331E]">
                          {selectedLead.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-[#6A7859]">Phone: </span>
                        <a href={`tel:${selectedLead.phone}`} className="font-bold text-[#28331E]">
                          {selectedLead.phone}
                        </a>
                      </div>
                      <div>
                        <span className="text-[#6A7859]">Preferred Method: </span>
                        <span className="font-bold text-[#28331E]">
                          {selectedLead.preferred_contact_method}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6A7859]">Acquisition Source: </span>
                        <span className="font-bold text-[#28331E]">
                          {selectedLead.lead_source || "Direct Form"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Project Overview */}
                  <div className="border-[1.5px] border-[#28331E] rounded-xl p-4 bg-[#FFFFFF]">
                    <div className="font-mono text-xs font-bold text-[#5D6D50] mb-2.5 uppercase">
                      2. Project Objectives & Scope
                    </div>
                    <div className="bg-[#FAF7EE] p-3 rounded-lg border border-[#EDE7DA] text-xs leading-relaxed text-[#28331E] mb-3">
                      <strong>Client Statement:</strong>
                      <p className="mt-1">{selectedLead.business_description || "Not provided"}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono mb-3">
                      <div className="bg-[#FAF7EE] p-2 rounded border border-[#EDE7DA]">
                        <span className="text-[10px] text-[#6A7859] block">WEBSITE TYPE</span>
                        <span className="font-bold text-[#28331E]">{selectedLead.website_type}</span>
                      </div>
                      <div className="bg-[#FAF7EE] p-2 rounded border border-[#EDE7DA]">
                        <span className="text-[10px] text-[#6A7859] block">BUDGET RANGE</span>
                        <span className="font-bold text-[#28331E]">{selectedLead.budget_range}</span>
                      </div>
                      <div className="bg-[#FAF7EE] p-2 rounded border border-[#EDE7DA]">
                        <span className="text-[10px] text-[#6A7859] block">TIMELINE</span>
                        <span className="font-bold text-[#28331E]">{selectedLead.timeline}</span>
                      </div>
                    </div>

                    {/* Features Tags */}
                    <div className="space-y-1.5 text-xs font-mono">
                      <span className="text-[#6A7859] block">Required Features:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {Array.isArray(selectedLead.required_features) &&
                        selectedLead.required_features.length > 0 ? (
                          selectedLead.required_features.map((feat) => (
                            <span
                              key={feat}
                              className="bg-[#EBF3E6] border border-[#8FB974] text-[#2A5214] px-2 py-0.5 rounded text-[11px] font-semibold"
                            >
                              {feat}
                            </span>
                          ))
                        ) : (
                          <span className="text-[#A39E93]">Standard features</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Design & Technical Specifications */}
                  <div className="border-[1.5px] border-[#28331E] rounded-xl p-4 bg-[#FFFFFF]">
                    <div className="font-mono text-xs font-bold text-[#5D6D50] mb-2.5 uppercase">
                      3. Design & Infrastructure Specs
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[#6A7859] block">Design Preferences:</span>
                        <span className="font-bold text-[#28331E]">
                          {Array.isArray(selectedLead.design_preferences)
                            ? selectedLead.design_preferences.join(", ")
                            : selectedLead.design_preferences || "None specified"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6A7859] block">Branding Assets:</span>
                        <span className="font-bold text-[#28331E]">
                          {Array.isArray(selectedLead.branding_assets)
                            ? selectedLead.branding_assets.join(", ")
                            : selectedLead.branding_assets || "None specified"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6A7859] block">Content Status:</span>
                        <span className="font-bold text-[#28331E]">
                          {selectedLead.content_status || "Not specified"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#6A7859] block">Domain & Hosting:</span>
                        <span className="font-bold text-[#28331E]">
                          Domain: {selectedLead.has_domain || "N/A"} &bull; Hosting:{" "}
                          {selectedLead.has_hosting || "N/A"}
                        </span>
                      </div>

                      {selectedLead.existing_website_url && (
                        <div className="sm:col-span-2">
                          <span className="text-[#6A7859] block">Current Website:</span>
                          <a
                            href={selectedLead.existing_website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-[#5D6D50] underline flex items-center gap-1"
                          >
                            <span>{selectedLead.existing_website_url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}

                      {selectedLead.design_reference_urls && (
                        <div className="sm:col-span-2">
                          <span className="text-[#6A7859] block">Design Inspirations:</span>
                          <span className="text-[#28331E]">
                            {selectedLead.design_reference_urls}
                          </span>
                        </div>
                      )}

                      {selectedLead.additional_information && (
                        <div className="sm:col-span-2 bg-[#FAF7EE] p-2.5 rounded border border-[#EDE7DA] mt-1">
                          <span className="text-[#6A7859] block font-bold text-[11px] mb-1">
                            Additional Client Notes:
                          </span>
                          <span className="text-[#28331E]">
                            {selectedLead.additional_information}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Raw PRD Sec 14 Lead Summary */}
                  {selectedLead.summary && (
                    <div className="border-[1.5px] border-[#28331E] rounded-xl p-4 bg-[#FAF7EE]">
                      <div className="font-mono text-xs font-bold text-[#5D6D50] mb-2 uppercase">
                        Lead Summary Transcript
                      </div>
                      <pre className="font-mono text-[11px] whitespace-pre-wrap text-[#28331E] bg-[#FFFFFF] p-3 rounded border border-[#EDE7DA] leading-relaxed">
                        {selectedLead.summary}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="m-auto p-12 text-center font-mono text-xs text-[#6A7859] space-y-2">
                <FileText className="w-10 h-10 mx-auto text-[#A39E93]" />
                <div className="font-bold text-[#28331E]">No Lead Selected</div>
                <p className="text-[11px] text-[#8B966F]">
                  Select an inquiry from the register on the left to view the complete client dossier.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* TEST EMAIL MODAL */}
      {isTestEmailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#FAF7EE] border-[2.5px] border-[#28331E] rounded-2xl shadow-[6px_8px_0px_#28331E] overflow-hidden">
            <div className="bg-[#5D6D50] text-[#FAF7EE] px-4 py-2.5 border-b-[2px] border-[#28331E] flex items-center justify-between font-mono text-xs font-bold">
              <span>TEST EMAIL ALERT DISPATCH</span>
              <button
                type="button"
                onClick={() => setIsTestEmailOpen(false)}
                className="px-2 py-0.5 rounded bg-[#FAF7EE] text-[#28331E] hover:bg-[#EDE7DA] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <p className="font-mono text-xs text-[#556346] leading-relaxed">
                Send a sample lead alert email to verify that your inbox receives automated notifications when a user submits the intake form.
              </p>

              <div className="space-y-1.5 font-mono text-xs">
                <label className="font-bold text-[#28331E]">RECIPIENT EMAIL:</label>
                <input
                  type="email"
                  value={testEmailInput}
                  onChange={(e) => setTestEmailInput(e.target.value)}
                  placeholder="e.g. your-email@gmail.com"
                  className="w-full bg-[#FFFFFF] border-[1.5px] border-[#28331E] rounded-lg px-3 py-2 text-xs font-mono text-[#28331E] focus:outline-none"
                />
              </div>

              {testEmailStatus && (
                <div
                  className={`p-3 rounded-lg border text-xs font-mono ${
                    testEmailStatus.success
                      ? "bg-[#EBF3E6] border-[#8FB974] text-[#2A5214]"
                      : "bg-[#FBE8E8] border-[#D97D7D] text-[#8B1C1C]"
                  }`}
                >
                  <div className="font-bold">
                    {testEmailStatus.success ? "✓ Dispatch Successful" : "✗ Dispatch Warning"}
                  </div>
                  <div className="mt-1 text-[11px]">{testEmailStatus.message}</div>
                  {testEmailStatus.provider === "simulated" && (
                    <div className="mt-2 text-[10px] text-[#556346] bg-[#FFFFFF] p-2 rounded border border-[#EDE7DA]">
                      <strong>Notice:</strong> No RESEND_API_KEY found in <code>.env.local</code>. Output was simulated to the terminal console! Set <code>RESEND_API_KEY</code> to send live messages.
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EDE7DA]">
                <button
                  type="button"
                  onClick={() => setIsTestEmailOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-[#28331E] bg-[#FFFFFF] text-xs font-mono font-bold text-[#28331E] hover:bg-[#F2ECE0] cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSendTestEmail}
                  disabled={testEmailSending || !testEmailInput.trim()}
                  className="px-4 py-1.5 rounded-lg bg-[#28331E] text-[#FAF7EE] text-xs font-mono font-bold hover:bg-[#3D4C2F] cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {testEmailSending ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Test Alert</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteLeadId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#FAF7EE] border-[2.5px] border-[#8B1C1C] rounded-2xl shadow-[6px_8px_0px_#8B1C1C] overflow-hidden">
            <div className="bg-[#8B1C1C] text-[#FAF7EE] px-4 py-2 border-b-[2px] border-[#8B1C1C] font-mono text-xs font-bold">
              CONFIRM LEAD DELETION
            </div>
            <div className="p-5 space-y-4">
              <p className="font-mono text-xs text-[#28331E] leading-relaxed">
                Are you sure you want to permanently delete lead{" "}
                <strong className="text-[#8B1C1C]">{deleteLeadId}</strong>? This will remove the record from <code>leads.json</code>.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteLeadId(null)}
                  disabled={deleting}
                  className="px-3 py-1.5 rounded-lg border border-[#28331E] bg-[#FFFFFF] text-xs font-mono font-bold text-[#28331E] hover:bg-[#F2ECE0] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteLead}
                  disabled={deleting}
                  className="px-3 py-1.5 rounded-lg bg-[#8B1C1C] text-[#FAF7EE] text-xs font-mono font-bold hover:bg-[#A32222] cursor-pointer disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
