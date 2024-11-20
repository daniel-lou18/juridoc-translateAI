import { Amendment } from "@/utils/translation";
import BirthAnnotationsSection from "./BirthAnnotationsSection";
import { ViewOptions } from "@/contexts/viewContext";

type BirthAnnotationsSectionsProps = {
  sections: Amendment[];
  updateField: (annotationIdx: number, newValue: string) => void;
  viewMode: ViewOptions;
};

export default function BirthAnnotationsSections({
  sections,
  viewMode,
  updateField,
}: BirthAnnotationsSectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <BirthAnnotationsSection
          key={section.number}
          data={section}
          viewMode={viewMode}
          updateField={updateField}
        />
      ))}
    </>
  );
}
