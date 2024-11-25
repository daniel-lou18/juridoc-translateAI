import { cleanKey, cleanValue } from "../../shared/cleanString";

export function getFieldsFromRows(rows: Element[]) {
  const data: Record<string, string> = {};
  let section = "";
  rows.forEach((row) => {
    const [firstCell, secondCell] = row.querySelectorAll("td");
    const key = cleanKey(firstCell?.textContent);
    const value = cleanValue(secondCell?.textContent);

    if (key.toLowerCase().includes("averbamento")) {
      const keyArray = key.split(",");
      data[`${keyArray[0]}`] = key;
    } else if (data[key]) {
      data[`${key}-${section}`] = value;
    } else if (key && value) {
      data[key] = value;
    } else if (key && !value) {
      const first = key.split(" ")[0];
      section = first;
      data[first] = cleanValue(key);
    }
  });

  return data;
}
