import { Card, CardContent, CardFooter } from "@/components/ui/card";
import TextCardHeader from "../../ui/common/TextCard/TextCardHeader";
import Title from "../../ui/common/Title";
import { PageNav } from "../../ui/common/PageNum";
import TextCardControls from "../../ui/common/TextCard/TextCardControls";
import { BirthCertificateSection as BirthCertificateSectionType } from "@/types/Components";
import BirthCertificateTitle from "./BirthCertificateTitle";
import { Amendment } from "@/utils/translation";
import { useCertificate } from "@/hooks/useCertificate";
import BirthCertificateSections from "./BirthCertificateSections";
import BirthAnnotationsSections from "./BirthAnnotationsSections";
import { ViewOptions } from "@/contexts/viewContext";

const viewStyles = {
  miniature: "col-span-1 h-full",
  "side-by-side": "h-fit col-span-1 sticky top-4",
  toggle: "h-fit",
};

type BirthAnnotationsSectionsProps = ReturnType<typeof useCertificate> & {
  viewMode: ViewOptions;
  pageNum?: number;
};

export default function BirthCertificateCard({
  state,
  updateField,
  updateAnnotation,
  handleNewPage,
  viewMode,
  pageNum,
}: BirthAnnotationsSectionsProps) {
  return (
    <Card
      className={`w-full max-w-4xl min-h-screen flex flex-col mb-12 ${viewStyles[viewMode]}`}
    >
      <TextCardHeader>
        <TextCardControls saveButtonVisible={state.modified}>
          <Title className="text-sm text-muted-foreground">
            {`Texte traduit (${pageNum ? pageNum : state.currentPage}/${
              state.pages.length
            })`}
          </Title>
        </TextCardControls>
      </TextCardHeader>
      <CardContent
        className={`flex-1 ${
          viewMode === "toggle" ? "space-y-4" : "space-y-1"
        }`}
      >
        <BirthCertificateTitle
          currentPageIdx={pageNum ? pageNum - 1 : state.currentPage - 1}
          data={state.pageHeader}
          viewMode={viewMode}
        />
        {pageNum === 1 || (!pageNum && state.currentPage === 1) ? (
          <BirthCertificateSections
            sections={state.pages[0] as BirthCertificateSectionType[]}
            viewMode={viewMode}
            updateField={updateField}
          />
        ) : null}
        {pageNum === 2 || (!pageNum && state.currentPage === 2) ? (
          <BirthAnnotationsSections
            sections={state.pages[1] as Amendment[]}
            viewMode={viewMode}
            updateField={updateAnnotation}
          />
        ) : null}
      </CardContent>
      {viewMode !== "miniature" ? (
        <CardFooter
          className={viewMode !== "side-by-side" ? "self-center" : ""}
        >
          {viewMode === "side-by-side" ? (
            <PageNav
              currentPage={state.currentPage}
              totalPages={state.pages.length}
              setCurrentPage={handleNewPage}
            />
          ) : (
            `-${pageNum}-`
          )}
        </CardFooter>
      ) : null}
    </Card>
  );
}
