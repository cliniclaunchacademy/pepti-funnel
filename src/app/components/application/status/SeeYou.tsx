"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SeeYou() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-32 mt-40 px-4"
    >
      <div
        className="relative w-full max-w-300 rounded-4xl pl-16 pr-125 py-8 min-h-72 flex items-center"
        style={{
          backgroundImage: "linear-gradient(225deg, #4C453C 0%, #000000 100%)",
        }}
      >
        <div className="flex-1">
          <motion.h2 variants={fadeUp} className="font-sans text-9xl text-beige-primary font-medium leading-none">
            See you on
            <br />
            the call!
          </motion.h2>
        </div>

        <motion.div variants={slideInRight} className="absolute right-0 bottom-0 w-[600px] pointer-events-none">
          <Image
            src="/see-you.png"
            alt="Practitioner"
            width={2616}
            height={1792}
            sizes="600px"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
