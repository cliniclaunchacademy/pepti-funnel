"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SupplyChain() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-16 lg:my-24 px-4"
    >
      <div
        className="relative w-full max-w-300 rounded-2xl pl-25 pr-4 py-6 lg:pl-120 lg:pr-16 lg:py-11 lg:min-h-72 flex items-center overflow-hidden lg:overflow-visible"
        style={{
          backgroundImage: "linear-gradient(225deg, #FFEFD1 0%, #D8B98F 100%)",
        }}
      >
        <motion.div
          variants={slideInLeft}
          className="absolute left-0 top-auto bottom-0 w-45 lg:top-auto lg:bottom-0 lg:w-125 lg:h-auto pointer-events-none"
        >
          <Image
            src="/doctor.png"
            alt="Practitioner"
            width={2284}
            height={2260}
            sizes="(min-width: 1024px) 500px, 34vw"
            className="w-full h-full object-cover object-top lg:h-auto"
          />
        </motion.div>

        <div className="flex-1 text-end">
          <motion.h2
            variants={fadeUp}
            className="font-sans text-2xl lg:text-6xl text-end text-black font-medium leading-none lg:leading-none"
          >
            Supply chain that doesn’t go quiet when patients are waiting.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-3 lg:mt-6 max-w-lg ml-auto w-[70%] font-sans text-black text-[8px] lg:text-xl leading-snug"
          >
            Every batch is third-party tested. Every order moves with chain-of-custody from a single GMP facility in the
            US. Every clinic gets a real account manager — not a ticket queue.
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
