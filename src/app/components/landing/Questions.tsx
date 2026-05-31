"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { motion, type Variants } from "framer-motion";
import { X } from "lucide-react";

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

export default function Questions() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <>
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full flex items-center justify-center my-16 lg:my-24 px-10 lg:px-0"
        id="questions"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-300 gap-8 lg:gap-16">
          <motion.div variants={slideInLeft} className="shrink text-center lg:text-left">
            <motion.h1 variants={fadeUp} className="font-sans text-4xl lg:text-8xl text-black font-medium">
              <span className="text-beige-gradient font-sans font-bold lg:font-normal lg:font-awesome-serif italic pr-2">
                3 Questions
                <span className="lg:hidden inline">
                  . <br />
                </span>{" "}
              </span>{" "}
              Then we get{" "}
              <span className="lg:hidden inline">
                <br />
              </span>{" "}
              you supplied.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 lg:mt-12 font-sans text-black text-[10px] lg:text-xl">
              We supply peptides to a select group of partners. Complete the application below to see if you qualify to
              source from us.
            </motion.p>
          </motion.div>

          <motion.div
            variants={slideInRight}
            className="relative w-full lg:w-auto lg:min-w-125 lg:shrink-0 lg:grow aspect-4/3 rounded-md overflow-hidden"
          >
            <div data-tf-live="01KSVN8SWB4QD6T7D26VKTWE6N" className="w-full h-full" />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open application form"
              className="absolute inset-0 z-10 cursor-pointer"
            />
          </motion.div>
        </div>
        <Script src="//embed.typeform.com/next/embed.js" strategy="lazyOnload" />
      </motion.section>

      <div
        className={`fixed inset-0 z-50 bg-black/90 flex-col p-3 lg:p-6 ${
          isOpen ? "flex" : "hidden"
        }`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Application form"
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close application form"
          className="self-end mb-2 p-2 text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={28} />
        </button>
        <div className="flex-1 w-full rounded-md overflow-hidden bg-white">
          <div data-tf-live="01KSVN8SWB4QD6T7D26VKTWE6N" className="w-full h-full" />
        </div>
      </div>
    </>
  );
}
