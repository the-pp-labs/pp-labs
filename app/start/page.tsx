import type { Metadata } from "next";
import { DesktopIntakePage } from "@/components/desktop-intake/DesktopIntakePage";

export const metadata: Metadata = {
  title: "PROJECT INTAKE // PP LABS | WORKSTATION",
  description:
    "Complete our website design client intake protocol to get an accurate project scope, budget estimate, and roadmap for your next digital build.",
};

export default function StartPage() {
  return <DesktopIntakePage />;
}
