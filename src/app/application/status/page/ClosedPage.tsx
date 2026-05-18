"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/app/components/ui/Button";
import { PageHeader } from "@/app/components/ui/PageHeader";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ClosedPage() {
  return (
    <section className="relative w-full -mt-10 lg:-mt-20 -mb-16 lg:-mb-32 bg-black">
      <Image
        src="/bg-application.png"
        alt=""
        width={6048}
        height={6024}
        priority
        sizes="100vw"
        className="absolute inset-0 w-full h-full object-cover lg:relative lg:inset-auto lg:h-auto block"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative lg:absolute lg:inset-0 flex flex-col items-center text-center px-6 py-12 lg:pt-12 lg:pb-0"
      >
        <motion.div variants={fadeUp} className="mt-2 lg:mt-10">
          <PageHeader theme="light" />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 lg:mt-24">
          <Button variant="outline" className="px-8 cursor-default">
            Application closed
          </Button>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-6 lg:mt-10 font-sans text-3xl lg:text-6xl text-beige-gradient font-medium leading-tight"
        >
          Thank you for your interest in
          <br />
          PeptiPharmaRX.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 lg:mt-10 font-sans text-white/85 text-base lg:text-xl font-normal leading-normal max-w-2xl"
        >
          Our supply program is built exclusively for licensed medical
          <span className="hidden lg:inline">
            <br />
          </span>{" "}
          practices. At this time, we&apos;re only able to onboard clinics, med spas,
          <span className="hidden lg:inline">
            <br />
          </span>{" "}
          and practitioners operating under an active medical license.
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 lg:mt-8 font-sans text-white/85 text-base lg:text-xl font-normal leading-normal max-w-2xl"
        >
          If your situation changes in the future, we&apos;d love to connect.
          <br />
          <span className="text-beige-gradient">Wishing you the best!</span>
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-10 lg:mt-16 font-awesome-serif italic text-beige-gradient text-2xl lg:text-3xl"
        >
          - The PeptiPharmaRx Team
        </motion.p>
      </motion.div>
    </section>
  );
}
