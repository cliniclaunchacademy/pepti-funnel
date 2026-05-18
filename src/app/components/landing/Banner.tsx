"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";

const textContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const viewport = { once: true, amount: 0.3 } as const;

export default function Banner() {
  const router = useRouter();

  return (
    <section className="relative w-full mt-16 overflow-hidden min-h-[650px] flex justify-center">
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="hidden lg:block absolute bottom-0 overflow-hidden h-[550px] left-0 w-[28%] pointer-events-none select-none"
      >
        <Image
          src="/left-banner-img.png"
          alt=""
          aria-hidden
          width={2052}
          height={2916}
          priority
          sizes="(min-width: 1024px) 28vw, 0px"
        />
      </motion.div>

      <motion.div
        variants={slideInRight}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="hidden lg:block absolute bottom-0 overflow-hidden h-[550px] right-0 w-[28%] pointer-events-none select-none"
      >
        <Image
          src="/right-banner-img.png"
          alt=""
          aria-hidden
          width={2052}
          height={2916}
          priority
          sizes="(min-width: 1024px) 28vw, 0px"
          className="w-full h-auto"
        />
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-white to-transparent z-[5]"
      />

      <motion.div
        variants={textContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative z-10 flex flex-col gap-6 items-center text-center w-7xl mx-auto"
      >
        <motion.h1 variants={fadeUp} className="font-sans text-7xl text-black font-medium">
          The peptide supplier powering <br />{" "}
          <span className="text-beige-gradient font-awesome-serif italic pr-2">2,000+ Clinics</span> nationwide.
        </motion.h1>

        <motion.p variants={fadeUp} className="font-sans text-black font-normal text-xl">
          80+ pharmaceutical-grade peptides. 2-day fulfilment. 99.9% purity, COA on <br /> every batch. Built for
          licensed clinics, med spas, and practitioners.
        </motion.p>

        <motion.div variants={fadeUp}>
          <Button size="md" className="font-normal text-black" onClick={() => router.push("#questions")}>
            Begin Application • 60 sec <ArrowRight size={24} className="ml-1" />
          </Button>
        </motion.div>

        <motion.p variants={fadeUp} className="font-sans text-black font-normal text-xs tracking-[0.3em]">
          For licensed practices only
        </motion.p>
      </motion.div>
    </section>
  );
}
