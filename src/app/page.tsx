"use client";

import Banner from "./components/landing/Banner";
import { PageHeader } from "./components/ui/PageHeader";
import { StatsBoard } from "./components/landing/Stats";
import CompoundMarquee from "./components/landing/CompoundMarquee";

export default function Home() {
  return (
    <>
      <PageHeader />
      <Banner />

      <StatsBoard />

      <CompoundMarquee />
    </>
  );
}
