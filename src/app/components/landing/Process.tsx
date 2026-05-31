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
    imgClass: "w-16 lg:w-20 h-auto",
  },
  {
    src: "/process-3.png",
    alt: "Process Step 3",
    label: "60 seconds of your time",
    imgClass: "w-16 h-auto",
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
      className="w-full flex items-center justify-center my-16 lg:my-24 px-6 lg:px-0"
    >
      <div className="flex items-center justify-center flex-col w-full max-w-300">
        <motion.h2
          variants={heading}
          className="font-sans text-black font-normal text-xs lg:text-xl tracking-[0.3rem] lg:tracking-[0.4rem] leading-none uppercase text-center"
        >
          What you’ll need
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-center max-w-[270px] lg:max-w-full py-8 lg:py-12 gap-2 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.src}
              variants={item}
              className={`group relative flex shrink items-center justify-center gap-6 lg:gap-4 ${
                index === 1 ? "lg:border-x-2 border-gray-300 py-4 px-0 lg:py-0 lg:px-12 w-full lg:w-auto" : ""
              }`}
            >
              {index === 1 && (
                <>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-[30%] bg-gray-300 lg:hidden" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-[30%] bg-gray-300 lg:hidden" />
                </>
              )}

              <Image
                src={step.src}
                alt={step.alt}
                width={300}
                height={200}
                sizes="80px"
                aria-hidden
                className={`
      ${step.imgClass}
      transition-all duration-300 ease-out
      group-hover:-translate-y-2
      group-hover:-rotate-3
    `}
              />

              <h4
                className={`font-sans text-black font-medium text-sm lg:text-lg leading-relaxed ${
                  step.labelClass ?? ""
                }`}
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
