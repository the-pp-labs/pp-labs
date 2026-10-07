"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Building2,
  Mail,
  Phone,
  Globe,
  Link2,
  Zap,
  RefreshCw,
  ShoppingBag,
  Palette,
  Target,
  Calendar,
  Code2,
  HelpCircle,
  Sparkles,
  Square,
  Gem,
  Briefcase,
  Brush,
  Crown,
  CircleDot,
  Search,
  ArrowRight,
  Check,
} from "lucide-react";
import {
  DockIcon,
} from "./DesktopIcons";
import { DesktopWindow } from "./DesktopWindow";
import { DesktopTabs } from "./DesktopTabs";
import { DesktopInput } from "./DesktopInput";
import { DesktopTextarea } from "./DesktopTextarea";
import { DesktopCard } from "./DesktopCard";
import { DesktopCheckbox, DesktopRadio } from "./DesktopCheckboxRadio";
import { DesktopSelect } from "./DesktopSelect";
import { DesktopAdminModal } from "./DesktopAdminModal";
import { DesktopSuccessView } from "./DesktopSuccessView";

// Step Names
const STEP_NAMES = [
  "About You",
  "Your Website",
  "Project Scope",
  "Submission",
];

// Website Type Options with Clean SVG Icons
const WEBSITE_TYPES = [
  { id: "Static Website", label: "Static Website", desc: "Ultra-fast, sleek presentation site for pure speed and simplicity.", icon: <Zap className="w-4 h-4 stroke-[2]" /> },
  { id: "Dynamic Website", label: "Dynamic Website", desc: "Interactive site with content management & database features.", icon: <RefreshCw className="w-4 h-4 stroke-[2]" /> },
  { id: "E-commerce Website", label: "E-commerce Website", desc: "Online storefront with product catalog, cart, and payment gateway.", icon: <ShoppingBag className="w-4 h-4 stroke-[2]" /> },
  { id: "Business / Corporate Website", label: "Business Website", desc: "Authoritative corporate hub establishing trust and market presence.", icon: <Building2 className="w-4 h-4 stroke-[2]" /> },
  { id: "Portfolio Website", label: "Portfolio Website", desc: "Curated showcase for designers, studios, architects & creators.", icon: <Palette className="w-4 h-4 stroke-[2]" /> },
  { id: "Landing Page", label: "Landing Page", desc: "High-impact conversion engine tailored for product launches.", icon: <Target className="w-4 h-4 stroke-[2]" /> },
  { id: "Booking / Appointment Website", label: "Booking Website", desc: "Interactive calendar system for bookings & appointments.", icon: <Calendar className="w-4 h-4 stroke-[2]" /> },
  { id: "Web Application", label: "Web Application", desc: "Custom software system, SaaS platform, or interactive web tool.", icon: <Code2 className="w-4 h-4 stroke-[2]" /> },
  { id: "Not Sure", label: "Not Sure", desc: "We'll evaluate your requirements and recommend the optimal stack.", icon: <HelpCircle className="w-4 h-4 stroke-[2]" /> },
];

// Website Purpose Options
const PURPOSE_OPTIONS = [
  "Sell products",
  "Generate leads",
  "Showcase my business",
  "Showcase services",
  "Build brand presence",
  "Portfolio",
  "Accept bookings / appointments",
  "Provide information",
  "Other",
];

// Feature Options
const FEATURE_OPTIONS = [
  "User Login / Registration",
  "Admin Dashboard",
  "Product Management",
  "Shopping Cart",
  "Payment Gateway",
  "Online Checkout",
  "Booking / Appointment System",
  "Contact Form",
  "Blog",
  "Search",
  "Reviews / Ratings",
  "Database",
  "User Dashboard",
  "Email Notifications",
  "WhatsApp Integration",
  "Google Maps",
  "Social Media Integration",
  "Analytics",
  "Other",
];

// Design Preferences with Clean SVG Icons
const DESIGN_PREFERENCES = [
  { id: "Modern", label: "Modern", icon: <Sparkles className="w-4 h-4 stroke-[2]" /> },
  { id: "Minimal", label: "Minimal", icon: <Square className="w-4 h-4 stroke-[2]" /> },
  { id: "Premium", label: "Premium", icon: <Gem className="w-4 h-4 stroke-[2]" /> },
  { id: "Corporate", label: "Corporate", icon: <Briefcase className="w-4 h-4 stroke-[2]" /> },
  { id: "Creative", label: "Creative", icon: <Brush className="w-4 h-4 stroke-[2]" /> },
  { id: "Luxury", label: "Luxury", icon: <Crown className="w-4 h-4 stroke-[2]" /> },
  { id: "Bold", label: "Bold", icon: <Zap className="w-4 h-4 stroke-[2]" /> },
  { id: "Clean", label: "Clean", icon: <CircleDot className="w-4 h-4 stroke-[2]" /> },
  { id: "Not Sure", label: "Not Sure", icon: <Search className="w-4 h-4 stroke-[2]" /> },
];

// Branding Assets
const BRANDING_ASSETS = [
  "Logo",
  "Brand Colors",
  "Brand Guidelines",
  "Product Images",
  "Business Images",
  "Marketing Materials",
  "None",
];

// Content Status Options
const CONTENT_OPTIONS = [
  "Yes, everything is ready",
  "Some content is ready",
  "No, I need help creating content",
  "Not sure",
];

// Budget Options
const BUDGET_OPTIONS = [
  { id: "Under $500", label: "Under $500", desc: "Ideal for single-page launches or starter sites." },
  { id: "$500 – $1,000", label: "$500 – $1,000", desc: "Standard multi-page business sites or streamlined portfolios." },
  { id: "$1,000 – $2,500", label: "$1,000 – $2,500", desc: "Comprehensive brand sites, e-commerce stores, or CMS builds." },
  { id: "$2,500 – $5,000", label: "$2,500 – $5,000", desc: "Advanced web applications, custom workflows, or high-tier animations." },
  { id: "$5,000+", label: "$5,000+", desc: "Full-scale custom platforms, SaaS builds, or bespoke design systems." },
  { id: "I'm not sure yet", label: "I'm not sure yet", desc: "We'll provide a transparent line-item estimate based on scope." },
];

// Timeline Options
const TIMELINE_OPTIONS = [
  { id: "ASAP", label: "ASAP", desc: "Priority sprint — high urgency" },
  { id: "Within 2 weeks", label: "Within 2 weeks", desc: "Rapid rollout schedule" },
  { id: "Within 1 month", label: "Within 1 month", desc: "Standard launch cadence" },
  { id: "1–3 months", label: "1–3 months", desc: "Full planning, design & engineering cycles" },
  { id: "I'm flexible", label: "I'm flexible", desc: "Ready when execution is perfected" },
];

// Lead Source Options
const LEAD_SOURCES = [
  { value: "", label: "SELECT AN OPTION..." },
  { value: "Google", label: "Google Search" },
  { value: "Instagram", label: "Instagram" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Facebook", label: "Facebook" },
  { value: "WhatsApp", label: "WhatsApp Recommendation" },
  { value: "Referral", label: "Friend / Colleague Referral" },
  { value: "Existing Client", label: "Existing Client" },
  { value: "Other", label: "Other Source" },
];

const INITIAL_FORM_STATE = {
  full_name: "",
  business_name: "",
  email: "",
  phone: "",
  preferred_contact_method: "WhatsApp",

  website_type: "Static Website",
  website_purpose: ["Showcase my business"],
  website_purpose_other: "",
  has_existing_website: "No",
  existing_website_url: "",
  business_description: "",

  required_features: ["Contact Form", "Social Media Integration"],
  required_features_other: "",
  design_preferences: ["Modern", "Clean"],
  design_reference_urls: "",
  branding_assets: ["Logo"],
  content_status: "Some content is ready",
  budget_range: "$1,000 – $2,500",
  timeline: "Within 1 month",
  has_domain: "Not sure",
  has_hosting: "Not sure",
  needs_hosting_help: "Maybe",

  additional_information: "",
  lead_source: "",
  contact_permission: false,
};

export function DesktopIntakePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [adminOpen, setAdminOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [autosavedNotice, setAutosavedNotice] = useState(false);

  // Restore draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pp_desktop_intake_draft");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) { }
  }, []);

  // Autosave to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pp_desktop_intake_draft", JSON.stringify(formData));
        setAutosavedNotice(true);
        const timer = setTimeout(() => setAutosavedNotice(false), 2000);
        return () => clearTimeout(timer);
      } catch (e) { }
    }
  }, [formData]);

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleArrayItem = (key: "website_purpose" | "required_features" | "design_preferences" | "branding_assets", item: string) => {
    const list = formData[key] || [];
    if (key === "branding_assets") {
      if (item === "None") {
        updateField(key, list.includes("None") ? [] : ["None"]);
        return;
      } else {
        const filtered = list.filter((i) => i !== "None");
        if (filtered.includes(item)) {
          updateField(key, filtered.filter((i) => i !== item));
        } else {
          updateField(key, [...filtered, item]);
        }
        return;
      }
    }

    if (list.includes(item)) {
      updateField(key, list.filter((i) => i !== item));
    } else {
      updateField(key, [...list, item]);
    }
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.full_name.trim()) {
        newErrors.full_name = "Full name is required.";
      }
      if (!formData.business_name.trim()) {
        newErrors.business_name = "Business / company name is required.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone or WhatsApp number is required.";
      } else if (formData.phone.trim().length < 6) {
        newErrors.phone = "Please enter a valid phone number.";
      }
      if (!formData.preferred_contact_method) {
        newErrors.preferred_contact_method = "Please select a preferred contact method.";
      }
    }

    if (step === 2) {
      if (!formData.website_type) {
        newErrors.website_type = "Please select what type of website you need.";
      }
      if (!formData.website_purpose || formData.website_purpose.length === 0) {
        newErrors.website_purpose = "Please select at least one main purpose.";
      } else if (
        formData.website_purpose.includes("Other") &&
        !formData.website_purpose_other.trim()
      ) {
        newErrors.website_purpose_other = "Please specify the other purpose.";
      }

      if (formData.has_existing_website === "Yes" && !formData.existing_website_url.trim()) {
        newErrors.existing_website_url = "Please enter your current website URL.";
      }

      if (!formData.business_description.trim()) {
        newErrors.business_description = "Please tell us briefly about your business or project.";
      } else if (formData.business_description.trim().length < 15) {
        newErrors.business_description = "Please write a bit more detail (at least 15 characters).";
      }
    }

    if (step === 3) {
      if (!formData.required_features || formData.required_features.length === 0) {
        newErrors.required_features = "Please select at least one required feature.";
      } else if (
        formData.required_features.includes("Other") &&
        !formData.required_features_other.trim()
      ) {
        newErrors.required_features_other = "Please specify your other required feature.";
      }

      if (!formData.budget_range) {
        newErrors.budget_range = "Please select an estimated budget range.";
      }
      if (!formData.timeline) {
        newErrors.timeline = "Please select when you need your website ready.";
      }
    }

    if (step === 4) {
      if (!formData.contact_permission) {
        newErrors.contact_permission = "You must agree to be contacted regarding your website enquiry.";
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxStepReached((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionSuccess(result);
        localStorage.removeItem("pp_desktop_intake_draft");
        window.scrollTo({ top: 100, behavior: "smooth" });
      } else {
        setErrors({ submit: result.error || "Failed to submit enquiry." });
      }
    } catch (err: any) {
      setErrors({ submit: "Network failure. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setCurrentStep(1);
    setMaxStepReached(1);
    setSubmissionSuccess(null);
    setErrors({});
  };

  return (
    <div className="min-h-screen desktop-grid text-[#28331E] select-text selection:bg-[#5D6D50] selection:text-[#FAF7EE] pb-16">
      {/* MAIN DESKTOP WORKSPACE */}
      <main className="max-w-4xl mx-auto px-4 space-y-6 sm:space-y-8 pt-8 sm:pt-14">
        {submissionSuccess ? (
          <DesktopSuccessView
            leadData={submissionSuccess.lead}
            leadSummary={submissionSuccess.summary}
            onReset={handleReset}
          />
        ) : (
          <>
            {/* WINDOW 1: Studio Profile Card */}
            <DesktopWindow
              showPeachAccent={false}
              className="mb-6"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-7 py-1">
                {/* Round PP Logo Badge */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[2.5px] border-[#28331E] bg-[#D6E0CC] shadow-[3px_3px_0px_#28331E] flex items-center justify-center p-3.5 shrink-0 overflow-hidden select-none relative">
                  <Image
                    src="/assets/pp-logo-v2.png"
                    alt="PP Logo"
                    width={72}
                    height={72}
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Studio Bio */}
                <div className="text-center sm:text-left space-y-1">
                  <span className="font-mono text-xs sm:text-sm text-[#526043]">
                    hi! we&apos;re
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#E68848] tracking-tight">
                    PP Labs
                  </h2>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#6A7859] block font-semibold">
                    DIGITAL PRODUCT DESIGN & FULL STACK
                  </span>
                  <p className="font-serif italic text-xs sm:text-sm text-[#4E5C40] pt-1">
                    &ldquo;Meaningful websites start with clear intention.&rdquo;
                  </p>
                </div>
              </div>
            </DesktopWindow>

            {/* WINDOW 2: Client Intake Form */}
            <div id="intake-window">
              <DesktopWindow
                showPeachAccent={true}
              >
                {/* Autosave Pill */}
                {autosavedNotice && (
                  <div className="mb-3 text-right">
                    <span className="font-mono text-[10px] bg-[#E8F3DE] border border-[#5D6D50] text-[#2F4D18] px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      <span>Draft Autosaved</span>
                    </span>
                  </div>
                )}

                {/* OS Folder Step Tabs */}
                <DesktopTabs
                  currentStep={currentStep}
                  totalSteps={4}
                  stepNames={STEP_NAMES}
                  maxStepReached={maxStepReached}
                  onSelectStep={(step) => {
                    if (validateStep(currentStep) || step < currentStep) {
                      setCurrentStep(step);
                    }
                  }}
                />

                {/* ========================================================================= */}
                {/* STEP 1: ABOUT YOU */}
                {/* ========================================================================= */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#28331E]/20 pb-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#28331E]">
                        Let&apos;s get to know you
                      </h2>
                      <p className="text-xs sm:text-sm text-[#556346] mt-1 leading-relaxed">
                        Tell us a little about yourself and your business so we know who we&apos;re working with.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <DesktopInput
                        label="Full Name"
                        sublabel="Your Name"
                        placeholder="Your full name"
                        icon={<User className="w-4 h-4 text-[#445236] stroke-[2]" />}
                        required
                        value={formData.full_name}
                        error={errors.full_name}
                        onChange={(e) => updateField("full_name", e.target.value)}
                      />

                      <DesktopInput
                        label="Business / Company Name"
                        sublabel="Company"
                        placeholder="Your business or company name"
                        icon={<Building2 className="w-4 h-4 text-[#445236] stroke-[2]" />}
                        required
                        value={formData.business_name}
                        error={errors.business_name}
                        onChange={(e) => updateField("business_name", e.target.value)}
                      />

                      <DesktopInput
                        label="Email Address"
                        sublabel="Direct Contact"
                        placeholder="you@example.com"
                        type="email"
                        icon={<Mail className="w-4 h-4 text-[#445236] stroke-[2]" />}
                        required
                        value={formData.email}
                        error={errors.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      />

                      <DesktopInput
                        label="Phone / WhatsApp Number"
                        sublabel="WhatsApp / Call"
                        placeholder="Your phone or WhatsApp number"
                        type="tel"
                        icon={<Phone className="w-4 h-4 text-[#445236] stroke-[2]" />}
                        required
                        value={formData.phone}
                        error={errors.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                      />
                    </div>

                    {/* Preferred Contact Method */}
                    <div className="pt-2">
                      <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 mb-2 uppercase tracking-wide">
                        <span>Preferred Contact Method</span>
                        <span className="text-[#EA7070]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {["WhatsApp", "Phone Call", "Email"].map((method) => (
                          <DesktopRadio
                            key={method}
                            label={method}
                            selected={formData.preferred_contact_method === method}
                            onSelect={() => updateField("preferred_contact_method", method)}
                          />
                        ))}
                      </div>
                      {errors.preferred_contact_method && (
                        <div className="mt-1 px-2.5 py-1 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
                          [!] {errors.preferred_contact_method}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* STEP 2: YOUR WEBSITE */}
                {/* ========================================================================= */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#28331E]/20 pb-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#28331E]">
                        Tell us about your website
                      </h2>
                      <p className="text-xs sm:text-sm text-[#556346] mt-1 leading-relaxed">
                        Help us understand what you&apos;re looking to build.
                      </p>
                    </div>

                    {/* Website Type Cards */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 uppercase tracking-wide">
                          <span>What type of website do you need?</span>
                          <span className="text-[#EA7070]">*</span>
                        </label>
                        <span className="font-mono text-[11px] text-[#6A7859]">[Choose one]</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {WEBSITE_TYPES.map((type) => (
                          <DesktopCard
                            key={type.id}
                            label={type.label}
                            description={type.desc}
                            icon={<span>{type.icon}</span>}
                            selected={formData.website_type === type.id}
                            onClick={() => updateField("website_type", type.id)}
                            isMulti={false}
                          />
                        ))}
                      </div>
                      {errors.website_type && (
                        <div className="mt-2 px-2.5 py-1 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
                          [!] {errors.website_type}
                        </div>
                      )}
                    </div>

                    {/* Website Purpose Checkboxes */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 uppercase tracking-wide">
                          <span>What is the main purpose of your website?</span>
                          <span className="text-[#EA7070]">*</span>
                        </label>
                        <span className="font-mono text-[11px] text-[#6A7859]">[Multiple selections]</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {PURPOSE_OPTIONS.map((purpose) => (
                          <DesktopCheckbox
                            key={purpose}
                            label={purpose}
                            checked={formData.website_purpose.includes(purpose)}
                            onChange={() => toggleArrayItem("website_purpose", purpose)}
                          />
                        ))}
                      </div>

                      {/* Other Purpose Input */}
                      {formData.website_purpose.includes("Other") && (
                        <div className="mt-3">
                          <DesktopInput
                            label="Specify Other Purpose"
                            placeholder="Tell us what custom purpose you have in mind..."
                            value={formData.website_purpose_other}
                            error={errors.website_purpose_other}
                            onChange={(e) => updateField("website_purpose_other", e.target.value)}
                          />
                        </div>
                      )}

                      {errors.website_purpose && (
                        <div className="mt-2 px-2.5 py-1 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
                          [!] {errors.website_purpose}
                        </div>
                      )}
                    </div>

                    {/* Existing Website Toggle */}
                    <div className="pt-2 border-t border-[#28331E]/15 pt-4">
                      <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 mb-2 uppercase tracking-wide">
                        <span>Do you already have a website?</span>
                        <span className="text-[#EA7070]">*</span>
                      </label>

                      <div className="grid grid-cols-2 gap-3 max-w-xs mb-3">
                        {["No", "Yes"].map((val) => (
                          <DesktopRadio
                            key={val}
                            label={val}
                            selected={formData.has_existing_website === val}
                            onSelect={() => updateField("has_existing_website", val)}
                          />
                        ))}
                      </div>

                      {formData.has_existing_website === "Yes" && (
                        <DesktopInput
                          label="Current Website URL"
                          sublabel="Existing Domain"
                          placeholder="https://yourcurrentsite.com"
                          icon={<Globe className="w-4 h-4 text-[#445236] stroke-[2]" />}
                          required
                          value={formData.existing_website_url}
                          error={errors.existing_website_url}
                          onChange={(e) => updateField("existing_website_url", e.target.value)}
                        />
                      )}
                    </div>

                    {/* Business Description */}
                    <div className="pt-2">
                      <DesktopTextarea
                        label="Tell us briefly about your business or project"
                        sublabel="Mission & Audience"
                        placeholder="Tell us what your business does, who your customers are, and what you want your website to achieve."
                        rows={4}
                        maxLength={1000}
                        required
                        value={formData.business_description}
                        error={errors.business_description}
                        onChange={(e) => updateField("business_description", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* STEP 3: PROJECT DETAILS */}
                {/* ========================================================================= */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#28331E]/20 pb-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#28331E]">
                        Let&apos;s define your project
                      </h2>
                      <p className="text-xs sm:text-sm text-[#556346] mt-1 leading-relaxed">
                        Tell us what you need so we can understand the scope of your project.
                      </p>
                    </div>

                    {/* Features (Like Tools grid in user's image!) */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 uppercase tracking-wide">
                          <span>What features do you need?</span>
                          <span className="text-[#EA7070]">*</span>
                        </label>
                        <span className="font-mono text-[11px] text-[#6A7859]">[Multiple selections]</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {FEATURE_OPTIONS.map((feat) => (
                          <DesktopCheckbox
                            key={feat}
                            label={feat}
                            checked={formData.required_features.includes(feat)}
                            onChange={() => toggleArrayItem("required_features", feat)}
                          />
                        ))}
                      </div>

                      {formData.required_features.includes("Other") && (
                        <div className="mt-3">
                          <DesktopInput
                            label="Specify Other Feature"
                            placeholder="Explain custom feature or integration..."
                            value={formData.required_features_other}
                            error={errors.required_features_other}
                            onChange={(e) => updateField("required_features_other", e.target.value)}
                          />
                        </div>
                      )}

                      {errors.required_features && (
                        <div className="mt-2 px-2.5 py-1 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
                          [!] {errors.required_features}
                        </div>
                      )}
                    </div>

                    {/* Design Preferences */}
                    <div className="pt-2 border-t border-[#28331E]/15 pt-4">
                      <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 mb-2 uppercase tracking-wide">
                        <span>What kind of design are you looking for?</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {DESIGN_PREFERENCES.map((pref) => (
                          <DesktopCard
                            key={pref.id}
                            label={pref.label}
                            icon={<span>{pref.icon}</span>}
                            selected={formData.design_preferences.includes(pref.id)}
                            onClick={() => toggleArrayItem("design_preferences", pref.id)}
                            isMulti={true}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Design References */}
                    <div className="pt-2">
                      <DesktopInput
                        label="Do you have any websites you like? (Optional)"
                        sublabel="Links & Inspiration"
                        placeholder="Paste links to websites whose design or functionality you like."
                        icon={<Link2 className="w-4 h-4 text-[#445236] stroke-[2]" />}
                        value={formData.design_reference_urls}
                        onChange={(e) => updateField("design_reference_urls", e.target.value)}
                      />
                    </div>

                    {/* Branding Assets */}
                    <div className="pt-2 border-t border-[#28331E]/15 pt-4">
                      <label className="font-mono text-xs sm:text-sm font-bold mb-2 block uppercase tracking-wide">
                        Do you already have branding assets?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {BRANDING_ASSETS.map((asset) => (
                          <DesktopCheckbox
                            key={asset}
                            label={asset}
                            checked={formData.branding_assets.includes(asset)}
                            onChange={() => toggleArrayItem("branding_assets", asset)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content Status */}
                    <div className="pt-2">
                      <label className="font-mono text-xs sm:text-sm font-bold mb-2 block uppercase tracking-wide">
                        Do you already have the content for the website?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {CONTENT_OPTIONS.map((opt) => (
                          <DesktopRadio
                            key={opt}
                            label={opt}
                            selected={formData.content_status === opt}
                            onSelect={() => updateField("content_status", opt)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Budget Cards */}
                    <div className="pt-2 border-t border-[#28331E]/15 pt-4">
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 uppercase tracking-wide">
                          <span>What is your approximate budget?</span>
                          <span className="text-[#EA7070]">*</span>
                        </label>
                        <span className="font-mono text-[11px] text-[#6A7859]">[No judgement]</span>
                      </div>
                      <p className="text-xs text-[#6A7859] mb-3">
                        We work with businesses at every stage. This helps us tailor the most effective roadmap.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {BUDGET_OPTIONS.map((b) => (
                          <DesktopCard
                            key={b.id}
                            label={b.label}
                            description={b.desc}
                            selected={formData.budget_range === b.id}
                            onClick={() => updateField("budget_range", b.id)}
                            isMulti={false}
                          />
                        ))}
                      </div>
                      {errors.budget_range && (
                        <div className="mt-2 px-2.5 py-1 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
                          [!] {errors.budget_range}
                        </div>
                      )}
                    </div>

                    {/* Timeline Cards */}
                    <div className="pt-2 border-t border-[#28331E]/15 pt-4">
                      <label className="font-mono text-xs sm:text-sm font-bold flex items-center gap-1 mb-2 uppercase tracking-wide">
                        <span>When would you like your website to be ready?</span>
                        <span className="text-[#EA7070]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {TIMELINE_OPTIONS.map((t) => (
                          <DesktopCard
                            key={t.id}
                            label={t.label}
                            description={t.desc}
                            selected={formData.timeline === t.id}
                            onClick={() => updateField("timeline", t.id)}
                            isMulti={false}
                          />
                        ))}
                      </div>
                      {errors.timeline && (
                        <div className="mt-2 px-2.5 py-1 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
                          [!] {errors.timeline}
                        </div>
                      )}
                    </div>

                    {/* Domain & Hosting */}
                    <div className="pt-2 border-t border-[#28331E]/15 pt-4 space-y-3">
                      <span className="font-mono text-xs sm:text-sm font-bold block uppercase tracking-wide">
                        Domain & Hosting Status
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <span className="font-mono text-xs block mb-1.5 text-[#556346]">Domain ready?</span>
                          <div className="space-y-1.5">
                            {["Yes", "No", "Not sure"].map((v) => (
                              <DesktopRadio
                                key={v}
                                label={v}
                                selected={formData.has_domain === v}
                                onSelect={() => updateField("has_domain", v)}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="font-mono text-xs block mb-1.5 text-[#556346]">Hosting ready?</span>
                          <div className="space-y-1.5">
                            {["Yes", "No", "Not sure"].map((v) => (
                              <DesktopRadio
                                key={v}
                                label={v}
                                selected={formData.has_hosting === v}
                                onSelect={() => updateField("has_hosting", v)}
                              />
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="font-mono text-xs block mb-1.5 text-[#556346]">Need hosting help?</span>
                          <div className="space-y-1.5">
                            {["Yes", "No", "Maybe"].map((v) => (
                              <DesktopRadio
                                key={v}
                                label={v}
                                selected={formData.needs_hosting_help === v}
                                onSelect={() => updateField("needs_hosting_help", v)}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* STEP 4: FINAL DETAILS & SUBMISSION */}
                {/* ========================================================================= */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="border-b border-[#28331E]/20 pb-3">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#28331E]">
                        Anything else?
                      </h2>
                      <p className="text-xs sm:text-sm text-[#556346] mt-1 leading-relaxed">
                        Final review, additional context, and agreement before submitting to PP Labs.
                      </p>
                    </div>

                    <div>
                      <DesktopTextarea
                        label="Is there anything else you'd like us to know?"
                        sublabel="Specific Ideas or Challenges"
                        placeholder="Tell us about any specific requirements, ideas, challenges, or features you have in mind."
                        rows={3}
                        value={formData.additional_information}
                        onChange={(e) => updateField("additional_information", e.target.value)}
                      />
                    </div>

                    <div>
                      <DesktopSelect
                        label="How Did You Hear About Us?"
                        sublabel="Optional Source"
                        options={LEAD_SOURCES}
                        value={formData.lead_source}
                        onChange={(val) => updateField("lead_source", val)}
                      />
                    </div>

                    {/* Telemetry Preview Box (PRD Section 14) */}
                    <div className="rounded-xl border-[1.5px] border-[#28331E] bg-[#FFFFFF] p-4 shadow-[2px_2px_0px_rgba(40,51,30,0.1)] font-mono text-xs">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#28331E]/20 text-[#5D6D50] font-bold">
                        <span>LEAD SUMMARY TELEMETRY PREVIEW</span>
                        <span>PRD SEC 14</span>
                      </div>

                      <div className="space-y-1 text-[#28331E] bg-[#FAF7EE] p-3 rounded-lg border border-[#EDE7DA]">
                        <div><strong>Client:</strong> {formData.full_name || "(Name pending)"}</div>
                        <div><strong>Business:</strong> {formData.business_name || "(Business pending)"}</div>
                        <div><strong>Website:</strong> {formData.website_type}</div>
                        <div><strong>Budget:</strong> {formData.budget_range}</div>
                        <div><strong>Timeline:</strong> {formData.timeline}</div>
                        <div>
                          <strong>Features:</strong>{" "}
                          {formData.required_features.length > 0
                            ? formData.required_features.join(", ")
                            : "None"}
                        </div>
                        <div>
                          <strong>Design:</strong>{" "}
                          {formData.design_preferences.length > 0
                            ? formData.design_preferences.join(", ")
                            : "Standard"}
                        </div>
                      </div>
                    </div>

                    {/* Contact Permission Checkbox */}
                    <div className="pt-2">
                      <DesktopCheckbox
                        label="I agree to be contacted regarding my website enquiry."
                        sublabel="Required agreement"
                        checked={formData.contact_permission}
                        onChange={(checked) => updateField("contact_permission", checked)}
                      />
                      {errors.contact_permission && (
                        <div className="mt-2 px-2.5 py-1 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-lg text-xs font-mono">
                          [!] {errors.contact_permission}
                        </div>
                      )}
                    </div>

                    {errors.submit && (
                      <div className="p-3 bg-[#FDE8E8] border border-[#EA7070] text-[#9A2626] rounded-xl text-xs font-mono">
                        Error submitting: {errors.submit}
                      </div>
                    )}

                    {/* Final CTA Banner (PRD Section 21) */}
                    <div className="rounded-xl bg-[#5D6D50] text-[#FAF7EE] p-4 text-center border-[2px] border-[#28331E] shadow-[3px_3px_0px_#28331E]">
                      <h3 className="font-bold text-sm sm:text-base">
                        Ready to build your website?
                      </h3>
                      <p className="text-xs text-[#E6EBDD] mt-0.5">
                        Tell us what you have in mind. We&apos;ll review your requirements and get back to you.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Bar */}
                <div className="mt-8 pt-4 border-t border-[#28331E]/20 flex flex-wrap items-center justify-between gap-3">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2.5 rounded-xl bg-[#EDE7DA] border-[1.5px] border-[#28331E] text-xs font-mono font-bold hover:bg-[#E5DFCE] cursor-pointer shadow-[2px_2px_0px_#28331E]"
                    >
                      ← Previous Phase
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5D6D50] text-[#FAF7EE] border-[2px] border-[#28331E] text-xs sm:text-sm font-mono font-bold tracking-wide hover:bg-[#687B5B] cursor-pointer shadow-[3px_3px_0px_#28331E] transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <span>Continue to Phase 0{currentStep + 1}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className={`
                        ml-auto inline-flex items-center gap-2.5 px-8 py-3 rounded-xl bg-[#E68848] text-white border-[2.5px] border-[#28331E]
                        text-xs sm:text-sm font-mono font-black tracking-wider uppercase shadow-[3px_3px_0px_#28331E] transition-all
                        ${isSubmitting ? "opacity-75 cursor-wait" : "hover:bg-[#EF9558] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[1px_1px_0px_#28331E] cursor-pointer"}
                      `}
                    >
                      <span>{isSubmitting ? "Transmitting Data..." : "Send My Project Enquiry"}</span>
                      {isSubmitting ? (
                        <RefreshCw className="w-4 h-4 stroke-[2.5] animate-spin" />
                      ) : (
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </button>
                  )}
                </div>
              </DesktopWindow>
            </div>
          </>
        )}
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM OLIVE DOCK RIBBON BAR (LinkedIn, WhatsApp, GitHub) */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#6C7D5D] border-y-[2.5px] border-[#28331E] py-2.5 sm:py-3.5 mt-12 sm:mt-16 shadow-[0_2px_4px_rgba(40,51,30,0.1)]">
        <div className="max-w-md mx-auto flex items-center justify-center gap-5 sm:gap-7 px-4">
          <DockIcon type="linkedin" href="https://linkedin.com" />
          <DockIcon type="whatsapp" href="https://wa.me/447343124861?text=hello%20PP%20labs" />
          <DockIcon type="github" href="https://github.com" />
        </div>
      </div>

      {/* Admin Leads Modal */}
      <DesktopAdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
