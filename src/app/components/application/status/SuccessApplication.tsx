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
      className="w-full flex items-center justify-center my-12 lg:my-24 px-6 lg:px-0"
    >
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-300 gap-8 lg:gap-16">
        <motion.div variants={slideInLeft} className="shrink text-center lg:text-left">
          <Button className="mb-4 lg:mb-6 flex items-center font-normal gap-1 mx-auto lg:mx-0">
            Application Received <CircleCheck fill="#000" color="#fff1d9" />
          </Button>
          <motion.h1 variants={fadeUp} className="font-sans text-3xl lg:text-6xl text-black font-medium">
            <span className="text-beige-gradient font-sans italic pr-2">You’re booked.</span>
            <br />
            Here’s how to make the most of your account setup call.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 lg:mt-6 font-sans text-black text-base lg:text-2xl">
            Check your inbox for confirmation. Your call is reserved{" "}
            <span className="hidden lg:inline">
              <br />
            </span>{" "}
            — here’s exactly what to do before we speak.
          </motion.p>
        </motion.div>

        <motion.div
          variants={slideInRight}
          className="w-full lg:w-auto lg:min-w-125 lg:shrink-0 lg:grow aspect-4/3 bg-gray-400 rounded-md"
        />
      </div>
    </motion.section>
  );
}
