import { cleanValue } from "./cleanString";

export function getAnnotationsFromRows(rows: Element[]) {
  const data: string[] = [];
  let isAnnotation = false;

  rows.forEach((row) => {
    const [firstCell] = row.querySelectorAll("td");
    const text = firstCell?.textContent;

    if (text?.includes("Averbamento")) {
      isAnnotation = true;
    }

    if (isAnnotation && text) {
      data.push(cleanValue(text));
    }
  });

  return data;
}
