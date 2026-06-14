import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      /* First item spans full width on md, then equal cols on lg */
      "featured-1-2": "grid-cols-1 md:grid-cols-3",
    },
    gap: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
    },
  },
  defaultVariants: { cols: 3, gap: "md" },
});

export interface GridProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof gridVariants> {}

function Grid({ className, cols, gap, ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn(gridVariants({ cols, gap }), className)}
      {...props}
    />
  );
}

export { Grid, gridVariants };
