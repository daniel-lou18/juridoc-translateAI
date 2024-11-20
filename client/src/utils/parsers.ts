// ajouter markers pour indiquer le début et la fin de chaque page
export function parseTranscribedPages(stringArray: string[]) {
  return stringArray.map((pageContent, index) => {
    return `[PAGE ${index + 1}]\n\n${pageContent}\n\n[END PAGE ${index + 1}]`;
  });
}

// enlever les markers du contenu traduit renvoyé par l'api
export function parseTranslatedPages(translatedTexts: string[]): string[] {
  const pageRegex = /\[PAGE \d+\]\n([\s\S]*?)\n\[END PAGE \d+\]/g;
  const pages: string[] = [];

  for (const text of translatedTexts) {
    let match;
    while ((match = pageRegex.exec(text)) !== null) {
      pages.push(match[1]);
    }
  }

  return pages;
}

// parser la réponse de l'IA contenant les clés et les valeurs en format JSON
export function parseLLMResponse(textResponse: string) {
  console.log(textResponse);
  const jsonMatch = textResponse.match(
    /### START JSON ###(.*?)### END JSON ###/s
  );

  if (!jsonMatch || !jsonMatch[1]) {
    throw new Error("No JSON found in LLM response");
  }

  try {
    const jsonString = jsonMatch[1].trim();
    const parsedObject = JSON.parse(jsonString);
    return parsedObject;
  } catch (error) {
    console.log(error);

    const message =
      error instanceof Error
        ? `Parsing error: ${error.message}`
        : "Unknown error while parsing JSON";

    throw new Error(message);
  }
}

export function parseMhtmlContent(mhtmlString: string): [Element, Element] {
  const boundaryRegex =
    /Content-Type:\s*multipart\/related;[^]*?boundary="([^"]+)"/i;
  const boundaryMatch = mhtmlString.match(boundaryRegex);
  if (!boundaryMatch) throw new Error("Boundary not found");

  const parts = mhtmlString.split(`--${boundaryMatch[1]}`);
  const htmlPart = parts.find((part) =>
    part.includes("Content-Type: text/html")
  );

  const htmlContentMatch = htmlPart?.match(/<html[\s\S]*<\/html>/i);
  if (!htmlContentMatch) throw new Error("No html content found");
  const htmlContent = htmlContentMatch[0];

  const decodedHtml = decodeHtml(htmlContent);
  const formattedHtml = formatHtmlContent(decodedHtml);
  const [page1, page2] = splitBirthCertificate(formattedHtml);
  return [page1, page2];
}

function decodeQuotedPrintable(htmlString: string) {
  const normalizedString = htmlString.replace(/\r\n/g, "\n");

  const unwrappedString = normalizedString.replace(/=\n/g, "");

  const decoded = unwrappedString.replace(/=([A-Fa-f0-9]{2})/g, (_, hex) => {
    const charCode = parseInt(hex, 16);
    return String.fromCharCode(charCode);
  });

  return decoded;
}

export function decodeHtml(html: string) {
  const decodedContent = decodeQuotedPrintable(html);

  const windows1252Bytes = new TextEncoder().encode(decodedContent);
  const utf8String = new TextDecoder("windows-1252").decode(windows1252Bytes);

  const fixedContent = fixMojibake(utf8String);
  return fixedContent;
}

function formatHtmlContent(htmlString: string) {
  const metaTag = document.createElement("meta");

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  updateMetaTags(doc);

  doc.head.appendChild(metaTag);

  return doc;
}

export function htmlElementToString(element: Element) {
  return element.outerHTML;
}

function fixMojibake(text: string): string {
  const mojibakeMap: { [key: string]: string } = {
    "Ã³": "ó",
    "Ã¡": "á",
    "Ã£": "ã",
    Ãº: "ú",
    "Ã©": "é",
    "Ã¢": "â",
    Ãª: "ê",
    "Ã´": "ô",
    "Ã§": "ç",
    Ã: "Á",
    "Ã‰": "É",
    'Ã"': "Ó",
    Ãš: "Ú",
    "Ã‚": "Â",
    ÃŠ: "Ê",
    "Ã‡": "Ç",
    Âº: "º",
    "Â°": "°",
    Ãµ: "õ",
    "Ã•": "Õ",
    "Ã¨": "è",
    "Ã¬": "ì",
    "Ã²": "ò",
    "Ã¹": "ù",
  };

  let fixed = text;
  for (const [mojibake, correct] of Object.entries(mojibakeMap)) {
    fixed = fixed.replace(new RegExp(mojibake, "g"), correct);
  }
  return fixed;
}

function updateMetaTags(doc: Document) {
  // Remove existing charset meta tags
  const existingMeta = doc.querySelector(
    'meta[charset], meta[http-equiv="Content-Type"]'
  );
  if (existingMeta) {
    existingMeta.remove();
  }

  // Add new meta tags
  const charsetMeta = doc.createElement("meta");
  charsetMeta.setAttribute("charset", "utf-8");

  const contentTypeMeta = doc.createElement("meta");
  contentTypeMeta.setAttribute("http-equiv", "Content-Type");
  contentTypeMeta.setAttribute("content", "text/html; charset=utf-8");

  // Insert meta tags at the beginning of head
  const head = doc.head || doc.getElementsByTagName("head")[0];
  head.insertBefore(contentTypeMeta, head.firstChild);
  head.insertBefore(charsetMeta, head.firstChild);
}

function splitBirthCertificate(htmlDoc: Document) {
  const pages = htmlDoc.querySelectorAll(".Section1");

  const getFallback = (htmlDoc: Document) =>
    Array.from(htmlDoc.children).filter(
      (child) => child.querySelectorAll("table").length > 0
    );

  const [page1, page2] = pages.length > 0 ? pages : getFallback(htmlDoc);
  return [page1, page2];
}
