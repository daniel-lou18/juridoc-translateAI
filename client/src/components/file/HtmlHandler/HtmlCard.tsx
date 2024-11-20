import { Card, CardContent, CardFooter } from "@/components/ui/card";
import TextCardHeader from "../../ui/common/TextCard/TextCardHeader";
import Title from "../../ui/common/Title";
import TextCardControls from "../../ui/common/TextCard/TextCardControls";
import { useViewContext } from "@/contexts/viewContext";
import { PageNav } from "@/components/ui/common/PageNum";
import { useState } from "react";

type HtmlCardProps = {
  htmlContent: Element[];
  pageIdx?: number;
};

export default function HtmlCard({ htmlContent, pageIdx }: HtmlCardProps) {
  const { viewMode } = useViewContext();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = htmlContent.length;
  const currentContent =
    pageIdx !== undefined ? htmlContent[pageIdx] : htmlContent[currentPage - 1];

  const cardStyles = {
    miniature: "h-full",
    "side-by-side": "text-xs sticky top-4",
    toggle: "",
  };

  const contentStyles = {
    miniature: "text-xs",
    "side-by-side": "text-xs",
    toggle: "",
  };

  return (
    <Card
      className={`flex flex-col w-full h-fit min-h-screen mb-12 text-sm ${cardStyles[viewMode]}`}
    >
      <TextCardHeader>
        <TextCardControls saveButtonVisible={false}>
          <Title className="text-sm text-muted-foreground">
            {`Texte original (${
              pageIdx !== undefined ? pageIdx + 1 : currentPage
            }/${totalPages})`}
          </Title>
        </TextCardControls>
      </TextCardHeader>
      <CardContent
        className={`flex-1 p-8 space-y-4 ${contentStyles[viewMode]}`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: currentContent.outerHTML,
          }}
        />
      </CardContent>
      {viewMode !== "miniature" ? (
        <CardFooter className={pageIdx !== undefined ? "self-center" : ""}>
          {pageIdx === undefined ? (
            <PageNav
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          ) : (
            `-${pageIdx + 1}-`
          )}
        </CardFooter>
      ) : null}
    </Card>
  );
}
