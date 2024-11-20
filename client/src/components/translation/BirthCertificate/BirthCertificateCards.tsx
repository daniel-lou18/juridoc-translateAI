import { useViewContext } from "@/contexts/viewContext";
import { useCertificate } from "@/hooks/useCertificate";
import BirthCertificateCard from "./BirthCertificateCard";
import { convertBirthCertificateToState } from "@/utils/translation";
import Container from "@/components/ui/common/Container";

export default function BirthCertificateCards({
  translation,
}: {
  translation: ReturnType<typeof convertBirthCertificateToState>;
}) {
  const { state, updateField, updateAnnotation, handleNewPage } =
    useCertificate(translation);
  const { viewMode } = useViewContext();

  if (viewMode === "side-by-side") {
    return (
      <Container className={`col-start-2`}>
        <BirthCertificateCard
          state={state}
          updateField={updateField}
          updateAnnotation={updateAnnotation}
          handleNewPage={handleNewPage}
          viewMode={viewMode}
        />
      </Container>
    );
  }

  return (
    <Container
      className={
        viewMode === "toggle" ? "" : "col-start-2 grid grid-rows-2 gap-8"
      }
    >
      {state.pages.map((page, idx) => (
        <BirthCertificateCard
          key={page.length}
          state={state}
          updateField={updateField}
          updateAnnotation={updateAnnotation}
          handleNewPage={handleNewPage}
          viewMode={viewMode}
          pageNum={idx + 1}
        />
      ))}
    </Container>
  );
}
