export const FILETYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
  "image/tiff",
  "image/x-icon",
  "application/pdf",
  "multipart/related",
];

export const ACCEPTED_FILETYPES = "image/*,.pdf,.mthml";

export const PDF_CONVERT_TO_IMAGE_PATH = "pdf/convert-to-image";

export const parsedObject = {
  title: {
    county: "Braga",
    birthRegistrationNumber: "11815",
    registrationYear: "2013",
  },
  subject: {
    firstName: "Baltazar",
    surnames: "da Silva Costa",
    gender: "Masculino",
    dateTimeOfBirth: {
      hours: "16",
      minutes: "OO",
      day: "09",
      month: "Janeiro",
      year: "1938",
    },
    birthplace: {
      parish: "Adaúfe",
      county: "Braga",
    },
  },
  father: {
    name: "António da Costa",
    age: "37",
    status: "Casado(a)",
    birthplace: {
      parish: "Adaúfe",
      county: "Braga",
    },
    usualResidence: {
      place: "Outeiro",
      parish: "Adaúfe",
      county: "Braga",
    },
  },
  mother: {
    name: "Maria da Silva",
    age: "37",
    status: "Casado(a)",
    birthplace: {
      parish: "Adaúfe",
      county: "Braga",
    },
    usualResidence: {
      place: "Outeiro",
      parish: "Adaúfe",
      county: "Braga",
    },
  },
  paternalGrandparents: ["Manuel Francisco da Costa", "Maria Fernandes"],
  maternalGrandparents: ["José da Silva", "Maria da Silva"],
  declarants: "",
  specialMentions: "",
  witnesses: "",
  registrationDate: {
    day: "01",
    month: "Outubro",
    year: "2013",
  },
  officer: {
    position: "2º Ajudante",
    name: "Maria de Fátima Esteves Vieites",
    comment: "Por competência própria",
  },
  processNumber: "16633/2013",
  amendments: [],
};

export const testText = `
Conservatória do Registo Civil/ Predial/ Comercial Monção
Registando
Nome próprio
Apelidos:
Sexo:
Hora e data do
nascimento:
Naturalidade:
Pai
Nome:
Idade:
Estado:
Naturalidade:
Residência habitual:
Mãe
Nome:
Idade:
Estado:
Naturalidade:
Residência habitual:
Avós paternos:
Avós maternos:
Declarante(s):
Menções especiais:
Testemunha(s):
Data do assento:
Assento de Nascimento n.0 2979 do ano de 2012
Esperança *
Fernandes Alves ***
Feminino ***
09 horas e 00 minutos , do dia 15 de Janeiro de 1941 ***
freguesia de Abedim ***
concelho de Monção ***
Luiz Alves *
28 anos ***
CasadO(a) *
freguesia de Abedim ***
concelho de Monção ***
lugar de Painçais, freguesia de Abedim, concelho de Monção ***
Rosa Fernandes ***
25 anos ***
Casado(a)
freguesia de Abedim ***
concelho de Monção ***
lugar de Painçais, freguesia de Abedim, concelho de Monção ***
Simão Alves e Bárbara de Carvalho ***
Januário Fernandes e Maria Gonçalves ***
27 de Agosto de 2012 ***
O/ A 20 Ajudante, Maria Lurdes Simenta Valadas Mendes Rodrigues , Por competência própria
Processo n.0 3436/ 2012
`;
