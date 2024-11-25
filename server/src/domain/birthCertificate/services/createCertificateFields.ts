import { birthCertificateFieldMappings } from "../interfaces/BirthCertificateKeyMap_PT";
import { parseValueFields } from "./parseValueFields";

const parseDateTime = (dateTimeString: string | null) => {
  if (!dateTimeString) return null;

  return {
    hours: dateTimeString?.match(/(\d+)\s*horas/)?.[1] || null,
    minutes: dateTimeString?.match(/(\d+)\s*minutos/)?.[1] || null,
    day: dateTimeString?.match(/dia\s*(\d+)/)?.[1] || null,
    month: dateTimeString?.match(/de\s*(\w+)\s*de/)?.[1] || null,
    year: dateTimeString?.match(/de\s*(\d{4})/)?.[1] || null,
  };
};

export function createCertificateFields(
  fields: Record<string, string>,
  fieldMappings: typeof birthCertificateFieldMappings
) {
  const result = parseValueFields(fields, fieldMappings);

  const newBirthTimeAndDate = parseDateTime(result.registrant.birthTimeAndDate);

  const resultWithTimeAndDate = {
    ...result,
    registrant: { ...result.registrant, birthTimeAndDate: newBirthTimeAndDate },
  };

  return resultWithTimeAndDate;
}
