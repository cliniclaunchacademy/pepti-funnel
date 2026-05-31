import type { Metadata } from "next";
import Banner from "./components/landing/Banner";
import { PageHeader } from "./components/ui/PageHeader";
import { StatsBoard } from "./components/landing/Stats";
import CompoundMarquee from "./components/landing/CompoundMarquee";
import Questions from "./components/landing/Questions";
import Process from "./components/landing/Process";
import Supply from "./components/landing/Supply";

export const metadata: Metadata = {
  title: "Apply for PeptiPharmaRX",
  description:
    "Join the supplier powering 2,000+ clinics nationwide. Apply for access to 80+ GMP-certified, US-manufactured peptides. This program is exclusively for licensed medical practices.",
};

export default function Home() {
  return (
    <>
      <PageHeader />
      <Banner />

      <StatsBoard />

      <CompoundMarquee />

      <Questions />

      <Process />

      <Supply />
    </>
  );
}
