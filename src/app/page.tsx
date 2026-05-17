"use client";

import Banner from "./components/landing/Banner";
import { PageHeader } from "./components/ui/PageHeader";
import { StatsBoard } from "./components/landing/Stats";
import CompoundMarquee from "./components/landing/CompoundMarquee";
import Questions from "./components/landing/Questions";

export default function Home() {
  return (
    <>
      <PageHeader />
      <Banner />

      <StatsBoard />

      <CompoundMarquee />

      <Questions />
    </>
  );
}
