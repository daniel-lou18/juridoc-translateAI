import {
  GenderFr,
  MaritalStatusFr,
  MonthFr,
  OfficerPositionFr,
} from "./BirthCertificateFR";
import {
  GenderPt,
  MaritalStatusPt,
  MonthPt,
  OfficerPositionPt,
} from "./BirthCertificatePT";

export const keyMapPtFr: Record<string, string> = {};

export const monthMapPtFr: Record<MonthPt, MonthFr> = {
  Janeiro: "janvier",
  Fevereiro: "fevrier",
  Março: "mars",
  Abril: "avril",
  Maio: "mai",
  Junho: "juin",
  Julho: "juillet",
  Agosto: "aout",
  Setembro: "septembre",
  Outubro: "octobre",
  Novembro: "novembre",
  Dezembro: "decembre",
};

export const maritalStatusMapPtFr: Record<MaritalStatusPt, MaritalStatusFr> = {
  "Solteiro(a)": "Célibataire",
  "Casado(a)": "Marié(e)",
  "Divorciado(a)": "Divorcé(e)",
  "Viúvo(a)": "Veuf/Veuve",
  "União Estável": "Pacsé(e)",
};

export const officerPositionMapPtFr: Record<
  OfficerPositionPt,
  OfficerPositionFr
> = {
  "Oficial de registos": "Officier d'état civil",
  "Ajudante Principal": "Assistant(e) Principal(e)",
  "1º Ajudante": "1º Assistant(e)",
  "2º Ajudante": "2º Assistant(e)",
  "Escriturário Superior": "Greffier Supérieur",
  "Escrivão/Escrivã": "Greffier",
  "Substituto(a)": "Substitut(e)",
  "Oficial do Registro Civil": "Officier d'état civil",
  "Delegado(a)": "Délégué(e)",
  "Chefe de Cartório": "Chef de Bureau",
};

export const genderMapPtFr: Record<GenderPt, GenderFr> = {
  Masculino: "Masculin",
  Feminino: "Féminin",
};

export const officerQualificationMapPtFr: Record<string, string> = {
  "Por competência própria": "Par ses compétences",
};
