"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { motion, type Variants } from "framer-motion";
import { Button } from "../ui/Button";
import { CircleCheck, X } from "lucide-react";

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
        className="w-full flex items-center justify-center my-12 lg:my-24 px-6 lg:px-0"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-300 gap-8 lg:gap-24">
          <motion.div variants={slideInLeft} className="shrink text-center lg:text-left">
            <Button className="mb-4 lg:mb-6 flex items-center font-normal gap-1 mx-auto lg:mx-0 cursor-default">
              Application Received <CircleCheck fill="#000" color="#fff1d9" />
            </Button>
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

          <motion.div
            variants={slideInRight}
            className="relative w-full lg:w-auto lg:min-w-125 lg:shrink-0 lg:grow aspect-4/3 rounded-md overflow-hidden"
          >
            <iframe
              src={BOOKING_URL}
              id="samNYJhZt9QujspDWwdN_inline"
              scrolling="no"
              className="w-full h-full border-0"
            />
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label="Open booking calendar"
              className="absolute inset-0 z-10 cursor-pointer"
            />
          </motion.div>
        </div>
        <Script src="https://links.peptipharmarx.com/js/form_embed.js" strategy="lazyOnload" />
      </motion.section>

      <div
        className={`fixed inset-0 z-50 bg-black/90 flex-col p-3 lg:p-6 ${
          isOpen ? "flex" : "hidden"
        }`}
        role="dialog"
        aria-modal={isOpen}
        aria-label="Booking calendar"
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close booking calendar"
          className="self-end mb-2 p-2 text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={28} />
        </button>
        <div className="flex-1 w-full rounded-md overflow-hidden bg-white">
          {isOpen && (
            <iframe
              src={BOOKING_URL}
              id="samNYJhZt9QujspDWwdN_modal"
              scrolling="no"
              className="w-full h-full border-0"
            />
          )}
        </div>
      </div>
    </>
  );
}
