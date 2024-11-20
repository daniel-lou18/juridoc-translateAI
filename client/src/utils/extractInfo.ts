interface Location {
  village: string;
  commune: string;
}

interface Domicile extends Location {
  lugar: string;
}

interface Date {
  day: string;
  month: string;
  year: string;
}

interface BirthDate extends Date {
  hours: string;
  minutes: string;
}

interface Person_Props_FR {
  birthPlace: Partial<Location>;
}

interface Parent_Props_FR extends Person_Props_FR {
  name: string;
  age: string;
  maritalStatus: string;
  fullDomicile: string;
  domicile: Partial<Domicile>;
}

interface Child_Props_FR extends Person_Props_FR {
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: BirthDate;
  birthPlaceVillage: string;
  birthPlaceCommune: string;
}

interface General_Props_FR {
  grandParentsPater: string;
  grandParentsMater: string;
  registrationDate: Date;
  processNum: string;
  processYear: string;
  officerTitle: string;
  officerName: string;
  officerText: string;
}

type Entry_Props_FR = Record<keyof typeof entryRegex, string>;

export type birthCertificateResult = {
  child: Child_Props_FR;
  father: Parent_Props_FR;
  mother: Parent_Props_FR;
  general: General_Props_FR;
  entry: Entry_Props_FR;
};

export const birthCertificatePort = `
Voici le texte extrait de l'image, en respectant la mise en page originale :

Conservatória do Registro Civil/Predial/Comercial Monção
Assento de Nascimento n.º 2979 do ano de 2012

Registando
Nome próprio: Esperança ***
Apelidos: Fernandes Alves ***
Sexo: Feminino ***
Hora e data do
nascimento: 09 horas e 00 minutos, do dia 15 de Janeiro de 1941 ***
Naturalidade: freguesia de Abedim ***, concelho de Monção ***

Pai
Nome: Luiz Alves ***
Idade: 28 anos ***
Estado: Casado(a) ***
Naturalidade: freguesia de Abedim ***, concelho de Monção ***
Residência habitual: lugar de Painçais, freguesia de Abedim, concelho de Monção ***

Mãe
Nome: Rosa Fernandes ***
Idade: 25 anos ***
Estado: Casado(a) ***
Naturalidade: freguesia de Abedim ***, concelho de Monção ***
Residência habitual: lugar de Painçais, freguesia de Abedim, concelho de Monção ***

Avós paternos: Simão Alves e Bárbara de Carvalho ***
Avós maternos: Januário Fernandes e Maria Gonçalves ***

Declarante(s): ***
Menções especiais: ***
Testemunha(s): ***
Data do assento: 27 de Agosto de 2012 ***

O/A 2º Ajudante, Maria Lurdes Simenta Valadas Mendes Rodrigues, Por competência própria
Processo n.º 3436/2012

Assento de Nascimento 2979/2012, Conservatória do Registo Civil/Predial/Comercial de Monção

Cota : Informatização do assento nº 082/1941 lavrado em 10/2/1941 na Conservatória de Monção - 2012-08-27

Averbamento nº. 1, de 2012-08-27
Casou catolicamente com Libório Rodrigues Cerqueira em 29 de Março de 1967, na freguesia de Espinho,
concelho de Braga. Assento nº 69/67 da Conservatória de Monção. Em 31/3/67.
2º Ajudante(a) Maria Lurdes Simenta Valadas Mendes Rodrigues, Conservatória do Registo
Civil/Predial/Comercial de Monção

Averbamento nº. 2, de 2012-08-27
Alterou o nome para Esperança Fernandes Alves Cerqueira, por efeito de casamento a que se refere o
averbamento nº 1. Doc. nº 22, maço 5-C. Ano de 2005. Em 2/3/05.
2º Ajudante(a) Maria Lurdes Simenta Valadas Mendes Rodrigues, Conservatória do Registo
Civil/Predial/Comercial de Monção
`;

const childRegex = {
  section: /Registando\n((?:.|\n)*?)\n(?=Pai|Mãe|$)/,
  firstName: /Nome próprio (.*?) \*\*\*/,
  lastName: /Apelidos: (.*?) \*\*\*/,
  sex: /Sexo: (.*?) \*\*\*/,
  birthDate:
    /Hora e data do\s*nascimento:\s*(\d{2})\s*horas\s*e\s*(\d{2})\s*minutos.*?dia\s*(\d{1,2})\s*de\s*(\w+)\s*de\s*(\d{4}) \*\*\*/,
  birthPlaceVillage: /(?<=Naturalidade:)(?:\s+\S+)*(?=\s+\*\*\*)/,
  birthPlaceCommune: /(\S+)(?=\s+\*\*\*\nPai)/,
  birthPlace:
    /Naturalidade: freguesia de (.*?) \*\*\*, concelho de (.*?) \*\*\*/,
};

const parentRegex = {
  name: /Nome: (.*?) \*\*\*/,
  age: /Idade: (.*?) anos \*\*\*/,
  maritalStatus: /Estado: (.*?) \*\*\*/,
  birthPlace:
    /Naturalidade: freguesia de (.*?) \*\*\*, concelho de (.*?) \*\*\*/,
  fullDomicile: /Residência habitual: (.*?) \*\*\*/,
  domicile:
    /Residência habitual: lugar de (.*?), freguesia de (.*?), concelho de (.*?) \*\*\*/,
};

const fatherRegex = {
  section: /Pai\n((?:.|\n)*?)\n(?=Mãe|$)/,
  ...parentRegex,
};

const motherRegex = {
  section: /Mãe\n((?:.|\n)*?)\n(?=\n|$)/,
  ...parentRegex,
};

const generalRegex = {
  section: /(Avós\s+paternos:([\s\S]*?)Processo\s+n\.º\s+(\d+\/\d+))/,
  grandParentsPater: /Avós paternos: (.*?) \*\*\*/,
  grandParentsMater: /Avós maternos: (.*?) \*\*\*/,
  registrationDate:
    /Data do assento:\s*(\d{1,2})\s+de\s+([A-Za-z]+)\s+de\s+(\d{4})(?=\s*\*\*\*)/,
  officerTitle: /(?<=O\/A\s)([^,]+)/,
  officerName: /(?<=O\/A\s[^,]+,\s)([^,]+)/,
  officerText: /(?<=,\s)([^,]+)(?=\s*Processo)/,
  processNum: /Processo\s+n\.º\s+(\d+)\/\d+/,
  processYear: /Processo\s+n\.º\s+\d+\/(\d+)/,
};

const entryRegex = {
  section: /Cota\s*(.*?)\r?\n/,
  certificateNum: /Informatização do assento(.*?)(?:,)?\s*lavrado/,
  originalEntryDate: /lavrado em\s*([\d/.-]+)(?:,)?\s*na/,
  officeLocation:
    /(?<=na Conservatória d[aeos]{1,2}\s)([A-Za-zÀ-ÿ\s]+?)(?=\s-\s)/,
  currentEntryDate: /([\d/.-]+)$/,
};

export function extractSimpleFields<T extends Record<string, RegExp>>(
  sourceText: string,
  regex: T
) {
  const result = {} as {
    [key in keyof T]: string;
  };

  const section = regex.section
    ? sourceText.match(regex.section)?.[1] ?? ""
    : sourceText;

  for (const key in regex) {
    if (key === "section") continue;
    result[key] = section?.match(regex[key])?.[1] ?? "";
  }

  return result;
}

function extractDate(sourceText: string, regex: RegExp) {
  const date = sourceText.match(regex);

  if (!date) return { day: "", month: "", year: "" };

  const [, day, month, year] = date;
  return { day, month, year };
}

function extractBirthDate(
  sourceText: string,
  regex: Record<string, RegExp>
): BirthDate {
  const section = sourceText.match(regex.section)?.[1] ?? "";
  const birthDate = section?.match(regex.birthDate);

  if (!birthDate)
    return { hours: "", minutes: "", day: "", month: "", year: "" };

  const [, hours, minutes, day, month, year] = birthDate;
  return { hours, minutes, day, month, year };
}

function extractBirthPlace(
  sourceText: string,
  regex: Record<string, RegExp>
): Location {
  const section = sourceText.match(regex.section)?.[1] ?? "";
  const place = section?.match(regex.birthPlace);

  if (!place) return { village: "", commune: "" };

  const [, village, commune] = place;
  return { village, commune };
}

function extractDomicile(
  sourceText: string,
  regex: Record<string, RegExp>
): Domicile {
  const section = sourceText.match(regex.section)?.[1] ?? "";
  const place = section?.match(regex.domicile);

  if (!place) return { lugar: "", village: "", commune: "" };

  const [, lugar, village, commune] = place;
  return { lugar, village, commune };
}

export function extractChildInfo(
  sourceText: string,
  regex: typeof childRegex = childRegex
): Child_Props_FR {
  return {
    ...extractSimpleFields(sourceText, regex),
    birthDate: extractBirthDate(sourceText, regex),
    birthPlace: extractBirthPlace(sourceText, regex),
  };
}

function extractParentInfo(
  sourceText: string,
  regex: typeof fatherRegex
): Parent_Props_FR {
  return {
    ...extractSimpleFields(sourceText, regex),
    birthPlace: extractBirthPlace(sourceText, regex),
    domicile: extractDomicile(sourceText, regex),
  };
}

export function extractFatherInfo(birthCertificatePort: string) {
  return extractParentInfo(birthCertificatePort, fatherRegex);
}

export function extractMotherInfo(birthCertificatePort: string) {
  return extractParentInfo(birthCertificatePort, motherRegex);
}

export function extractGeneralInfo(
  sourceText: string,
  regex: typeof generalRegex = generalRegex
): General_Props_FR {
  return {
    ...extractSimpleFields(sourceText, regex),
    registrationDate: extractDate(sourceText, regex.registrationDate),
  };
}

export function extractEntryInfo(
  sourceText: string,
  regex: typeof entryRegex = entryRegex
): Entry_Props_FR {
  return {
    ...extractSimpleFields(sourceText, regex),
  };
}

export const maritalStatusTranslations = {
  "solteiro(a)": "Célibataire",
  "casado(a)": "Marié(e)",
  "divorciado(a)": "Divorcé(e)",
  "separado(a)": "Séparé(e)",
  "viuvo(a)": "Veuf/veuve",
  "uniao de facto": "Union libre",
  "desquitado(a)": "Séparé(e) légalement",
};

export const monthsTranslations = {
  janeiro: "janvier",
  fevereiro: "février",
  março: "mars",
  abril: "avril",
  maio: "mai",
  junho: "juin",
  julho: "juillet",
  agosto: "août",
  setembro: "septembre",
  outubro: "octobre",
  novembro: "novembre",
  dezembro: "décembre",
};

export const officerTitleTranslations = {
  "1º ajudante": "1° Assistante",
  "2º ajudante": "2° Assistante",
  escriturário: "Officier d'état civil",
};

export const officerTextTranslations = {
  "por competência própria": "par ses compétences",
};
