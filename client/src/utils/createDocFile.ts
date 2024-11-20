import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";

interface DocGeneratorOptions {
  title?: string;
  sourceLang?: string;
  targetLang?: string;
  fontSize?: number;
  spacing?: number;
}

export async function createTranslationDoc(
  translatedPages: string[],
  options: DocGeneratorOptions = {}
) {
  const {
    title = "Translated Document",
    targetLang = "unknown",
    fontSize = 24, // 12pt
    spacing = 360, // 1.5 line spacing
  } = options;

  // Process each page to extract content between markers
  const processedPages = translatedPages.map((pageText) => {
    const match = pageText.match(/\[PAGE \d+\]\n([\s\S]*?)\n\[END PAGE \d+\]/);
    return match ? match[1].trim() : pageText.trim();
  });

  // Create the document
  const doc = new Document({
    title,
    creator: "Translation Service",
    description: `Translation to ${targetLang}`,
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: fontSize,
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: processedPages.flatMap((pageContent, pageIndex) => {
          // Split page content into paragraphs
          const paragraphs = pageContent.split(/\n\n+/);

          // Create paragraphs for current page
          const pageElements = paragraphs.map((para) => {
            // Split paragraph into lines
            const lines = para.split(/\n/);

            return new Paragraph({
              spacing: {
                before: 240, // 12pt
                after: 240,
                line: spacing,
              },
              children: lines
                .map((line, lineIndex) => [
                  new TextRun({
                    text: line,
                    break: lineIndex < lines.length - 1 ? 1 : 0,
                  }),
                ])
                .flat(),
            });
          });

          // Add page break after each page except the last one
          if (pageIndex < processedPages.length - 1) {
            pageElements.push(
              new Paragraph({
                children: [
                  new TextRun({
                    break: 1,
                  }),
                ],
              })
            );
          }

          return pageElements;
        }),
      },
    ],
  });

  // Generate and save the document
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title}.docx`);
}
