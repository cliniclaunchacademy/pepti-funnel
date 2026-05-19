"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type AccordionItemData = {
  question: ReactNode;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
  className?: string;
};

const PlusIcon = ({ open }: { open: boolean }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    aria-hidden
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <motion.line
      x1="12"
      y1="4"
      x2="12"
      y2="20"
      initial={false}
      animate={{ opacity: open ? 0 : 1, rotate: open ? 90 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ transformOrigin: "12px 12px" }}
    />
  </svg>
);

export const Accordion = ({ items, defaultOpenIndex = null, className }: AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={cn("w-full divide-y divide-gray-300", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${index}`;
        const buttonId = `accordion-button-${index}`;

        return (
          <div key={index} className="py-6">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 text-left cursor-pointer"
            >
              <span className="font-sans italic text-lg lg:text-2xl text-black">{item.question}</span>
              <span className="shrink-0 text-black">
                <PlusIcon open={isOpen} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 font-sans text-black text-base leading-relaxed">{item.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
