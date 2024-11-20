import { JSDOM } from "jsdom";

export function deserializeHtml(html: string | string[]) {
  if (!html || (Array.isArray(html) && html.length === 0)) return null;

  if (typeof html === "string") {
    const dom = new JSDOM(html);
    return dom.window.document.firstElementChild;
  }

  if (Array.isArray(html)) {
    return html.map((htmlString) => {
      const dom = new JSDOM(htmlString);
      return dom.window.document.firstElementChild;
    });
  }

  return null;
}
