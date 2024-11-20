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

export interface RegistryOffice {
  municipality: string;
  birthRecordNumber: string;
  birthRecordYear: string;
}

interface Birthplace {
  parish: string;
  municipality: string;
}

interface UsualResidence {
  place: string;
  parish: string;
  municipality: string;
}

interface BirthTimeAndDate extends Date {
  hours: string;
  minutes: string;
}

type MultiLangMonth = MonthFr | MonthPt;

export interface Date<T extends string = MultiLangMonth> {
  day: string;
  month: T;
  year: string;
}

type MultiLangStatus = MaritalStatusFr | MaritalStatusPt;

interface Person<T extends string = MultiLangStatus> {
  name: string;
  age: string;
  status: T;
  birthplace: Birthplace;
  usualResidence: UsualResidence;
}

type MultiLangGender = GenderFr | GenderPt;

interface Registrant<T extends string = MultiLangGender> {
  firstName: string;
  surname: string;
  gender: T;
  birthTimeAndDate: BirthTimeAndDate;
  birthplace: Birthplace;
}

type MultiLangOfficerPosition = OfficerPositionFr | OfficerPositionPt;

export interface Officer<T extends string = MultiLangOfficerPosition> {
  position: T;
  name: string;
  qualification?: string;
  office?: string;
}

export interface Amendment {
  number: string;
  date: string;
  description: string;
  responsible: {
    person: string;
    office: string;
  };
}

export interface BirthCertificate {
  registryOffice: RegistryOffice;
  registrant: Registrant;
  father: Person;
  mother: Person;
  paternalGrandparents: string;
  maternalGrandparents: string;
  declarant: string;
  specialMentions: string;
  witnesses: string;
  birthRecordDate: Date<MonthFr | MonthPt>;
  officer: Officer;
  processNumber: string;
  amendments: Amendment[];
}
