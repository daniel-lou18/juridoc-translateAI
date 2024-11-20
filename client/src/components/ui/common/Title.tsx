import { cn } from "@/lib/utils";
import { HeadingLevel } from "@/types/Components";
import { HTMLAttributes, ReactNode } from "react";

type TitleProps = {
  children: ReactNode;
  as?: HeadingLevel;
  icon?: ReactNode;
} & Omit<HTMLAttributes<HTMLHeadingElement>, "as">;

export default function Title({
  children,
  as: Component = "h4",
  icon,
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      className={cn("text-xl font-semibold flex items-center", className)}
      {...props}
    >
      {icon} {children}
    </Component>
  );
}
