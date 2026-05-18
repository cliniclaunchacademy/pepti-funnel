"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";

type ProcessStep = {
  src: string;
  alt: string;
  label: string;
  imgClass: string;
  labelClass?: string;
};

const steps: ProcessStep[] = [
  {
    src: "/process-1.png",
    alt: "Process Step 1",
    label: "A registered medical practice or active license",
    imgClass: "w-16 h-auto",
  },
  {
    src: "/process-2.png",
    alt: "Process Step 2",
    label: "A rough idea of which peptides you supply",
    imgClass: "w-20 h-auto",
  },
  {
    src: "/process-3.png",
    alt: "Process Step 3",
    label: "60 seconds of your time",
    imgClass: "w-16 h-auto",
    labelClass: "tracking-widest",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const heading: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Process() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex items-center justify-center my-24"
    >
      <div className="flex items-center justify-center flex-col w-full max-w-300">
        <motion.h2
          variants={heading}
          className="font-sans text-black font-normal text-xl tracking-[0.4rem] leading-none uppercase"
        >
          What you’ll need
        </motion.h2>

        <div className="flex items-center justify-center w-full py-12 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.src}
              variants={item}
              className={
                index === 1
                  ? "flex shrink items-center justify-center gap-4 border-x-2 border-gray-300 px-12"
                  : "flex shrink items-center justify-center gap-4"
              }
            >
              <Image
                src={step.src}
                alt={step.alt}
                width={300}
                height={200}
                priority
                aria-hidden
                className={step.imgClass}
              />

              <h4
                className={`font-sans text-black font-medium text-lg leading-relaxed ${step.labelClass ?? ""}`}
              >
                {step.label}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
