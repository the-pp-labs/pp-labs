import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const DEFAULT_PASSCODE = "pplabs2026";
const COOKIE_NAME = "pp_admin_auth";

function getExpectedPasscode(): string {
  return process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const passcode = body.passcode;
    const expected = getExpectedPasscode();

    if (!passcode || passcode.trim() !== expected.trim()) {
      return NextResponse.json(
        { success: false, error: "Invalid passcode. Please try again." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
    });

    response.cookies.set(COOKIE_NAME, "authenticated_session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Auth POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Auth error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(COOKIE_NAME);

    const isAuthenticated = !!(authCookie && authCookie.value === "authenticated_session");

    return NextResponse.json({
      authenticated: isAuthenticated,
      hasCustomPasscode: !!process.env.ADMIN_PASSCODE,
    });
  } catch (error: any) {
    console.error("Auth GET error:", error);
    return NextResponse.json({ authenticated: false });
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    response.cookies.delete(COOKIE_NAME);
    return response;
  } catch (error: any) {
    console.error("Auth DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
