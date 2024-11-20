import Container from "@/components/ui/common/Container";
import { Amendment } from "@/utils/translation";
import AnnotationRow from "../AnnotationRow";
import { ViewOptions } from "@/contexts/viewContext";

type BirthAnnotationsProps = {
  data: Amendment;
  updateField: (annotationIdx: number, newValue: string) => void;
  viewMode: ViewOptions;
};

export default function BirthAnnotationsSection({
  data,
  updateField,
  viewMode,
}: BirthAnnotationsProps) {
  return (
    <Container as="section" className="space-y-1 mt-4">
      <AnnotationRow
        fieldData={{
          value: data.date,
          id: `${data.description.slice(0, 7)}-${data.number}`,
        }}
        annotationIdx={parseInt(data.number)}
        updateField={updateField}
        className={`font-bold ${viewMode !== "toggle" ? "text-xs" : ""}`}
      />
      <AnnotationRow
        fieldData={{
          value: data.description,
          id: `${data.description.slice(0, 7)}-${data.number}`,
        }}
        annotationIdx={parseInt(data.number)}
        updateField={updateField}
        as="textarea"
        className={`${viewMode !== "toggle" ? "text-xs" : ""}`}
      />
      <AnnotationRow
        fieldData={{
          value: data.responsible.person,
          id: `${data.description.slice(0, 7)}-${data.number}`,
        }}
        annotationIdx={parseInt(data.number)}
        updateField={updateField}
        className={`${viewMode !== "toggle" ? "text-xs" : ""}`}
      />
    </Container>
  );
}
