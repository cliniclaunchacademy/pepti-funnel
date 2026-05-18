"use client";

import { motion, type Variants } from "framer-motion";
import { BadgeCheck, Layers, ThumbsUp } from "lucide-react";
import { StepList, type StepListItem } from "../../ui/StepList";

const steps: StepListItem[] = [
  {
    title: "Verify your practice details",
    subtitle: "and get your account activated",
    icon: <BadgeCheck className="size-9 lg:size-12" fill="#000" color="#fff1d9" strokeWidth={1.5} />,
  },
  {
    title: "Walk the full catalog",
    subtitle: "80+ peptides, pricing tiers, shipping timelines",
    icon: <Layers className="size-9 lg:size-12" strokeWidth={2} />,
  },
  {
    title: "Place your first order",
    subtitle: "and lock in your supply chain",
    icon: <ThumbsUp className="size-9 lg:size-12" fill="#000" strokeWidth={1.5} />,
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function FAQs() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-16 lg:my-24 px-6 lg:px-0"
    >
      <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-300 gap-8 lg:gap-24">
        <motion.div variants={slideInLeft} className="shrink w-full lg:w-auto">
          <p className="font-sans text-black text-xs lg:text-lg tracking-[0.3rem] lg:tracking-[0.4rem] uppercase">
            Frequently Asked
          </p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 lg:mt-4 font-sans text-4xl lg:text-7xl text-black font-medium leading-none"
          >
            What we cover,
            <br />
            <span className="text-beige-gradient font-awesome-serif italic">start to finish.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 lg:mt-8 font-sans text-black text-base lg:text-xl font-normal max-w-sm"
          >
            Come ready with your practice name
            <span className="hidden lg:inline">
              <br />
            </span>{" "}
            and NPI number — we’ll handle the rest.
          </motion.p>
        </motion.div>

        <motion.div variants={slideInRight} className="w-full lg:grow lg:flex-1 lg:shrink-0">
          <StepList items={steps} />
        </motion.div>
      </div>
    </motion.section>
  );
}
