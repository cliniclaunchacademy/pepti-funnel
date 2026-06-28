"use client";

import Image from "next/image";
import Script from "next/script";
import { motion, type Variants } from "framer-motion";

const WISTIA_MEDIA_ID = "qsl1rnugjc";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SuccessApplication() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex flex-col items-center justify-center my-12 lg:my-24 px-6 lg:px-0"
    >
      <div className="flex flex-col items-center text-center w-full max-w-300 gap-10 lg:gap-16">
        <motion.h1
          variants={fadeUp}
          className="font-sans text-3xl lg:text-6xl text-black font-medium"
        >
          <span className="text-beige-gradient font-sans italic pr-2">
            You’re booked.
          </span>
          Here’s how to make the most of your account setup call.
        </motion.h1>

        <motion.div
          variants={fadeUp}
          className="w-full max-w-3xl flex flex-col items-center gap-3 lg:gap-4"
        >
          <p className="font-sans text-beige-deep text-xs lg:text-sm font-semibold uppercase tracking-wider">
            Step 1
          </p>
          <h2 className="font-sans text-black text-xl lg:text-3xl font-medium">
            What to expect on your call
          </h2>
          <div className="w-full mt-2 lg:mt-4 rounded-xl lg:rounded-2xl overflow-hidden">
            <wistia-player
              media-id={WISTIA_MEDIA_ID}
              aspect="1.7777777777777777"
            ></wistia-player>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="w-full max-w-3xl flex flex-col items-center gap-3 lg:gap-4"
        >
          <p className="font-sans text-beige-deep text-xs lg:text-sm font-semibold uppercase tracking-wider">
            Step 2
          </p>
          <h2 className="font-sans text-black text-xl lg:text-3xl font-medium">
            please change this to - check your inbox and reply “yes”
          </h2>
          <Image
            src="/success-page-img.png"
            alt="PeptiPharmaRX welcome email"
            width={1349}
            height={685}
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="w-full h-auto mt-2 lg:mt-4 rounded-xl lg:rounded-2xl"
          />
        </motion.div>
      </div>

      <Script
        src="https://fast.wistia.com/player.js"
        strategy="afterInteractive"
      />
      <Script
        src={`https://fast.wistia.com/embed/${WISTIA_MEDIA_ID}.js`}
        strategy="afterInteractive"
        type="module"
      />
      <style>{`
        wistia-player[media-id='${WISTIA_MEDIA_ID}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${WISTIA_MEDIA_ID}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>
    </motion.section>
  );
}
