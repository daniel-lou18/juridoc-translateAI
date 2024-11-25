export function getRows(element: Element) {
  const tables = element.querySelectorAll("table");
  const rows: Element[] = [];

  tables.forEach((table) => rows.push(...table.querySelectorAll("tr")));
  return rows;
}
