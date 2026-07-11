import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-8",
      md: "py-12",
      lg: "py-8 lg:py-16",
      xl: "py-20 md:py-28",
    },
    background: {
      none: "",
      muted: "bg-muted",
      card: "bg-card",
      forest: "bg-[var(--color-forest)] text-[var(--color-cream)]",
      cream: "bg-[var(--color-cream)] dark:bg-[var(--color-forest)]",
    },
  },
  defaultVariants: { spacing: "md", background: "none" },
});

export interface SectionProps
  extends React.ComponentProps<"section">,
  VariantProps<typeof sectionVariants> { }

function Section({
  className,
  spacing,
  background,
  ...props
}: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(sectionVariants({ spacing, background }), className)}
      {...props}
    />
  );
}

export { Section, sectionVariants };
