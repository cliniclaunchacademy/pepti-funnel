import FAQs from "@/app/components/application/status/FAQs";
import SeeYou from "@/app/components/application/status/SeeYou";
import SuccessApplication from "@/app/components/application/status/SuccessApplication";
import VideoSection from "@/app/components/application/status/VideoSection";
import { PageHeader } from "@/app/components/ui/PageHeader";
import React from "react";

export default function SuccessPage() {
  return (
    <>
      <PageHeader />

      <SuccessApplication />

      <VideoSection />

      <FAQs />

      <SeeYou />
    </>
  );
}
