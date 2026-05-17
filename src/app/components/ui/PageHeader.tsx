"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const PageHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className="flex items-center justify-center"
    >
      <Image
        src="/peptipharma-logo.png"
        alt="PeptiPharma"
        width={900}
        height={142}
        priority
        className="w-112.5 h-auto"
      />
    </motion.header>
  );
};
