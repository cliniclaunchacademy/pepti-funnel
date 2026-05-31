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

const MobileSupplySection = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full items-center justify-center my-16 px-4 flex lg:hidden"
    >
      <div
        className="relative w-full max-w-300 rounded-2xl pl-6 pr-[88px] py-4 flex items-center"
        style={{
          backgroundImage: "linear-gradient(225deg, #FFEFD1 0%, #D8B98F 100%)",
        }}
      >
        <motion.div
          variants={slideInLeft}
          className="absolute -right-12 -top-40 bottom-0 w-[200px] z-20 pointer-events-none"
        >
          <Image
            src="/tube.png"
            alt="Vial"
            width={704}
            height={791}
            className="w-full h-full object-contain object-bottom"
          />
        </motion.div>

        <div className="relative z-10 flex-1 text-left">
          <motion.h2 variants={fadeUp} className="font-sans text-2xl text-left text-black font-medium leading-tight">
            A supply chain built for <span className="font-sans font-semibold italic">practitioners.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-4 font-sans text-black text-[10px] leading-snug">
            We don’t ship to patients. Every gram is manufactured under GMP in the US and routed through
            chain-of-custody to clinics only.
            <br />
            <span className="font-semibold">The result: an inventory you can plan around.</span>
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
};

export default function Supply() {
  return (
    <>
      <MobileSupplySection />
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full items-center justify-center my-16 lg:my-24 px-4 hidden lg:flex"
      >
        <div
          className="relative w-full max-w-300 rounded-2xl pl-24 pr-4 py-6 lg:pl-105 lg:pr-16 lg:py-11 lg:min-h-72 flex items-center overflow-hidden lg:overflow-visible"
          style={{
            backgroundImage: "linear-gradient(225deg, #FFEFD1 0%, #D8B98F 100%)",
          }}
        >
          <motion.div
            variants={slideInLeft}
            className="absolute left-0 top-auto bottom-0 h-[160px] lg:top-auto lg:bottom-0 lg:w-125 lg:h-auto pointer-events-none"
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
              className="font-sans text-xl lg:text-7xl text-end text-black font-medium leading-none lg:leading-none"
            >
              A supply chain built{" "}
              <span className="lg:hidden inline">
                <br />
              </span>{" "}
              for <span className="font-sans font-semibold italic">practitioners.</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-3 lg:mt-6 max-w-lg ml-auto w-[70%] font-sans text-black text-[8px] lg:text-xl leading-snug"
            >
              We don’t ship to patients. Every gram is manufactured under GMP in the US and routed through
              chain-of-custody to clinics only.
              <br />
              <span className="font-semibold">The result: an inventory you can plan around.</span>
            </motion.p>
          </div>
        </div>
      </motion.section>
    </>
  );
}
