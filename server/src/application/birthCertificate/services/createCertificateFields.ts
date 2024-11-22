import { BirthCertificate } from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import { birthCertificateFieldMappings } from "./BirthCertificateKeyMap_PT";
import { parseValueFields } from "./parseValueFields";

const parseDateTime = (dateTimeString: string) => {
  return {
    hours: dateTimeString?.match(/(\d+)\s*horas/)?.[1] || null,
    minutes: dateTimeString?.match(/(\d+)\s*minutos/)?.[1] || null,
    day: dateTimeString?.match(/dia\s*(\d+)/)?.[1] || null,
    month: dateTimeString?.match(/de\s*(\w+)\s*de/)?.[1] || null,
    year: dateTimeString?.match(/de\s*(\d{4})/)?.[1] || null,
  };
};

type AdjustFieldType<T, K extends keyof T, NewType> = Omit<T, K> & {
  [P in K]: NewType;
};

export function createCertificateFields(
  fields: Record<string, string>
): Omit<BirthCertificate, "amendments"> {
  const result = parseValueFields(fields, birthCertificateFieldMappings);

  if (result.registrant.birthTimeAndDate) {
    const newBirthTimeAndDate = parseDateTime(
      result.registrant.birthTimeAndDate
    );
    // Issue: correct TS error due to birthTimeAndDate being typed as a string
    (result.registrant as any).birthTimeAndDate = newBirthTimeAndDate;
  }

  console.log(result);
  return result;
}
