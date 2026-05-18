"use client";

import { motion, type Variants } from "framer-motion";

const stats = [
  {
    value: "2000+",
    label: ["CLINICS", "ONBOARDED"],
  },
  {
    value: "99.9%",
    label: ["AVERAGE", "PURITY"],
  },
  {
    value: "48 hrs",
    label: ["SHIP TO ALL", "50 STATES"],
  },
  {
    value: "80+",
    label: ["COMPOUNDS", "IN CATALOG"],
  },
];

const CORNER_OFFSET = 24;

const cornerOffsets = [
  { x: -CORNER_OFFSET, y: -CORNER_OFFSET }, // top-left
  { x: CORNER_OFFSET, y: -CORNER_OFFSET }, // top-right
  { x: -CORNER_OFFSET, y: CORNER_OFFSET }, // bottom-left
  { x: CORNER_OFFSET, y: CORNER_OFFSET }, // bottom-right
];

const grid: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const tile: Variants = {
  hidden: (offset: { x: number; y: number }) => ({
    opacity: 0,
    x: offset.x,
    y: offset.y,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const viewport = { once: true, amount: 0.2 } as const;

export default function StatsBoard() {
  return (
    <section className="w-full flex items-center justify-center my-24">
      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid grid-cols-1 md:grid-cols-2 w-full max-w-300"
      >
        {stats.map((stat, index) => {
          const isLeftColumn = index % 2 === 0;
          const isTopRow = index < 2;

          return (
            <motion.div
              key={stat.value}
              variants={tile}
              custom={cornerOffsets[index]}
              className={`
                flex items-center gap-12 px-6 py-8 md:px-10 md:py-10
                ${isLeftColumn ? "md:border-r md:pl-0" : "md:pr-0 md:pl-20"}
                ${isTopRow ? "border-b md:border-b md:pt-0" : "md:pb-0"}
                border-[#858585]
              `}
            >
              <h2 className="text-6xl md:text-7xl leading-none font-medium font-sans text-[#E0BB83]">{stat.value}</h2>

              <div className="flex flex-col leading-[0.95]">
                {stat.label.map((line) => (
                  <span key={line} className="text-xl md:text-3xl font-semibold tracking-tight text-black uppercase">
                    {line}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
