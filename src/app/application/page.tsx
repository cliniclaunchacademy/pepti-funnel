"use client";

import ApplicationSection from "../components/application/ApplicationSection";
import FAQs from "../components/application/FAQs";
import StatsBoard from "../components/application/StatsBoard";
import SupplyChain from "../components/application/SupplyChain";
import WhatNext from "../components/application/WhatNext";
import { PageHeader } from "../components/ui/PageHeader";

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
