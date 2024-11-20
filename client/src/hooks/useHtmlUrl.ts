import { useEffect, useState } from "react";
import { extractHtml, createUrlFromHtmlString } from "@/utils/fileHandlers";
import { HtmlContent } from "@/types/BirthCertificate_POR";

export function useHtmlUrl(file: File | null) {
  const [blobUrl, setBlobUrl] = useState("");
  const [htmlContent, setHtmlContent] = useState<HtmlContent | null>(null);

  useEffect(() => {
    let newBlobUrl = "";

    if (!file) return;

    async function getHtmlContent(file: File) {
      try {
        const { htmlContent, htmlString } = await extractHtml(file);

        if (!htmlContent || !htmlString) {
          throw new Error("No html content to display");
        }

        newBlobUrl = createUrlFromHtmlString(htmlString);
        setBlobUrl(newBlobUrl);
        setHtmlContent(htmlContent);
      } catch (error) {
        console.log(error);
      }
    }

    getHtmlContent(file);

    return () => URL.revokeObjectURL(newBlobUrl);
  }, [file]);

  return { htmlContent, blobUrl };
}
