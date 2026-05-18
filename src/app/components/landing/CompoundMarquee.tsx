"use client";

import React from "react";
import { motion } from "framer-motion";

const compounds = ["BPC-157", "CJC-1295 / IPAMORELIN", "GLP-1 ANALOG", "STB-500GHK-CU", "SEMAX", "EPITHALON"];

export default function CompoundMarquee() {
  // duplicate so translateX(-50%) loops seamlessly
  const loop = [...compounds, ...compounds, ...compounds];

  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full overflow-hidden bg-black py-3"
    >
      <div className="flex w-max animate-marquee items-center">
        {loop.map((item, index) => (
          <React.Fragment key={`${item}-${index}`}>
            <span className="shrink-0 px-3 lg:px-4 font-sans text-sm lg:text-lg font-light tracking-tight text-beige-primary">
              {item}
            </span>
            {index !== loop.length - 1 && (
              <span className="shrink-0 font-sans text-xl lg:text-2xl text-beige-primary" aria-hidden>
                •
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.section>
  );
}
