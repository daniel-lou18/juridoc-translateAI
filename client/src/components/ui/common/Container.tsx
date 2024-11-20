import { ContainerElement } from "@/types/Components";
import { HTMLAttributes, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ContainerElement;
} & Omit<HTMLAttributes<HTMLDivElement>, "as">;

export default function Container({
  children,
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  );
}
