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

type StringOrNull = string | null;

export interface RegistryOffice {
  municipality: StringOrNull;
  birthRecordNumber: StringOrNull;
  birthRecordYear: StringOrNull;
}

interface Birthplace {
  parish: StringOrNull;
  municipality: StringOrNull;
}

interface UsualResidence {
  place: StringOrNull;
  parish: StringOrNull;
  municipality: StringOrNull;
}

export interface BirthTimeAndDate extends Date {
  hours: StringOrNull;
  minutes: StringOrNull;
}

export type MultiLangMonth = MonthFr | MonthPt;

export interface Date<T extends StringOrNull = MultiLangMonth> {
  day: StringOrNull;
  month: T;
  year: StringOrNull;
}

export type MultiLangStatus = MaritalStatusFr | MaritalStatusPt;

interface Person<T extends StringOrNull = MultiLangStatus> {
  name: StringOrNull;
  age: StringOrNull;
  status: T;
  birthplace: Birthplace;
  usualResidence: UsualResidence;
}

export type MultiLangGender = GenderFr | GenderPt;

interface Registrant<T extends StringOrNull = MultiLangGender> {
  firstName: StringOrNull;
  surname: StringOrNull;
  gender: T;
  birthTimeAndDate: BirthTimeAndDate;
  birthplace: Birthplace;
}

export type MultiLangOfficerPosition = OfficerPositionFr | OfficerPositionPt;

export interface Officer<T extends StringOrNull = MultiLangOfficerPosition> {
  position: T;
  name: StringOrNull;
  qualification?: StringOrNull;
  office?: StringOrNull;
}

export interface Amendment {
  number: StringOrNull;
  date: StringOrNull;
  description: StringOrNull;
  responsible: {
    person: StringOrNull;
    office: StringOrNull;
  };
}

export interface BirthCertificate {
  registryOffice: RegistryOffice;
  registrant: Registrant;
  father: Person;
  mother: Person;
  paternalGrandparents: StringOrNull;
  maternalGrandparents: StringOrNull;
  declarant: StringOrNull;
  specialMentions: StringOrNull;
  witnesses: StringOrNull;
  birthRecordDate: Date<MonthFr | MonthPt>;
  officer: Officer;
  processNumber: StringOrNull;
  amendments: Amendment[];
}
