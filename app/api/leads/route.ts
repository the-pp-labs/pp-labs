import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const leadsFilePath = path.join(process.cwd(), "data", "leads.json");

// Helper to read leads safely
function getLeads() {
  try {
    if (!fs.existsSync(leadsFilePath)) {
      return [];
    }
    const data = fs.readFileSync(leadsFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading leads file:", err);
    return [];
  }
}

// Helper to write leads safely
function saveLeads(leads: any[]) {
  try {
    const dir = path.dirname(leadsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving leads file:", err);
  }
}

export async function GET() {
  const leads = getLeads();
  return NextResponse.json({ success: true, leads });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation for critical fields
    const {
      full_name,
      business_name,
      email,
      phone,
      preferred_contact_method,
      website_type,
      website_purpose,
      business_description,
      budget_range,
      timeline,
      contact_permission,
    } = body;

    if (!full_name || !business_name || !email || !phone || !website_type || !budget_range || !timeline) {
      return NextResponse.json(
        { success: false, error: "Please fill out all required fields." },
        { status: 400 }
      );
    }

    if (!contact_permission) {
      return NextResponse.json(
        { success: false, error: "Contact permission agreement is required." },
        { status: 400 }
      );
    }

    const now = new Date();
    const id = `LEAD-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submission_date = now.toISOString().split("T")[0];
    const submission_time = now.toTimeString().split(" ")[0];

    // Format features list for summary
    const featuresList = Array.isArray(body.required_features) && body.required_features.length > 0
      ? body.required_features.join(", ")
      : "Standard modern features";

    // Format design preferences for summary
    const designList = Array.isArray(body.design_preferences) && body.design_preferences.length > 0
      ? body.design_preferences.join(", ")
      : "Not specified";

    const hasExistingSite = body.has_existing_website === "Yes" && body.existing_website_url
      ? `Yes (${body.existing_website_url})`
      : "No";

    // Build the concise Lead Summary (PRD Section 14)
    const summary = [
      `Lead: ${full_name}`,
      `Business: ${business_name}`,
      `Website: ${website_type}`,
      `Budget: ${budget_range}`,
      `Timeline: ${timeline}`,
      `Features: ${featuresList}`,
      `Design: ${designList}`,
      `Existing Website: ${hasExistingSite}`,
    ].join("\n");

    const newLead = {
      id,
      created_at: now.toISOString(),
      submission_date,
      submission_time,
      lead_status: "New",
      ...body,
      summary,
    };

    const existingLeads = getLeads();
    existingLeads.unshift(newLead);
    saveLeads(existingLeads);

    return NextResponse.json({
      success: true,
      lead: newLead,
      summary,
    });
  } catch (error: any) {
    console.error("API /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process submission." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    const leads = getLeads();
    const leadIndex = leads.findIndex((l: any) => l.id === id);
    if (leadIndex === -1) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    leads[leadIndex].lead_status = status;
    saveLeads(leads);

    return NextResponse.json({ success: true, lead: leads[leadIndex] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
