"use client";

import { motion, type Variants } from "framer-motion";
import { Button } from "../../ui/Button";
import { CircleCheck } from "lucide-react";

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

export default function SuccessApplication() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-24"
    >
      <div className="flex items-center justify-center w-full max-w-300 gap-16">
        <motion.div variants={slideInLeft} className="shrink">
          <Button className="mb-6 flex items-center font-normal gap-1">
            Booked <CircleCheck fill="#000" color="#fff1d9" />
          </Button>
          <motion.h1 variants={fadeUp} className="font-sans text-6xl text-black font-medium">
            <span className="text-beige-gradient font-awesome-serif italic pr-2">You’re booked.</span>
            <br />
            Here’s how to make the most of your account setup call.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 font-sans text-black text-2xl">
            Check your inbox for confirmation. Your call is reserved <br /> — here’s exactly what to do before we speak.
          </motion.p>
        </motion.div>

        <motion.div variants={slideInRight} className="min-w-125 shrink-0 grow aspect-4/3 bg-gray-400 rounded-md" />
      </div>
    </motion.section>
  );
}
