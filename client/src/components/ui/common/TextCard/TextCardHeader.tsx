import { PropsWithChildren } from "react";
import { CardHeader } from "../../card";

type TextCardHeaderProps = PropsWithChildren;

export default function TextCardHeader({ children }: TextCardHeaderProps) {
  return <CardHeader className="space-y-0 p-0">{children}</CardHeader>;
}
