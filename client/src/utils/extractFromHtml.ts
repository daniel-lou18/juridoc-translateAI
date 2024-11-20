import { annotationsMap } from "@/schemas/birthTemplates";
import { Amendment, EnglishBirthCertificate } from "./translation";
import { getChatCompletion } from "@/services/getChatCompletion";
import { createTranslateSegmentPrompt } from "./prompts";
import { HtmlContent } from "@/types/BirthCertificate_POR";

function getRows(element: Element) {
  const tables = element.querySelectorAll("table");
  const rows: Element[] = [];

  tables.forEach((table) => rows.push(...table.querySelectorAll("tr")));
  return rows;
}

// function splitBirthCertificate(rows: Element[]) {
//   const page1: Element[] = [];
//   const page2: Element[] = [];
//   const regex = /\bProcesso\s+.*?\d+\s*\/\s*\d+/;
//   let matchFound = false;

//   const checkRow = (row: Element) =>
//     Array.from(row.querySelectorAll("td")).some(
//       (cell) => cell.textContent && regex.test(cleanValue(cell.textContent))
//     );

//   rows.forEach((row) => {
//     if (matchFound) {
//       page2.push(row);
//     } else if (checkRow(row)) {
//       matchFound = true;
//       page1.push(row);
//     } else {
//       page1.push(row);
//     }
//   });

//   return [page1, page2];
// }

function getAnnotations(rows: Element[]) {
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

async function translateAnnotationLlm(
  text: string,
  annotationsMap: Record<string, string>,
  idx: number
) {
  for (const key of Object.keys(annotationsMap)) {
    if (text.includes(key)) {
      try {
        const result = await getChatCompletion(
          createTranslateSegmentPrompt(
            text,
            "Portuguese",
            annotationsMap[key as keyof typeof annotationsMap],
            "French"
          )
        );

        const parsedResult =
          result.match(
            /### START ANSWER ###\n([\s\S]*?)\n### END ANSWER ###/
          )?.[1] ||
          result ||
          "";

        return parsedResult.trim();
      } catch (error) {
        console.log(`Error translating annotation at index ${idx}:`, error);
        return text;
      }
    }
  }
  return text;
}

function translateAnnotationRegex(annotations: string[], idx: number) {
  return {
    description: annotations[idx].match(
      /Averbamento\s+no\.\s*(\d+)\s*,.*?((?:\d{1,4}[-/.]\d{1,4}[-/.]\d{1,4})$)/
    ) || ["", "", ""],
    responsible: {
      person: annotations[idx + 2].match(/^(.*?),/)?.[1] || "",
      office:
        annotations[idx + 2].match(
          /(?:Civil|Predial|Comercial|de)\s+([A-ZÉÀÁÂÃÇÍa-zà-ÿ]+)$/
        )?.[1] || "",
    },
  };
}

async function translateAnnotations(annotations: string[]) {
  const results: Amendment[] = [];

  for (let idx = 0; idx < annotations.length; idx++) {
    const text = annotations[idx];

    if (text.includes("Averbamento")) {
      const {
        description: [, number, date],
        responsible,
      } = translateAnnotationRegex(annotations, idx);

      const result = await translateAnnotationLlm(
        annotations[idx + 1],
        annotationsMap,
        idx
      );

      results[parseInt(number) - 1] = {
        number,
        description: result || "",
        date,
        responsible,
      };
    }
  }

  return results;
}

function extractFromHtml(rows: Element[]) {
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

function cleanValue(value: string | null) {
  if (!value) return "";

  return value.trim().replace(/\n|\t/g, " ").replace(/\s+/g, " ");
}

function cleanKey(key: string | null) {
  if (!key) return "";

  return key
    .trim()
    .replace(/:[^:]*$/, "")
    .replace(/\n|\t/g, " ")
    .replace(/\s+/g, " ");
}

export async function createTranslationObject(htmlContent: HtmlContent) {
  const [certificateHtml, annotationsHtml] = htmlContent;
  const certificateRows = getRows(certificateHtml);
  const annotationsRows = getRows(annotationsHtml);

  const rawData = extractFromHtml(certificateRows);
  const annotations = getAnnotations(annotationsRows);
  const translatedAnnotations = await translateAnnotations(annotations);

  const parseDateTime = (dateTimeString: string) => {
    return {
      hours: dateTimeString?.match(/(\d+)\s*horas/)?.[1] || "",
      minutes: dateTimeString?.match(/(\d+)\s*minutos/)?.[1] || "",
      day: dateTimeString?.match(/dia\s*(\d+)/)?.[1] || "",
      month: dateTimeString?.match(/de\s*(\w+)\s*de/)?.[1] || "",
      year: dateTimeString?.match(/de\s*(\d{4})\s*\*\*\*/)?.[1] || "",
    };
  };

  const birthCertificate: EnglishBirthCertificate = {
    registryOffice: {
      municipality:
        rawData["Conservatória"].match(
          /(?:Civil|Predial|Comercial)\s*(.*)/
        )?.[1] ||
        rawData["Conservatória"] ||
        "",
      birthRecordNumber: rawData["Assento"].match(/\d+/)?.[0] || "",
      birthRecordYear: rawData["Assento"].match(/\d{4}\b(?!.*\d)/)?.[0] || "",
    },
    registrant: {
      firstName: rawData["Nome próprio"]?.replace(" ***", "") || "",
      surname: rawData["Apelidos"]?.replace(" ***", "") || "",
      gender: rawData["Sexo"]?.replace(" ***", "") || "",
      birthTimeAndDate: parseDateTime(rawData["Hora e data do nascimento"]),
      birthplace: {
        parish:
          rawData["Naturalidade"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*/)?.[1] || "",
        municipality:
          rawData["Naturalidade"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*$/)?.[1] || "",
      },
    },
    father: {
      name: rawData["Nome"]?.replace(" ***", "") || "",
      age: rawData["Idade"]?.match(/(\d+)/)?.[1] || "",
      status: rawData["Estado"]?.replace(" ***", "") || "",
      birthplace: {
        parish:
          rawData["Naturalidade-Pai"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*/)?.[1] || "",
        municipality:
          rawData["Naturalidade-Pai"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*$/)?.[1] ||
          "",
      },
      usualResidence: {
        place:
          rawData["Residência habitual"]?.match(/(\w+[\wÀ-ÿ]*)\s*,/)?.[1] || "",
        parish:
          rawData["Residência habitual"]?.match(/, (\w+[\wÀ-ÿ]*)\s*,/)?.[1] ||
          "",
        municipality:
          rawData["Residência habitual"]?.match(
            /, (\w+[\wÀ-ÿ]*) \*\*\*/
          )?.[1] || "",
      },
    },
    mother: {
      name: rawData["Nome-Mãe"]?.replace(" ***", "") || "",
      age: rawData["Idade-Mãe"]?.match(/(\d+)/)?.[1] || "",
      status: rawData["Estado-Mãe"]?.replace(" ***", "") || "",
      birthplace: {
        parish:
          rawData["Naturalidade-Mãe"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*/)?.[1] || "",
        municipality:
          rawData["Naturalidade-Mãe"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*$/)?.[1] ||
          "",
      },
      usualResidence: {
        place:
          rawData["Residência habitual-Mãe"]?.match(/(\w+[\wÀ-ÿ]*)\s*,/)?.[1] ||
          "",
        parish:
          rawData["Residência habitual-Mãe"]?.match(
            /, (\w+[\wÀ-ÿ]*)\s*,/
          )?.[1] || "",
        municipality:
          rawData["Residência habitual-Mãe"]?.match(
            /, (\w+[\wÀ-ÿ]*) \*\*\*/
          )?.[1] || "",
      },
    },
    paternalGrandparents: rawData["Avós paternos"]?.replace(" ***", "") || "",
    maternalGrandparents: rawData["Avós maternos"]?.replace(" ***", "") || "",
    declarant: rawData["Declarante(s)"]?.replace(" ***", "") || "",
    specialMentions: rawData["MençÁµes especiais"]?.replace(" ***", "") || "",
    witnesses: rawData["Testemunha(s)"]?.replace(" ***", "") || "",
    birthRecordDate: {
      day: rawData["Data do assento"].match(/(\d{2})/)?.[0] || "",
      month: rawData["Data do assento"].match(/de (\w+)/)?.[1] || "",
      year: rawData["Data do assento"].match(/de (\d{4})/)?.[1] || "",
    },
    officer: {
      position: rawData["O/A"]?.match(/(?<=O\/A\s)([^,]+)/)?.[1]?.trim() || "",
      name: rawData["O/A"]?.match(/(?<=,)([^,]+)(?=,)/)?.[1]?.trim() || "",
      qualification: rawData["O/A"]?.match(/(?<=,)([^,]+)$/)?.[1]?.trim() || "",
    },
    processNumber: rawData["Processo"]?.match(/(\d+\/\s*\d+)$/)?.[0] || "",
    amendments: [...translatedAnnotations],
  };

  return birthCertificate;
}
