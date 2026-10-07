import type { Metadata } from "next";
import { Anton, Montserrat, Silkscreen, Space_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "V2TECH | DESIGN & BUILD",
  description: "FULL-STACK PRODUCT STUDIO",
};

import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${montserrat.variable} ${silkscreen.variable} ${spaceMono.variable}`}>
      <body suppressHydrationWarning className="antialiased font-ui bg-paper text-ink selection:bg-accent selection:text-paper">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
