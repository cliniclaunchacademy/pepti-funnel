import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StepListItem = {
  title: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
};

type StepListProps = {
  items: StepListItem[];
  className?: string;
};

export const StepList = ({ items, className }: StepListProps) => {
  return (
    <ol className={cn("flex flex-col gap-2 w-full", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="group flex items-center gap-2 lg:gap-8 rounded-xl lg:rounded-2xl px-2 lg:px-3 py-3 lg:py-4 bg-transparent hover:bg-beige-secondary transition-colors duration-300"
        >
          <span
            aria-hidden
            className="shrink-0 w-14 lg:w-24 text-center font-sans text-4xl lg:text-7xl font-bold leading-none text-beige-primary group-hover:text-black transition-colors duration-300"
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="flex-1 min-w-0">
            <h3 className="font-sans text-xs lg:text-2xl font-medium text-black leading-tight lg:leading-none">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="mt-1 lg:mt-2 font-sans text-[7px] lg:text-sm text-black/80">{item.subtitle}</p>
            )}
          </div>

          {item.icon && <span className="shrink-0 flex items-center justify-center text-black">{item.icon}</span>}
        </li>
      ))}
    </ol>
  );
};
