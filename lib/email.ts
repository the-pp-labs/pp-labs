import { Resend } from "resend";
import nodemailer from "nodemailer";

export interface LeadEmailData {
  id: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  preferred_contact_method: string;
  website_type: string;
  website_purpose: string[] | string;
  has_existing_website?: string;
  existing_website_url?: string;
  business_description: string;
  required_features: string[] | string;
  design_preferences: string[] | string;
  design_reference_urls?: string;
  branding_assets?: string[] | string;
  content_status?: string;
  budget_range: string;
  timeline: string;
  has_domain?: string;
  has_hosting?: string;
  needs_hosting_help?: string;
  additional_information?: string;
  lead_source?: string;
  summary?: string;
  submission_date?: string;
  submission_time?: string;
}

/**
 * Generates an executive, beautifully styled HTML email template matching the PP Labs design system.
 */
function buildAdminNotificationHtml(lead: LeadEmailData, baseUrl: string) {
  const purposes = Array.isArray(lead.website_purpose)
    ? lead.website_purpose.join(", ")
    : lead.website_purpose || "None specified";

  const features = Array.isArray(lead.required_features)
    ? lead.required_features.join(", ")
    : lead.required_features || "None specified";

  const designPrefs = Array.isArray(lead.design_preferences)
    ? lead.design_preferences.join(", ")
    : lead.design_preferences || "None specified";

  const branding = Array.isArray(lead.branding_assets)
    ? lead.branding_assets.join(", ")
    : lead.branding_assets || "None specified";

  const cleanPhone = (lead.phone || "").replace(/[^0-9+]/g, "");
  const waLink = `https://wa.me/${cleanPhone.replace("+", "")}?text=Hi%20${encodeURIComponent(
    lead.full_name
  )},%20thank%20you%20for%20reaching%20out%20to%20PP%20Labs!`;

  const adminDashboardUrl = `${baseUrl}/admin`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Intake Alert</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4EFE6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #28331E;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F4EFE6; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; background-color: #FAF7EE; border: 2.5px solid #28331E; border-radius: 16px; box-shadow: 4px 6px 0px #28331E; overflow: hidden;">
          
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #5D6D50; padding: 16px 24px; border-bottom: 2px solid #28331E;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #FAF7EE; font-family: monospace; text-transform: uppercase;">PP LABS // WORKSTATION INTAKE</span>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; background-color: #48553E; color: #FAF7EE; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; font-family: monospace;">${lead.id}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Banner Section -->
          <tr>
            <td style="padding: 28px 24px 20px 24px; background-color: #FAF7EE; border-bottom: 1.5px solid #EDE7DA;">
              <div style="font-size: 11px; font-weight: 700; color: #E68848; text-transform: uppercase; letter-spacing: 0.12em; font-family: monospace; margin-bottom: 6px;">⚡ NEW CLIENT INQUIRY</div>
              <h1 style="margin: 0 0 8px 0; font-size: 26px; font-weight: 800; color: #28331E; line-height: 1.2;">${lead.full_name}</h1>
              <div style="font-size: 15px; color: #556346; font-weight: 600;">${lead.business_name || "Independent"} &bull; ${lead.website_type}</div>
            </td>
          </tr>

          <!-- Quick Metrics Grid -->
          <tr>
            <td style="padding: 20px 24px; background-color: #F2ECE0; border-bottom: 2px solid #28331E;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="33%" style="padding: 6px 4px; vertical-align: top;">
                    <div style="font-size: 10px; font-family: monospace; color: #6A7859; text-transform: uppercase; font-weight: bold;">BUDGET</div>
                    <div style="font-size: 14px; font-weight: 700; color: #28331E; margin-top: 2px;">${lead.budget_range}</div>
                  </td>
                  <td width="33%" style="padding: 6px 4px; vertical-align: top;">
                    <div style="font-size: 10px; font-family: monospace; color: #6A7859; text-transform: uppercase; font-weight: bold;">TIMELINE</div>
                    <div style="font-size: 14px; font-weight: 700; color: #28331E; margin-top: 2px;">${lead.timeline}</div>
                  </td>
                  <td width="34%" style="padding: 6px 4px; vertical-align: top;">
                    <div style="font-size: 10px; font-family: monospace; color: #6A7859; text-transform: uppercase; font-weight: bold;">CONTACT VIA</div>
                    <div style="font-size: 14px; font-weight: 700; color: #28331E; margin-top: 2px;">${lead.preferred_contact_method}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Information -->
          <tr>
            <td style="padding: 24px;">
              <h2 style="font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.08em; color: #5D6D50; margin: 0 0 12px 0;">CLIENT CONTACT DETAILS</h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="background-color: #FFFFFF; border: 1.5px solid #28331E; border-radius: 10px;">
                <tr>
                  <td width="30%" style="font-size: 12px; font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Email:</td>
                  <td style="font-size: 13px; font-weight: 600; color: #28331E; border-bottom: 1px solid #F0EAE1;">
                    <a href="mailto:${lead.email}" style="color: #28331E; text-decoration: underline;">${lead.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 12px; font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Phone / WhatsApp:</td>
                  <td style="font-size: 13px; font-weight: 600; color: #28331E; border-bottom: 1px solid #F0EAE1;">
                    <a href="tel:${cleanPhone}" style="color: #28331E; text-decoration: none;">${lead.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 12px; font-family: monospace; color: #6A7859;">Lead Source:</td>
                  <td style="font-size: 13px; color: #28331E;">${lead.lead_source || "Website Form direct"}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Description / Scope -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <h2 style="font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.08em; color: #5D6D50; margin: 0 0 12px 0;">PROJECT SCOPE & OBJECTIVES</h2>
              
              <div style="background-color: #FFFFFF; border: 1.5px solid #28331E; border-radius: 10px; padding: 16px; margin-bottom: 16px;">
                <div style="font-size: 11px; font-family: monospace; color: #6A7859; margin-bottom: 6px;">BUSINESS & PROJECT GOALS:</div>
                <div style="font-size: 13px; line-height: 1.6; color: #28331E;">${lead.business_description || "Not provided"}</div>
              </div>

              <!-- Specs Grid -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="background-color: #FFFFFF; border: 1.5px solid #28331E; border-radius: 10px; font-size: 12px;">
                <tr>
                  <td width="35%" style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Website Type:</td>
                  <td style="color: #28331E; font-weight: 600; border-bottom: 1px solid #F0EAE1;">${lead.website_type}</td>
                </tr>
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Objectives:</td>
                  <td style="color: #28331E; border-bottom: 1px solid #F0EAE1;">${purposes}</td>
                </tr>
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Required Features:</td>
                  <td style="color: #28331E; border-bottom: 1px solid #F0EAE1;">${features}</td>
                </tr>
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Design Styles:</td>
                  <td style="color: #28331E; border-bottom: 1px solid #F0EAE1;">${designPrefs}</td>
                </tr>
                ${lead.existing_website_url ? `
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Current Website:</td>
                  <td style="color: #28331E; border-bottom: 1px solid #F0EAE1;"><a href="${lead.existing_website_url}" target="_blank" style="color: #5D6D50;">${lead.existing_website_url}</a></td>
                </tr>` : ""}
                ${lead.design_reference_urls ? `
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Inspiration Links:</td>
                  <td style="color: #28331E; border-bottom: 1px solid #F0EAE1;">${lead.design_reference_urls}</td>
                </tr>` : ""}
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Branding Assets:</td>
                  <td style="color: #28331E; border-bottom: 1px solid #F0EAE1;">${branding}</td>
                </tr>
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-bottom: 1px solid #F0EAE1;">Content Status:</td>
                  <td style="color: #28331E; border-bottom: 1px solid #F0EAE1;">${lead.content_status || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="font-family: monospace; color: #6A7859;">Domain & Hosting:</td>
                  <td style="color: #28331E;">Domain: ${lead.has_domain || "N/A"} &bull; Hosting: ${lead.has_hosting || "N/A"} (Help: ${lead.needs_hosting_help || "N/A"})</td>
                </tr>
                ${lead.additional_information ? `
                <tr>
                  <td style="font-family: monospace; color: #6A7859; border-top: 1px solid #F0EAE1;">Additional Notes:</td>
                  <td style="color: #28331E; border-top: 1px solid #F0EAE1;">${lead.additional_information}</td>
                </tr>` : ""}
              </table>
            </td>
          </tr>

          <!-- Action Buttons -->
          <tr>
            <td style="padding: 0 24px 28px 24px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${adminDashboardUrl}" style="display: inline-block; background-color: #28331E; color: #FAF7EE; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 13px; font-family: monospace; letter-spacing: 0.05em; border: 2px solid #28331E;">
                      → OPEN IN ADMIN DASHBOARD
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <a href="${waLink}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-weight: 700; font-size: 12px; margin-right: 8px;">
                      💬 Reply via WhatsApp
                    </a>
                    <a href="mailto:${lead.email}?subject=PP%20Labs%20Project%20Inquiry%20-%20${encodeURIComponent(lead.business_name || lead.full_name)}" style="display: inline-block; background-color: #FAF7EE; color: #28331E; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-weight: 700; font-size: 12px; border: 1.5px solid #28331E;">
                      ✉️ Reply via Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td style="background-color: #EDE7DA; padding: 14px 24px; border-top: 2px solid #28331E; text-align: center;">
              <div style="font-size: 11px; font-family: monospace; color: #556346;">
                PP LABS &bull; Full-Stack Product Studio &bull; Automated Dispatch
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Builds confirmation email for client
 */
function buildClientConfirmationHtml(lead: LeadEmailData) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F4EFE6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#28331E;">
  <div style="max-width:560px;margin:30px auto;background:#FAF7EE;border:2.5px solid #28331E;border-radius:16px;box-shadow:4px 6px 0 #28331E;overflow:hidden;">
    <div style="background:#5D6D50;color:#FAF7EE;padding:16px 24px;font-family:monospace;font-weight:bold;font-size:12px;border-bottom:2px solid #28331E;">
      PP LABS // INTAKE CONFIRMATION &bull; ${lead.id}
    </div>
    <div style="padding:28px 24px;">
      <h1 style="margin:0 0 10px 0;font-size:22px;color:#28331E;">Hello ${lead.full_name},</h1>
      <p style="font-size:14px;line-height:1.6;color:#4E5C40;">
        Thank you for submitting your project intake details for <strong>${lead.business_name || "your new website"}</strong>.
      </p>
      <div style="background:#FFFFFF;border:1.5px solid #28331E;border-radius:10px;padding:16px;margin:20px 0;font-size:13px;line-height:1.6;">
        <div style="font-family:monospace;font-weight:bold;color:#5D6D50;margin-bottom:6px;">WHAT HAPPENS NEXT:</div>
        <div>1. Our engineering & design team is reviewing your project requirements.</div>
        <div>2. We will prepare an initial scope assessment and transparent estimate.</div>
        <div>3. You will hear from us via <strong>${lead.preferred_contact_method}</strong> within 24 business hours.</div>
      </div>
      <p style="font-size:13px;color:#6A7859;line-height:1.5;">
        If you have urgent updates or extra design assets, you can reply directly to this email or reach us anytime on WhatsApp.
      </p>
    </div>
    <div style="background:#EDE7DA;border-top:2px solid #28331E;padding:12px 24px;font-family:monospace;font-size:11px;color:#556346;text-align:center;">
      PP Labs &bull; London & Global &bull; thepplabs@gmail.com
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Main dispatcher: Sends notification email for a newly received lead.
 * Works seamlessly with Resend, SMTP (Nodemailer), or safe local simulation.
 */
export async function sendLeadNotificationEmail(lead: LeadEmailData): Promise<{
  success: boolean;
  provider: "resend" | "smtp" | "simulated";
  messageId?: string;
  error?: string;
}> {
  const recipientEmail =
    process.env.NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "thepplabs@gmail.com";

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const subject = `⚡ New Lead Alert: ${lead.full_name} (${lead.business_name || "New Client"}) — ${lead.budget_range}`;
  const htmlContent = buildAdminNotificationHtml(lead, baseUrl);

  // 1. Check for Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromAddress =
        process.env.EMAIL_FROM || "PP Labs Workstation <onboarding@resend.dev>";

      const resendResult = await resend.emails.send({
        from: fromAddress,
        to: recipientEmail,
        subject,
        html: htmlContent,
      });

      console.log(`[EMAIL DISPATCH] Sent via Resend to ${recipientEmail}:`, resendResult);

      // Optionally send client confirmation
      if (process.env.SEND_LEAD_CONFIRMATION === "true" && lead.email) {
        try {
          await resend.emails.send({
            from: fromAddress,
            to: lead.email,
            subject: `We've received your project inquiry // PP Labs (${lead.id})`,
            html: buildClientConfirmationHtml(lead),
          });
        } catch (confErr) {
          console.warn("[EMAIL DISPATCH] Client confirmation email warning:", confErr);
        }
      }

      return {
        success: true,
        provider: "resend",
        messageId: resendResult.data?.id,
      };
    } catch (err: any) {
      console.error("[EMAIL DISPATCH] Resend sending failed:", err);
      // Fall through to try SMTP if configured
    }
  }

  // 2. Check for SMTP (Nodemailer)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER;

      const smtpResult = await transporter.sendMail({
        from: `PP Labs <${fromAddress}>`,
        to: recipientEmail,
        subject,
        html: htmlContent,
      });

      console.log(`[EMAIL DISPATCH] Sent via SMTP to ${recipientEmail}:`, smtpResult.messageId);

      if (process.env.SEND_LEAD_CONFIRMATION === "true" && lead.email) {
        try {
          await transporter.sendMail({
            from: `PP Labs <${fromAddress}>`,
            to: lead.email,
            subject: `We've received your project inquiry // PP Labs (${lead.id})`,
            html: buildClientConfirmationHtml(lead),
          });
        } catch (confErr) {
          console.warn("[EMAIL DISPATCH] Client confirmation email warning:", confErr);
        }
      }

      return {
        success: true,
        provider: "smtp",
        messageId: smtpResult.messageId,
      };
    } catch (err: any) {
      console.error("[EMAIL DISPATCH] SMTP sending failed:", err);
    }
  }

  // 3. Fallback / Dev Simulator (No API keys configured yet)
  console.log("==========================================================");
  console.log("🔔 [EMAIL NOTIFICATION SYSTEM - SIMULATION MODE]");
  console.log(`Recipient: ${recipientEmail}`);
  console.log(`Subject: ${subject}`);
  console.log(`Client: ${lead.full_name} (${lead.email}, ${lead.phone})`);
  console.log(`Budget: ${lead.budget_range} | Type: ${lead.website_type}`);
  console.log("💡 Tip: To send live emails, set RESEND_API_KEY in .env.local!");
  console.log("==========================================================");

  return {
    success: true,
    provider: "simulated",
  };
}

/**
 * Diagnostic test email dispatcher for Admin verification
 */
export async function sendTestEmail(targetEmail: string) {
  const dummyLead: LeadEmailData = {
    id: `TEST-${Date.now().toString().slice(-4)}`,
    full_name: "Test Lead System",
    business_name: "PP Labs Diagnostics",
    email: targetEmail,
    phone: "+44 7343 124861",
    preferred_contact_method: "Email",
    website_type: "Full-Stack Web Application",
    website_purpose: ["System Verification", "Testing Notifications"],
    business_description:
      "This is an automated test message from your PP Labs Admin Console to verify real-time email dispatch integration.",
    required_features: ["Admin Dashboard", "Email Notifications", "Database Sync"],
    design_preferences: ["Clean", "Modern", "Tactical"],
    budget_range: "£2,500 – £5,000",
    timeline: "Immediate",
    has_domain: "Yes",
    has_hosting: "Yes",
    content_status: "Verified",
  };

  return sendLeadNotificationEmail(dummyLead);
}
