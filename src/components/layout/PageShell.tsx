import * as React from "react";
import { cn } from "@/lib/utils";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "full";

const maxWidthMap: Record<MaxWidth, string> = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-none",
};

interface PageShellProps extends React.ComponentProps<"div"> {
  maxWidth?: MaxWidth;
}

function PageShell({
  className,
  maxWidth = "lg",
  children,
  ...props
}: PageShellProps) {
  return (
    <div
      data-slot="page-shell"
      className={cn(maxWidthMap[maxWidth], "mx-auto px-4 sm:px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { PageShell };
