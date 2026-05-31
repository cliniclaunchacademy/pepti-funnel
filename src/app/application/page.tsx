import type { Metadata } from "next";
import ApplicationSection from "../components/application/ApplicationSection";
import FAQs from "../components/application/FAQs";
import StatsBoard from "../components/application/StatsBoard";
import SupplyChain from "../components/application/SupplyChain";
import WhatNext from "../components/application/WhatNext";
import { PageHeader } from "../components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Book Your Account Setup Call | PeptiPharmaRX",
  description:
    "Your application is in. Book your 30-minute account setup call to confirm your practice details. We will walk you through our catalog of 80+ peptides and get your account live.",
};

export default function ApplicationPage() {
  return (
    <>
      <PageHeader />

      <ApplicationSection />

      <WhatNext />

      <SupplyChain />

      <StatsBoard />

      <FAQs />
    </>
  );
}
