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
  { x: -CORNER_OFFSET, y: -CORNER_OFFSET },
  { x: CORNER_OFFSET, y: -CORNER_OFFSET },
  { x: -CORNER_OFFSET, y: CORNER_OFFSET },
  { x: CORNER_OFFSET, y: CORNER_OFFSET },
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
    <section className="w-full flex items-center justify-center my-16 lg:my-24 px-6 lg:px-0">
      <motion.div
        variants={grid}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-300"
      >
        {stats.map((stat, index) => {
          const isLeftColumn = index % 2 === 0;
          const isTopRow = index < 2;
          const isLast = index === stats.length - 1;

          return (
            <motion.div
              key={stat.value}
              variants={tile}
              custom={cornerOffsets[index]}
              className={`
                relative
                flex items-center justify-center lg:justify-start gap-2 lg:gap-12 px-4 py-5 lg:px-10 lg:py-10
                ${isLeftColumn ? "lg:border-r lg:pl-0" : "lg:pr-0 lg:pl-40"}
                ${isTopRow ? "lg:pt-0" : "lg:pb-0"}
                border-[#858585]
              `}
            >
              {/* Mobile 70% border */}
              {(isTopRow || (!isLast && !isTopRow)) && (
                <div className="absolute bottom-0 left-auto h-px w-[70%] bg-[#858585] lg:hidden" />
              )}

              {/* Desktop full borders */}
              {isTopRow && <div className="hidden lg:block absolute bottom-0 left-0 w-full h-px bg-[#858585]" />}

              <h2 className="text-5xl w-1/2 lg:w-auto lg:text-7xl leading-none font-medium font-sans text-[#E0BB83]">
                {stat.value}
              </h2>

              <div className="flex flex-col w-1/2 lg:w-auto leading-[0.95]">
                {stat.label.map((line) => (
                  <span key={line} className="text-lg lg:text-3xl font-semibold tracking-tight text-black uppercase">
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
