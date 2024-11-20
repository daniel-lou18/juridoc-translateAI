type GetRows = (element: Element) => Element[];
type GetAnnotationsFromRows = (elements: Element[]) => string[];

export function extractAnnotations(
  element: Element,
  getRows: GetRows,
  getAnnotationsFromRows: GetAnnotationsFromRows
) {
  const rows = getRows(element);
  const fields = getAnnotationsFromRows(rows);
  return fields;
}
