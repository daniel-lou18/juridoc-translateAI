type GetRows = (element: Element) => Element[];
type GetFieldsFromRows = (elements: Element[]) => Record<string, string>;

export function extractCertificateFields(
  element: Element,
  getRows: GetRows,
  getFieldsFromRows: GetFieldsFromRows
) {
  const rows = getRows(element);
  const fields = getFieldsFromRows(rows);
  return fields;
}
