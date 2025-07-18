import { cn } from "@repo/utils";
import type { ComponentProps } from "react";

type GroupProps = {
  variant: keyof typeof variants;
} & ComponentProps<"div">;

const variants = {
  sm: "gap-1",
  smd: "gap-3",
  md: "gap-4",
  xl: "gap-9",
  "4xl": "gap-20",
} as const;

const Group = ({
  children,
  className,
  variant = "sm",
  ...props
}: GroupProps) => {
  return (
    <div
      className={cn("flex", "flex-col", variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Group;
