import Container from "@/components/ui/common/Container";
import Title from "@/components/ui/common/Title";
import InfoRow from "../InfoRow";
import { BirthCertificateSection as BirthCertificateSectionType } from "@/types/Components";
import { ViewOptions } from "@/contexts/viewContext";

type BirthCertificateSectionProps = {
  data: BirthCertificateSectionType;
  sectionIdx: number;
  updateField: (sectionIdx: number, fieldIdx: number, newValue: string) => void;
  viewMode: ViewOptions;
};

const titleStyles = {
  miniature: "text-xs",
  "side-by-side": "text-base",
  toggle: "text-lg",
};

const rowStyles = {
  miniature: "text-xs h-6",
  "side-by-side": "text-xs",
  toggle: "",
};

export default function BirthCertificateSection({
  data,
  sectionIdx,
  updateField,
  viewMode,
}: BirthCertificateSectionProps) {
  const { title, fields } = data;

  return (
    <Container as="section">
      {title !== null ? (
        <Title
          as="h2"
          className={`text-lg font-semibold mx-2 mb-2 border-b border-accent-foreground ${titleStyles[viewMode]}  `}
        >
          {title}
        </Title>
      ) : null}
      {fields.map((field, fieldIdx) => (
        <InfoRow
          key={field.id}
          fieldData={field}
          sectionIdx={sectionIdx}
          fieldIdx={fieldIdx}
          updateField={updateField}
          className={rowStyles[viewMode]}
        />
      ))}
    </Container>
  );
}
