"use client";

import { motion } from "framer-motion";

export default function Copyright() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-[#D4D4D4] text-center lg:p-4 py-1 mt-16 lg:mt-32"
    >
      <p className="font-sans text-black text-xs lg:text-base font-normal">© 2026 PeptiPharmaRX</p>
    </motion.footer>
  );
}
