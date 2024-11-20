import { ChangeEvent, HTMLAttributes } from "react";
import { Input } from "../ui/input";
import { Field } from "@/types/Components";
import Container from "../ui/common/Container";
import { cn } from "@/lib/utils";

type InfoRowProps = {
  fieldData: Omit<Field, "label">;
  annotationIdx: number;
  updateField: (annotationIdx: number, newValue: string) => void;
  as?: "input" | "textarea";
} & Omit<HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "as">;

export default function AnnotationRow({
  fieldData,
  annotationIdx,
  updateField,
  className,
  as = "input",
  ...props
}: InfoRowProps) {
  const { value, id } = fieldData;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    updateField(annotationIdx, e.target.value);
  }

  if (as === "textarea") {
    return (
      <Container className="col-span-2">
        <textarea
          name={id}
          id={id}
          className={cn(
            "w-full py-2 px-4 text-sm border-transparent hover:border-input hover:shadow-sm transition-all",
            className
          )}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </Container>
    );
  }

  return (
    <Container className={className}>
      <Input
        name={id}
        id={id}
        className={cn(
          "col-span-2 h-8 text-sm border-transparent hover:border-input hover:shadow-sm transition-all",
          className
        )}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </Container>
  );
}
