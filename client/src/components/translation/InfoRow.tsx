import { ChangeEvent } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Container from "../ui/common/Container";
import { Field } from "@/types/Components";
import { cn } from "@/lib/utils";

type InfoRowProps = {
  fieldData: Field;
  sectionIdx: number;
  fieldIdx: number;
  updateField: (sectionIdx: number, fieldIdx: number, newValue: string) => void;
  className?: string;
};

export default function InfoRow({
  fieldData,
  sectionIdx,
  fieldIdx,
  updateField,
  className,
}: InfoRowProps) {
  const { label, value, id } = fieldData;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    updateField(sectionIdx, fieldIdx, e.target.value);
  }

  return (
    <Container className="grid grid-cols-3 gap-2 p-1 pl-2 items-center rounded-sm">
      {label ? (
        <Label htmlFor={id} className={cn("col-span-1 text-sm", className)}>
          {label}
        </Label>
      ) : null}
      <Input
        id={id}
        className={cn(
          "col-span-2 h-8 text-sm border-transparent hover:border-input hover:shadow-sm transition-all",
          className
        )}
        value={value}
        onChange={handleChange}
      />
    </Container>
  );
}
