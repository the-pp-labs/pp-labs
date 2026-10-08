import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sendTestEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const auth = cookieStore.get("pp_admin_auth");

    if (!auth || auth.value !== "authenticated_session") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const targetEmail =
      body.email ||
      process.env.NOTIFICATION_EMAIL ||
      process.env.ADMIN_EMAIL ||
      "thepplabs@gmail.com";

    const result = await sendTestEmail(targetEmail);

    return NextResponse.json({
      success: true,
      result,
      recipient: targetEmail,
      provider: result.provider,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to trigger test email." },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Returns diagnostic status of email settings without exposing secrets
  const hasResend = !!process.env.RESEND_API_KEY;
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER);
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "thepplabs@gmail.com";

  return NextResponse.json({
    hasResend,
    hasSmtp,
    notificationEmail,
    activeProvider: hasResend ? "Resend" : hasSmtp ? "SMTP" : "Simulation (Dev)",
  });
}
