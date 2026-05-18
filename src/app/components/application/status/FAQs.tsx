"use client";

import { motion, type Variants } from "framer-motion";
import { BadgeCheck, Layers, ThumbsUp } from "lucide-react";
import { StepList, type StepListItem } from "../../ui/StepList";

const steps: StepListItem[] = [
  {
    title: "Verify your practice details",
    subtitle: "and get your account activated",
    icon: <BadgeCheck className="size-12" fill="#000" color="#fff1d9" strokeWidth={1.5} />,
  },
  {
    title: "Walk the full catalog",
    subtitle: "80+ peptides, pricing tiers, shipping timelines",
    icon: <Layers className="size-12" strokeWidth={2} />,
  },
  {
    title: "Place your first order",
    subtitle: "and lock in your supply chain",
    icon: <ThumbsUp className="size-12" fill="#000" strokeWidth={1.5} />,
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
      className="w-full flex items-center justify-center my-24"
    >
      <div className="flex items-start justify-center w-full max-w-300 gap-24">
        <motion.div variants={slideInLeft} className="shrink">
          <p className="font-sans text-black text-lg tracking-[0.4rem] uppercase">Frequently Asked</p>

          <motion.h2 variants={fadeUp} className="mt-4 font-sans text-7xl text-black font-medium leading-none">
            What we cover,
            <br />
            <span className="text-beige-gradient font-awesome-serif italic">start to finish.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-8 font-sans text-black text-xl font-normal max-w-sm">
            Come ready with your practice name
            <br />
            and NPI number — we’ll handle the rest.
          </motion.p>
        </motion.div>

        <motion.div variants={slideInRight} className="grow flex-1 shrink-0">
          <StepList items={steps} />
        </motion.div>
      </div>
    </motion.section>
  );
}
