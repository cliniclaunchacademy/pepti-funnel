import type { Metadata } from "next";
import { TrackEvent } from "@/app/components/analytics/TrackEvent";
import FAQs from "@/app/components/application/confirm/FAQs";
import SeeYou from "@/app/components/application/confirm/SeeYou";
import SuccessApplication from "@/app/components/application/confirm/SuccessApplication";
import { PageHeader } from "@/app/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Call Confirmed | PeptiPharmaRX",
  description:
    "You’re booked. Please prepare for your 30-minute call by having your practice name and NPI number ready so we can activate your account.",
};

export default function ConfirmPage() {
  return (
    <>
      <TrackEvent event="Schedule" />

      <PageHeader />

      <SuccessApplication />

      <FAQs />

      <SeeYou />
    </>
  );
}
