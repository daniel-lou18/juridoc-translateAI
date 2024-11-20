import { useHtmlContext } from "@/contexts/htmlContext";
import HtmlFile from "./HtmlFile";
import HtmlViewerContainer from "./HtmlViewerContainer";
import ViewContextProvider from "@/contexts/viewContext";

export default function BirthCertHtml() {
  const { file } = useHtmlContext();

  return (
    <>
      {file ? (
        <ViewContextProvider>
          <HtmlViewerContainer />
        </ViewContextProvider>
      ) : (
        <HtmlFile />
      )}
    </>
  );
}
