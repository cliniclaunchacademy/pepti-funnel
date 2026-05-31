"use client";

import Script from "next/script";
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

const BOOKING_URL = "https://links.peptipharmarx.com/widget/booking/samNYJhZt9QujspDWwdN";

export default function ApplicationSection() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-12 lg:my-24 px-6 lg:px-0"
    >
      <div className="flex flex-col items-center justify-center w-full max-w-300 gap-8 lg:gap-12">
        <motion.div variants={slideInLeft} className="text-center">
          <motion.h1 variants={fadeUp} className="font-sans text-4xl lg:text-7xl text-black font-medium">
            Your application is in.
            <span className="text-beige-gradient font-sans italic pr-2">
              {" "}
              Here’s <span className="mr-2">what</span> <span className="mr-2">happens</span> next.
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-4 lg:mt-6 font-sans text-black text-xs lg:text-xl">
            Book your account setup call. 30 minutes — we confirm your practice details, walk you through our catalog,
            and get your account live.
          </motion.p>
        </motion.div>

        <motion.div variants={slideInRight} className="w-full min-h-150 lg:min-h-200 rounded-2xl overflow-hidden">
          <iframe
            src={BOOKING_URL}
            id="samNYJhZt9QujspDWwdN_inline"
            scrolling="no"
            className="w-full h-full min-h-150 lg:min-h-200 border-0"
          />
        </motion.div>
      </div>
      <Script src="https://links.peptipharmarx.com/js/form_embed.js" strategy="lazyOnload" />
    </motion.section>
  );
}
