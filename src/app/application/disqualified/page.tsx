import type { Metadata } from "next";
import DisqualifiedView from "./DisqualifiedView";

export const metadata: Metadata = {
  title: "Application Status | PeptiPharmaRX",
  description:
    "Thank you for your interest in PeptiPharmaRX. At this time, we are only able to onboard clinics, med spas, and practitioners operating under an active medical license.",
};

export default function DisqualifiedPage() {
  return <DisqualifiedView />;
}
