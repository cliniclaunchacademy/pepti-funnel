"use client";

import Banner from "./components/landing/Banner";
import { PageHeader } from "./components/ui/PageHeader";
import { StatsBoard } from "./components/landing/Stats";
import CompoundMarquee from "./components/landing/CompoundMarquee";
import Questions from "./components/landing/Questions";
import Process from "./components/landing/Process";
import Supply from "./components/landing/Supply";

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
