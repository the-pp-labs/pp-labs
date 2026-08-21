import type { Metadata } from "next";
import { Anton, Montserrat } from "next/font/google";
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
    <html lang="en" className={`${anton.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning className="antialiased font-ui bg-paper text-ink selection:bg-accent selection:text-paper">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
