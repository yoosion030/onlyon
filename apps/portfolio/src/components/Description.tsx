import { cn } from "@repo/utils";
import type { ComponentProps } from "react";

type DescriptionProps = {
  size?: keyof typeof sizes;
  color?: keyof typeof colors;
} & ComponentProps<"div">;

const colors = {
  default: "text-[#686868]",
  primary: "text-primary",
  black: "text-[#1f2937]",
} as const;

const sizes = {
  sm: "text-sm font-normal",
  md: "text-base font-normal",
  lg: "text-lg",
  default: "text-base font-normal",
} as const;

const Description = ({
  children,
  className,
  size = "default",
  color = "default",
  ...props
}: DescriptionProps) => {
  return (
    <p className={cn(sizes[size], colors[color], className)} {...props}>
      {children}
    </p>
  );
};

export default Description;
