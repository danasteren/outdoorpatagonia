import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        category:
          "bg-[var(--color-terracotta)] text-white hover:opacity-80",
        default:
          "bg-muted text-muted-foreground hover:bg-muted/80",
        primary:
          "bg-primary/15 text-primary hover:bg-primary/25",
        outline:
          "border border-border text-foreground hover:bg-muted",
        success:
          "bg-[var(--color-teal)]/15 text-[var(--color-teal)] hover:bg-[var(--color-teal)]/25",
        forest:
          "bg-[var(--color-forest)] text-[var(--color-cream)]",
      },
      size: {
        sm: "text-[9px] px-2 py-0.5 rounded",
        md: "text-[10px] px-2.5 py-0.5 rounded",
        lg: "text-xs px-3 py-1 rounded-md",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
