"use client";

import { motion, type Variants } from "framer-motion";
import { Accordion, type AccordionItemData } from "../ui/Accordion";

const faqs: AccordionItemData[] = [
  {
    question: "Is my supply guaranteed to be in stock when I need it?",
    answer:
      "We maintain consistent inventory across 80+ peptides with fulfillment out of our US-based facility. Most orders ship within 48 hours of placement, and your account manager flags any stock updates before they affect your clinic.",
  },
  {
    question: "Do your peptides come with COAs?",
    answer:
      "Yes — every batch ships with a third-party Certificate of Analysis covering identity, purity, and endotoxin testing. COAs are emailed with your order and archived in your account.",
  },
  {
    question: "Is there a minimum order to get started?",
    answer:
      "No minimum on your first order. Once you're set up, your account manager will help you size repeat orders to your dispensing cadence — no inventory pressure, no stocking quotas.",
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

export default function FAQs() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex items-center justify-center my-16 lg:my-32 px-6 lg:px-0"
    >
      <div className="w-full max-w-300 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        <motion.div variants={slideInLeft} className="shrink w-full lg:w-auto lg:pt-8">
          <p className="font-sans text-black text-xs text-center lg:text-left lg:text-sm tracking-[0.3rem] lg:tracking-[0.4rem] uppercase">
            Frequently Asked
          </p>

          <h2 className="mt-3 lg:mt-4 font-sans text-4xl lg:text-7xl text-center lg:text-left text-black font-medium leading-none">
            The fine print,
            <br />
            <span className="text-beige-gradient font-sans lg:font-awesome-serif italic">up front.</span>
          </h2>

          <p className="mt-4 lg:mt-8 font-sans text-black text-center lg:text-left text-sm lg:text-lg leading-relaxed max-w-sm">
            If your question isn’t here, your account manager will cover it on the call.
          </p>
        </motion.div>

        <motion.div variants={slideInRight} className="w-full lg:grow lg:flex-1 lg:shrink-0">
          <Accordion items={faqs} defaultOpenIndex={0} className="w-full" />
        </motion.div>
      </div>
    </motion.section>
  );
}
