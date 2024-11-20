import { BirthCertificateSection as BirthCertificateSectionType } from "@/types/Components";
import BirthCertificateSection from "./BirthCertificateSection";
import { ViewOptions } from "@/contexts/viewContext";

type BirthCertificateSectionsProps = {
  sections: BirthCertificateSectionType[];
  updateField: (sectionIdx: number, fieldIdx: number, newValue: string) => void;
  viewMode: ViewOptions;
};

export default function BirthCertificateSections({
  sections,
  viewMode,
  updateField,
}: BirthCertificateSectionsProps) {
  return (
    <>
      {sections.map((sectionData, sectionIdx) => (
        <BirthCertificateSection
          key={sectionData.fields[0].id}
          data={sectionData}
          sectionIdx={sectionIdx}
          viewMode={viewMode}
          updateField={updateField}
        />
      ))}
    </>
  );
}
