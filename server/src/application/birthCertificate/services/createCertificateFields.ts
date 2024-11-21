import {
  BirthCertificate,
  BirthTimeAndDate,
} from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import {
  birthCertificateFieldMappings,
  parseValueFields,
} from "../../../domain/birthCertificate/interfaces/BirthCertificateKeyMap_PT";
import {
  GenderPt,
  MaritalStatusPt,
  MonthPt,
  OfficerPositionPt,
} from "../../../domain/birthCertificate/interfaces/BirthCertificatePT";

export function createCertificateFields(
  fields: Record<string, string>
): Omit<BirthCertificate, "amendments"> {
  const parseDateTime = (dateTimeString: string) => {
    return {
      hours: dateTimeString?.match(/(\d+)\s*horas/)?.[1] || null,
      minutes: dateTimeString?.match(/(\d+)\s*minutos/)?.[1] || null,
      day: dateTimeString?.match(/dia\s*(\d+)/)?.[1] || null,
      month: dateTimeString?.match(/de\s*(\w+)\s*de/)?.[1] || null,
      year: dateTimeString?.match(/de\s*(\d{4})\s*\*\*\*/)?.[1] || null,
    };
  };

  const result = parseValueFields(fields, birthCertificateFieldMappings);
  console.log(result);

  throw new Error("j");

  const birthCertificate = {
    registryOffice: {
      municipality:
        fields["Conservatória"].match(
          /(?:Civil|Predial|Comercial)\s*(.*)/
        )?.[1] ||
        fields["Conservatória"] ||
        null,
      birthRecordNumber: fields["Assento"].match(/\d+/)?.[0] || null,
      birthRecordYear: fields["Assento"].match(/\d{4}\b(?!.*\d)/)?.[0] || null,
    },
    registrant: {
      firstName: fields["Nome próprio"]?.replace(" ***", "") || null,
      surname: fields["Apelidos"]?.replace(" ***", "") || null,
      gender: (fields["Sexo"]?.replace(" ***", "") || null) as GenderPt,
      birthTimeAndDate: parseDateTime(
        fields["Hora e data do nascimento"]
      ) as BirthTimeAndDate,
      birthplace: {
        parish:
          fields["Naturalidade"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*/)?.[1] || null,
        municipality:
          fields["Naturalidade"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*$/)?.[1] || null,
      },
    },
    father: {
      name: fields["Nome"]?.replace(" ***", "") || null,
      age: fields["Idade"]?.match(/(\d+)/)?.[1] || null,
      status: (fields["Estado"]?.replace(" ***", "") ||
        null) as MaritalStatusPt,
      birthplace: {
        parish:
          fields["Naturalidade-Pai"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*/)?.[1] ||
          null,
        municipality:
          fields["Naturalidade-Pai"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*$/)?.[1] || "",
      },
      usualResidence: {
        place:
          fields["Residência habitual"]?.match(/(\w+[\wÀ-ÿ]*)\s*,/)?.[1] ||
          null,
        parish:
          fields["Residência habitual"]?.match(/, (\w+[\wÀ-ÿ]*)\s*,/)?.[1] ||
          "",
        municipality:
          fields["Residência habitual"]?.match(/, (\w+[\wÀ-ÿ]*) \*\*\*/)?.[1] ||
          null,
      },
    },
    mother: {
      name: fields["Nome-Mãe"]?.replace(" ***", "") || null,
      age: fields["Idade-Mãe"]?.match(/(\d+)/)?.[1] || null,
      status: (fields["Estado-Mãe"]?.replace(" ***", "") ||
        null) as MaritalStatusPt,
      birthplace: {
        parish:
          fields["Naturalidade-Mãe"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*/)?.[1] ||
          null,
        municipality:
          fields["Naturalidade-Mãe"]?.match(/(\w+[\wÀ-ÿ]*) \*\*\*$/)?.[1] || "",
      },
      usualResidence: {
        place:
          fields["Residência habitual-Mãe"]?.match(/(\w+[\wÀ-ÿ]*)\s*,/)?.[1] ||
          "",
        parish:
          fields["Residência habitual-Mãe"]?.match(
            /, (\w+[\wÀ-ÿ]*)\s*,/
          )?.[1] || null,
        municipality:
          fields["Residência habitual-Mãe"]?.match(
            /, (\w+[\wÀ-ÿ]*) \*\*\*/
          )?.[1] || null,
      },
    },
    paternalGrandparents: fields["Avós paternos"]?.replace(" ***", "") || null,
    maternalGrandparents: fields["Avós maternos"]?.replace(" ***", "") || null,
    declarant: fields["Declarante(s)"]?.replace(" ***", "") || null,
    specialMentions: fields["MençÁµes especiais"]?.replace(" ***", "") || null,
    witnesses: fields["Testemunha(s)"]?.replace(" ***", "") || null,
    birthRecordDate: {
      day: fields["Data do assento"].match(/(\d{2})/)?.[0] || null,
      month: (fields["Data do assento"].match(/de (\w+)/)?.[1] ||
        null) as MonthPt,
      year: fields["Data do assento"].match(/de (\d{4})/)?.[1] || null,
    },
    officer: {
      position: (fields["O/A"]?.match(/(?<=O\/A\s)([^,]+)/)?.[1]?.trim() ||
        null) as OfficerPositionPt,
      name: fields["O/A"]?.match(/(?<=,)([^,]+)(?=,)/)?.[1]?.trim() || null,
      qualification:
        fields["O/A"]?.match(/(?<=,)([^,]+)$/)?.[1]?.trim() || null,
    },
    processNumber: fields["Processo"]?.match(/(\d+\/\s*\d+)$/)?.[0] || null,
  };

  return birthCertificate;
}
