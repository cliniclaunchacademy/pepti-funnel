"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
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

export default function Questions() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-24"
      id="questions"
    >
      <div className="flex items-center justify-center w-full max-w-300 gap-16">
        <motion.div variants={slideInLeft} className="shrink">
          <motion.h1 variants={fadeUp} className="font-sans text-8xl text-black font-medium">
            <span className="text-beige-gradient font-awesome-serif italic pr-2">3 Questions</span> Then we get you
            supplied.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-12 font-sans text-black text-xl">
            This application is for licensed medical practices only. We use it to verify your eligibility and to match
            the right account manager to your practice. Submissions are routed direct — no spam, no D2C.
          </motion.p>
        </motion.div>

        <motion.div variants={slideInRight} className="min-w-125 shrink-0 grow aspect-4/3 bg-gray-400 rounded-md" />
      </div>
    </motion.section>
  );
}
