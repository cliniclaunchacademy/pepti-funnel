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

export default function Supply() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-24 px-4"
    >
      <div
        className="relative w-full max-w-300 rounded-2xl pl-105 pr-16 py-11 min-h-72 flex items-center"
        style={{
          backgroundImage: "linear-gradient(225deg, #FFEFD1 0%, #D8B98F 100%)",
        }}
      >
        <motion.div variants={slideInLeft} className="absolute left-0 bottom-0 w-125 pointer-events-none">
          <Image src="/doctor.png" alt="Practitioner" width={2284} height={2260} priority className="w-full h-auto" />
        </motion.div>

        <div className="flex-1 text-end">
          <motion.h2 variants={fadeUp} className="font-sans text-7xl text-end text-black font-medium leading-none">
            A supply chain built for <span className="font-sans font-semibold italic">practitioners.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg tracking-wider ml-auto font-sans text-black text-xl leading-snug"
          >
            We don’t ship to patients. Every gram is manufactured under GMP in the US and routed through
            chain-of-custody to clinics only.
            <br />
            <span className="font-semibold">The result: an inventory you can plan around.</span>
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
