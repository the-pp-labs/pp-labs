"use client";

import React, { useState, useEffect } from "react";
import { RetroHeader } from "./RetroHeader";
import { StepTabs } from "./StepTabs";
import { RetroInput } from "./RetroInput";
import { RetroTextarea } from "./RetroTextarea";
import { RetroCard } from "./RetroCard";
import { RetroCheckbox, RetroRadio } from "./RetroCheckboxRadio";
import { RetroSelect } from "./RetroSelect";
import { AdminDossierModal } from "./AdminDossierModal";
import { SubmissionSuccessView } from "./SubmissionSuccessView";
import { retroSound } from "./RetroAudio";

// Step Names
const STEP_NAMES = [
  "About You",
  "Your Website",
  "Project Details",
  "Final Details",
];

// Website Type Options with Retro Icons
const WEBSITE_TYPES = [
  { id: "Static Website", label: "Static Website", desc: "Fast, sleek presentation site for pure speed and simplicity.", icon: "⚡" },
  { id: "Dynamic Website", label: "Dynamic Website", desc: "Interactive site with content management & database features.", icon: "🔄" },
  { id: "E-commerce Website", label: "E-commerce Website", desc: "Online storefront with product catalog, cart, and payment gateway.", icon: "🛍️" },
  { id: "Business / Corporate Website", label: "Business Website", desc: "Authoritative corporate hub establishing trust and authority.", icon: "🏢" },
  { id: "Portfolio Website", label: "Portfolio Website", desc: "Curated showcase for designers, architects, photographers & artists.", icon: "🎨" },
  { id: "Landing Page", label: "Landing Page", desc: "High-impact conversion engine tailored for marketing campaigns.", icon: "🚀" },
  { id: "Booking / Appointment Website", label: "Booking Website", desc: "Interactive calendar system for appointments & scheduling.", icon: "📅" },
  { id: "Web Application", label: "Web Application", desc: "Custom software system, SaaS platform, or interactive web tool.", icon: "💻" },
  { id: "Not Sure", label: "Not Sure", desc: "We'll evaluate your goals and recommend the optimal technology stack.", icon: "❓" },
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

// Design Preferences
const DESIGN_PREFERENCES = [
  { id: "Modern", label: "Modern", icon: "💎" },
  { id: "Minimal", label: "Minimal", icon: "📐" },
  { id: "Premium", label: "Premium", icon: "✨" },
  { id: "Corporate", label: "Corporate", icon: "🏛️" },
  { id: "Creative", label: "Creative", icon: "🎨" },
  { id: "Luxury", label: "Luxury", icon: "👑" },
  { id: "Bold", label: "Bold", icon: "⚡" },
  { id: "Clean", label: "Clean", icon: "⚪" },
  { id: "Not Sure", label: "Not Sure", icon: "🔍" },
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
  { id: "Under $500", label: "Under $500", desc: "Ideal for starter landing pages or single-page launches." },
  { id: "$500 – $1,000", label: "$500 – $1,000", desc: "Standard multi-page business sites or streamlined portfolios." },
  { id: "$1,000 – $2,500", label: "$1,000 – $2,500", desc: "Comprehensive brand sites, e-commerce stores, or CMS integrations." },
  { id: "$2,500 – $5,000", label: "$2,500 – $5,000", desc: "Advanced web applications, custom workflows, or high-tier animations." },
  { id: "$5,000+", label: "$5,000+", desc: "Full-scale custom platforms, SaaS builds, or bespoke design systems." },
  { id: "I'm not sure yet", label: "I'm not sure yet", desc: "We'll provide a transparent line-item estimate based on scope." },
];

// Timeline Options
const TIMELINE_OPTIONS = [
  { id: "ASAP", label: "ASAP", desc: "Priority sprint — high urgency" },
  { id: "Within 2 weeks", label: "Within 2 weeks", desc: "Rapid rollout schedule" },
  { id: "Within 1 month", label: "Within 1 month", desc: "Standard healthy launch cadence" },
  { id: "1–3 months", label: "1–3 months", desc: "Full planning, design & engineering cycles" },
  { id: "I'm flexible", label: "I'm flexible", desc: "Ready when precision execution is achieved" },
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
  // Step 1
  full_name: "",
  business_name: "",
  email: "",
  phone: "",
  preferred_contact_method: "WhatsApp",

  // Step 2
  website_type: "Static Website",
  website_purpose: ["Showcase my business"],
  website_purpose_other: "",
  has_existing_website: "No",
  existing_website_url: "",
  business_description: "",

  // Step 3
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

  // Step 4
  additional_information: "",
  lead_source: "",
  contact_permission: false,
};

export function ClientIntakeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [crtActive, setCrtActive] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any>(null);
  const [autosavedNotice, setAutosavedNotice] = useState(false);

  // Restore draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pp_intake_draft_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch (e) {}
  }, []);

  // Autosave to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("pp_intake_draft_v1", JSON.stringify(formData));
        setAutosavedNotice(true);
        const timer = setTimeout(() => setAutosavedNotice(false), 2000);
        return () => clearTimeout(timer);
      } catch (e) {}
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
      retroSound.playError();
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      retroSound.playBeep(880, 0.05);
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setMaxStepReached((prev) => Math.max(prev, nextStep));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    retroSound.playClick();
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    try {
      setIsSubmitting(true);
      retroSound.playBeep(920, 0.1);

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        retroSound.playSuccess();
        setSubmissionSuccess(result);
        localStorage.removeItem("pp_intake_draft_v1");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        retroSound.playError();
        setErrors({ submit: result.error || "Failed to submit enquiry." });
      }
    } catch (err: any) {
      retroSound.playError();
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
    <div className={`min-h-screen bg-[#8B966F] text-[#141811] relative select-text selection:bg-[#141811] selection:text-[#D1DCC0] ${crtActive ? "scanline-overlay" : ""}`}>
      {/* Retro Console Header */}
      <RetroHeader
        crtActive={crtActive}
        onToggleCrt={() => setCrtActive(!crtActive)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Terminal Frame */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        {submissionSuccess ? (
          <SubmissionSuccessView
            leadData={submissionSuccess.lead}
            leadSummary={submissionSuccess.summary}
            onReset={handleReset}
          />
        ) : (
          <div className="space-y-6">
            {/* Top LCD Display Title matching Image 2 "RETRO UI" */}
            <div className="border-[3px] border-[#141811] bg-[#828D67] p-4 sm:p-6 retro-shadow flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-retro opacity-80 mb-1">
                <span>[ PROTOCOL: CLIENT_PROJECT_INTAKE ]</span>
                {autosavedNotice && (
                  <span className="bg-[#141811] text-[#D1DCC0] px-1.5 py-0.5 text-[9px] animate-pulse">
                    AUTOSAVED
                  </span>
                )}
              </div>

              {/* Digital Pixel Display Title matching Image 2 Title */}
              <h1 className="font-retro text-2xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#141811] drop-shadow-[2px_2px_0px_#A1AC86] my-1 uppercase">
                RETRO INTAKE
              </h1>

              <p className="font-retro-mono text-xs sm:text-sm text-[#27321E] max-w-xl mt-1 tracking-wide">
                PP LABS // WEBSITE DESIGN SPECIFICATION & CLIENT INTAKE
              </p>
            </div>

            {/* Segmented Step Tabs matching Image 2 Bottom Tabs */}
            <StepTabs
              currentStep={currentStep}
              totalSteps={4}
              stepNames={STEP_NAMES}
              maxStepReached={maxStepReached}
              onSelectStep={(step) => {
                if (validateStep(currentStep) || step < currentStep) {
                  setCurrentStep(step);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />

            {/* Step Form Box */}
            <div className="border-[3px] border-[#141811] bg-[#8F9975] p-4 sm:p-8 retro-shadow">
              {/* ========================================================================= */}
              {/* STEP 1: ABOUT YOU */}
              {/* ========================================================================= */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Step Header */}
                  <div className="border-b-[2px] border-[#141811] pb-4">
                    <span className="font-retro text-[10px] bg-[#141811] text-[#D1DCC0] px-2 py-0.5 inline-block mb-1.5">
                      STEP 01 // 04
                    </span>
                    <h2 className="font-retro text-xl sm:text-2xl font-black">
                      Let&apos;s get to know you
                    </h2>
                    <p className="font-retro-mono text-xs sm:text-sm text-[#27321E] mt-1">
                      Tell us a little about yourself and your business so we know who we&apos;re working with.
                    </p>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Full Name */}
                    <RetroInput
                      label="FULL NAME"
                      sublabel="YOUR IDENTITY"
                      placeholder="YOUR FULL NAME"
                      icon="👤"
                      required
                      value={formData.full_name}
                      error={errors.full_name}
                      onChange={(e) => updateField("full_name", e.target.value)}
                    />

                    {/* Business / Company Name */}
                    <RetroInput
                      label="BUSINESS / COMPANY NAME"
                      sublabel="ORGANISATION"
                      placeholder="YOUR BUSINESS OR COMPANY NAME"
                      icon="🏢"
                      required
                      value={formData.business_name}
                      error={errors.business_name}
                      onChange={(e) => updateField("business_name", e.target.value)}
                    />

                    {/* Email Address */}
                    <RetroInput
                      label="EMAIL ADDRESS"
                      sublabel="DIGITAL INBOX"
                      placeholder="YOU@EXAMPLE.COM"
                      type="email"
                      icon="✉️"
                      required
                      value={formData.email}
                      error={errors.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />

                    {/* Phone / WhatsApp Number */}
                    <RetroInput
                      label="PHONE / WHATSAPP NUMBER"
                      sublabel="DIRECT COMMS"
                      placeholder="YOUR PHONE OR WHATSAPP NUMBER"
                      type="tel"
                      icon="📞"
                      required
                      value={formData.phone}
                      error={errors.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="pt-2">
                    <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1 mb-2">
                      <span>PREFERRED CONTACT METHOD</span>
                      <span className="text-[#A26868]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {["WhatsApp", "Phone Call", "Email"].map((method) => (
                        <RetroRadio
                          key={method}
                          label={method}
                          selected={formData.preferred_contact_method === method}
                          onSelect={() => updateField("preferred_contact_method", method)}
                        />
                      ))}
                    </div>
                    {errors.preferred_contact_method && (
                      <div className="mt-1 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px]">
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
                <div className="space-y-6 animate-fadeIn">
                  {/* Step Header */}
                  <div className="border-b-[2px] border-[#141811] pb-4">
                    <span className="font-retro text-[10px] bg-[#141811] text-[#D1DCC0] px-2 py-0.5 inline-block mb-1.5">
                      STEP 02 // 04
                    </span>
                    <h2 className="font-retro text-xl sm:text-2xl font-black">
                      Tell us about your website
                    </h2>
                    <p className="font-retro-mono text-xs sm:text-sm text-[#27321E] mt-1">
                      Help us understand what you&apos;re looking to build.
                    </p>
                  </div>

                  {/* Website Type (Cards / Radio) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1">
                        <span>WHAT TYPE OF WEBSITE DO YOU NEED?</span>
                        <span className="text-[#A26868]">*</span>
                      </label>
                      <span className="font-retro-mono text-[10px] opacity-80">[CHOOSE ONE]</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {WEBSITE_TYPES.map((type) => (
                        <RetroCard
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
                      <div className="mt-2 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px]">
                        [!] {errors.website_type}
                      </div>
                    )}
                  </div>

                  {/* Website Purpose (Checkboxes) */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1">
                        <span>WHAT IS THE MAIN PURPOSE OF YOUR WEBSITE?</span>
                        <span className="text-[#A26868]">*</span>
                      </label>
                      <span className="font-retro-mono text-[10px] opacity-80">[MULTIPLE CHOICES]</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {PURPOSE_OPTIONS.map((purpose) => (
                        <RetroCheckbox
                          key={purpose}
                          label={purpose}
                          checked={formData.website_purpose.includes(purpose)}
                          onChange={() => toggleArrayItem("website_purpose", purpose)}
                        />
                      ))}
                    </div>

                    {/* Progressive Disclosure: Other text input */}
                    {formData.website_purpose.includes("Other") && (
                      <div className="mt-3">
                        <RetroInput
                          label="SPECIFY OTHER PURPOSE"
                          placeholder="EXPLAIN SPECIFIC PURPOSE..."
                          value={formData.website_purpose_other}
                          error={errors.website_purpose_other}
                          onChange={(e) => updateField("website_purpose_other", e.target.value)}
                        />
                      </div>
                    )}

                    {errors.website_purpose && (
                      <div className="mt-2 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px]">
                        [!] {errors.website_purpose}
                      </div>
                    )}
                  </div>

                  {/* Existing Website Radio & Progressive Disclosure */}
                  <div className="pt-2 border-t-[1.5px] border-[#141811] pt-4">
                    <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1 mb-2">
                      <span>DO YOU ALREADY HAVE A WEBSITE?</span>
                      <span className="text-[#A26868]">*</span>
                    </label>

                    <div className="grid grid-cols-2 gap-3 max-w-sm mb-3">
                      {["No", "Yes"].map((val) => (
                        <RetroRadio
                          key={val}
                          label={val}
                          selected={formData.has_existing_website === val}
                          onSelect={() => updateField("has_existing_website", val)}
                        />
                      ))}
                    </div>

                    {/* If YES: show URL input */}
                    {formData.has_existing_website === "Yes" && (
                      <div className="animate-fadeIn">
                        <RetroInput
                          label="CURRENT WEBSITE URL"
                          sublabel="EXISTING ONLINE LOCATION"
                          placeholder="HTTPS://YOURCURRENTSITE.COM"
                          icon="🌐"
                          required
                          value={formData.existing_website_url}
                          error={errors.existing_website_url}
                          onChange={(e) => updateField("existing_website_url", e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* Business Description */}
                  <div className="pt-2">
                    <RetroTextarea
                      label="TELL US BRIEFLY ABOUT YOUR BUSINESS OR PROJECT"
                      sublabel="CORE MISSION & TARGET CLIENTS"
                      placeholder="Tell us what your business does, who your customers are, and what you want your website to achieve."
                      rows={5}
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
                <div className="space-y-6 animate-fadeIn">
                  {/* Step Header */}
                  <div className="border-b-[2px] border-[#141811] pb-4">
                    <span className="font-retro text-[10px] bg-[#141811] text-[#D1DCC0] px-2 py-0.5 inline-block mb-1.5">
                      STEP 03 // 04
                    </span>
                    <h2 className="font-retro text-xl sm:text-2xl font-black">
                      Let&apos;s define your project
                    </h2>
                    <p className="font-retro-mono text-xs sm:text-sm text-[#27321E] mt-1">
                      Tell us what you need so we can understand the scope of your project.
                    </p>
                  </div>

                  {/* Required Features */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1">
                        <span>WHAT FEATURES DO YOU NEED?</span>
                        <span className="text-[#A26868]">*</span>
                      </label>
                      <span className="font-retro-mono text-[10px] opacity-80">[MULTIPLE CHOICES]</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                      {FEATURE_OPTIONS.map((feat) => (
                        <RetroCheckbox
                          key={feat}
                          label={feat}
                          checked={formData.required_features.includes(feat)}
                          onChange={() => toggleArrayItem("required_features", feat)}
                        />
                      ))}
                    </div>

                    {formData.required_features.includes("Other") && (
                      <div className="mt-3">
                        <RetroInput
                          label="SPECIFY OTHER FEATURE(S)"
                          placeholder="EXPLAIN REQUIRED CUSTOM CAPABILITY..."
                          value={formData.required_features_other}
                          error={errors.required_features_other}
                          onChange={(e) => updateField("required_features_other", e.target.value)}
                        />
                      </div>
                    )}

                    {errors.required_features && (
                      <div className="mt-2 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px]">
                        [!] {errors.required_features}
                      </div>
                    )}
                  </div>

                  {/* Design Preferences */}
                  <div className="pt-2 border-t-[1.5px] border-[#141811] pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1">
                        <span>WHAT KIND OF DESIGN ARE YOU LOOKING FOR?</span>
                      </label>
                      <span className="font-retro-mono text-[10px] opacity-80">[AESTHETIC DIRECTIONS]</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {DESIGN_PREFERENCES.map((pref) => (
                        <RetroCard
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
                    <RetroInput
                      label="DO YOU HAVE ANY WEBSITES YOU LIKE? (OPTIONAL)"
                      sublabel="INSPIRATION & REFERENCE LINKS"
                      placeholder="Paste links to websites whose design or functionality you like."
                      icon="🔗"
                      value={formData.design_reference_urls}
                      onChange={(e) => updateField("design_reference_urls", e.target.value)}
                    />
                  </div>

                  {/* Logo & Branding */}
                  <div className="pt-2 border-t-[1.5px] border-[#141811] pt-4">
                    <label className="font-retro text-xs sm:text-sm font-bold mb-2 block">
                      DO YOU ALREADY HAVE BRANDING ASSETS?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BRANDING_ASSETS.map((asset) => (
                        <RetroCheckbox
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
                    <label className="font-retro text-xs sm:text-sm font-bold mb-2 block">
                      DO YOU ALREADY HAVE THE CONTENT FOR THE WEBSITE?
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {CONTENT_OPTIONS.map((opt) => (
                        <RetroRadio
                          key={opt}
                          label={opt}
                          selected={formData.content_status === opt}
                          onSelect={() => updateField("content_status", opt)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Budget Section (PRD Section 7) */}
                  <div className="pt-2 border-t-[1.5px] border-[#141811] pt-4">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1">
                        <span>WHAT IS YOUR APPROXIMATE BUDGET?</span>
                        <span className="text-[#A26868]">*</span>
                      </label>
                      <span className="font-retro-mono text-[10px] opacity-80">[NO JUDGEMENT]</span>
                    </div>
                    <p className="font-retro-mono text-[11px] text-[#2F3826] mb-3">
                      We craft tailored solutions across budgets. This helps us optimize tech stack & architecture.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {BUDGET_OPTIONS.map((b) => (
                        <RetroCard
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
                      <div className="mt-2 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px]">
                        [!] {errors.budget_range}
                      </div>
                    )}
                  </div>

                  {/* Timeline (PRD Section 8) */}
                  <div className="pt-2 border-t-[1.5px] border-[#141811] pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="font-retro text-xs sm:text-sm font-bold flex items-center gap-1">
                        <span>WHEN WOULD YOU LIKE YOUR WEBSITE TO BE READY?</span>
                        <span className="text-[#A26868]">*</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {TIMELINE_OPTIONS.map((t) => (
                        <RetroCard
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
                      <div className="mt-2 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px]">
                        [!] {errors.timeline}
                      </div>
                    )}
                  </div>

                  {/* Domain & Hosting (PRD Section 9) */}
                  <div className="pt-2 border-t-[1.5px] border-[#141811] pt-4 space-y-3">
                    <span className="font-retro text-xs sm:text-sm font-bold block">
                      DOMAIN & HOSTING STATUS
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="font-retro text-[10px] block mb-1">DO YOU HAVE A DOMAIN?</span>
                        <div className="space-y-1">
                          {["Yes", "No", "Not sure"].map((v) => (
                            <RetroRadio
                              key={v}
                              label={v}
                              selected={formData.has_domain === v}
                              onSelect={() => updateField("has_domain", v)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-retro text-[10px] block mb-1">DO YOU HAVE HOSTING?</span>
                        <div className="space-y-1">
                          {["Yes", "No", "Not sure"].map((v) => (
                            <RetroRadio
                              key={v}
                              label={v}
                              selected={formData.has_hosting === v}
                              onSelect={() => updateField("has_hosting", v)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-retro text-[10px] block mb-1">NEED HELP WITH HOSTING?</span>
                        <div className="space-y-1">
                          {["Yes", "No", "Maybe"].map((v) => (
                            <RetroRadio
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
                <div className="space-y-6 animate-fadeIn">
                  {/* Step Header */}
                  <div className="border-b-[2px] border-[#141811] pb-4">
                    <span className="font-retro text-[10px] bg-[#141811] text-[#D1DCC0] px-2 py-0.5 inline-block mb-1.5">
                      STEP 04 // 04
                    </span>
                    <h2 className="font-retro text-xl sm:text-2xl font-black">
                      Anything else?
                    </h2>
                    <p className="font-retro-mono text-xs sm:text-sm text-[#27321E] mt-1">
                      Final details, review, and agreement before transmission to PP Labs.
                    </p>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <RetroTextarea
                      label="IS THERE ANYTHING ELSE YOU'D LIKE US TO KNOW?"
                      sublabel="SPECIAL REQUIREMENTS OR CHALLENGES"
                      placeholder="Tell us about any specific requirements, ideas, challenges, or features you have in mind."
                      rows={4}
                      value={formData.additional_information}
                      onChange={(e) => updateField("additional_information", e.target.value)}
                    />
                  </div>

                  {/* How Did You Hear About Us */}
                  <div>
                    <RetroSelect
                      label="HOW DID YOU HEAR ABOUT US?"
                      sublabel="OPTIONAL ATTRIBUTION"
                      options={LEAD_SOURCES}
                      value={formData.lead_source}
                      onChange={(val) => updateField("lead_source", val)}
                    />
                  </div>

                  {/* Pre-submission Summary Preview Box (PRD Section 14 Live Preview) */}
                  <div className="border-[2px] border-[#141811] bg-[#828D67] p-3.5 sm:p-4 retro-shadow-sm font-retro">
                    <div className="flex items-center justify-between text-[11px] mb-2 border-b border-[#141811] pb-1.5">
                      <span className="font-black">TELEMETRY PREVIEW // LEAD SUMMARY</span>
                      <span className="font-retro-mono text-[10px]">[PRD SEC 14]</span>
                    </div>

                    <div className="font-retro-mono text-xs bg-[#939E79] p-3 border border-[#141811] space-y-1 text-[#141811]">
                      <div><strong>LEAD:</strong> {formData.full_name || "(Pending name)"}</div>
                      <div><strong>BUSINESS:</strong> {formData.business_name || "(Pending business)"}</div>
                      <div><strong>WEBSITE:</strong> {formData.website_type}</div>
                      <div><strong>BUDGET:</strong> {formData.budget_range}</div>
                      <div><strong>TIMELINE:</strong> {formData.timeline}</div>
                      <div>
                        <strong>FEATURES:</strong>{" "}
                        {formData.required_features.length > 0
                          ? formData.required_features.join(", ")
                          : "None selected"}
                      </div>
                      <div>
                        <strong>DESIGN:</strong>{" "}
                        {formData.design_preferences.length > 0
                          ? formData.design_preferences.join(", ")
                          : "None specified"}
                      </div>
                      <div>
                        <strong>EXISTING SITE:</strong>{" "}
                        {formData.has_existing_website === "Yes"
                          ? formData.existing_website_url || "Yes"
                          : "No"}
                      </div>
                    </div>
                  </div>

                  {/* Contact Permission Checkbox (PRD Section 10) */}
                  <div className="pt-2">
                    <RetroCheckbox
                      label="I agree to be contacted regarding my website enquiry."
                      sublabel="REQUIRED CONSENT"
                      checked={formData.contact_permission}
                      onChange={(checked) => updateField("contact_permission", checked)}
                    />
                    {errors.contact_permission && (
                      <div className="mt-2 px-2.5 py-1.5 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-[10px]">
                        [!] {errors.contact_permission}
                      </div>
                    )}
                  </div>

                  {/* General Submit Error */}
                  {errors.submit && (
                    <div className="px-3 py-2 bg-[#A26868] border-[2px] border-[#141811] text-[#141811] font-retro text-xs">
                      [TRANSMISSION ERROR]: {errors.submit}
                    </div>
                  )}

                  {/* Final CTA Banner (PRD Section 21) */}
                  <div className="bg-[#141811] text-[#D1DCC0] p-4 border-[2px] border-[#141811] text-center space-y-1">
                    <h3 className="font-retro text-sm sm:text-base font-black">
                      Ready to build your website?
                    </h3>
                    <p className="font-retro-mono text-[11px] opacity-80 max-w-md mx-auto">
                      Tell us what you have in mind. We&apos;ll review your requirements and get back to you.
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Bar (Back / Continue / Submit) */}
              <div className="mt-8 pt-4 border-t-[2px] border-[#141811] flex flex-wrap items-center justify-between gap-3 font-retro">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="retro-pressable px-4 py-2.5 bg-[#828D67] border-[2px] border-[#141811] text-xs font-bold hover:bg-[#8F9A72] cursor-pointer"
                  >
                    ← PREVIOUS PHASE
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="retro-pressable ml-auto px-6 py-2.5 bg-[#141811] text-[#D1DCC0] border-[2px] border-[#141811] text-xs sm:text-sm font-bold tracking-wider hover:bg-[#22291d] cursor-pointer"
                  >
                    CONTINUE TO PHASE 0{currentStep + 1} →
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className={`
                      retro-pressable ml-auto px-8 py-3 bg-[#5A7788] text-[#E8EFE0] border-[2.5px] border-[#141811]
                      text-xs sm:text-sm font-black tracking-widest uppercase retro-shadow
                      ${isSubmitting ? "opacity-75 cursor-wait" : "hover:bg-[#688697] cursor-pointer"}
                    `}
                  >
                    {isSubmitting ? "[ TRANSMITTING DATA... ]" : "SEND MY PROJECT ENQUIRY 🚀"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Admin Leads Management Drawer / Modal */}
      <AdminDossierModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
