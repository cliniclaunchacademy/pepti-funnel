import type { ComponentPropsWithRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const button = tv({
  base: "inline-flex items-center justify-center font-sans font-medium transition-all rounded-full transition-colors transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-beige-deep focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-beige-primary text-black hover:bg-beige-secondary",
      outline:
        "border border-beige-deep text-white focus-visible:ring-white hover:text-black bg-transparent hover:bg-beige-secondary",
      secondary: "bg-beige-secondary text-beige-deep hover:bg-beige-primary",
      ghost: "text-beige-deep hover:bg-beige-secondary",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-5 text-base",
      lg: "h-12 px-6 text-lg",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type ButtonProps = Omit<ComponentPropsWithRef<"button">, "className"> &
  VariantProps<typeof button> & {
    className?: ClassValue;
  };

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
};
