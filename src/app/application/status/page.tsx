import type { Metadata } from "next";
import SuccessPage from "./page/SuccessPage";
import ClosedPage from "./page/ClosedPage";

type Props = {
  searchParams: Promise<{ status?: string | string[] }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { status } = await searchParams;
  const value = Array.isArray(status) ? status[0] : status;

  if (value === "closed") {
    return {
      title: "Application Status | PeptiPharmaRX",
      description:
        "Thank you for your interest in PeptiPharmaRX. At this time, we are only able to onboard clinics, med spas, and practitioners operating under an active medical license.",
    };
  }

  return {
    title: "Call Confirmed | PeptiPharmaRX",
    description:
      "You’re booked. Please prepare for your 30-minute call by having your practice name and NPI number ready so we can activate your account.",
  };
}

export default async function StatusPage({ searchParams }: Props) {
  const { status } = await searchParams;
  const value = Array.isArray(status) ? status[0] : status;

  if (value === "closed") return <ClosedPage />;

  return <SuccessPage />;
}
