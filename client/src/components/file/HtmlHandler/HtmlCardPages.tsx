import Container from "@/components/ui/common/Container";
import { useViewContext } from "@/contexts/viewContext";
import HtmlCard from "./HtmlCard";
import { useHtmlContext } from "@/contexts/htmlContext";

export default function HtmlCardPages() {
  const { viewMode } = useViewContext();
  const { htmlContent } = useHtmlContext();

  if (!htmlContent) return null;

  if (viewMode === "side-by-side")
    return (
      <Container className="col-start-1 row-start-1">
        <HtmlCard htmlContent={htmlContent} />
      </Container>
    );

  return (
    <Container
      className={
        viewMode === "toggle" ? "" : "col-start-1 grid grid-rows-2 gap-8"
      }
    >
      {htmlContent.map((element, idx) => (
        <HtmlCard
          key={element.outerHTML.length}
          htmlContent={htmlContent}
          pageIdx={idx}
        />
      ))}
    </Container>
  );
}
