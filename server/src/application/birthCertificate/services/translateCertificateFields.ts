import {
  BirthCertificate,
  StringOrNullify,
} from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import {
  genderMapPtFr,
  maritalStatusMapPtFr,
  monthMapPtFr,
  officerPositionMapPtFr,
  officerQualificationMapPtFr,
} from "../../../domain/birthCertificate/interfaces/birthCertificateMap_PT-FR";
import {
  GenderPt,
  MaritalStatusPt,
  MonthPt,
  OfficerPositionPt,
  OfficerQualification,
} from "../../../domain/birthCertificate/interfaces/BirthCertificatePT";

export function translateCertificateFields(
  parsedCertificateFields: StringOrNullify<Omit<BirthCertificate, "amendments">>
) {
  const registrantMonth =
    parsedCertificateFields.registrant.birthTimeAndDate.month;
  const recordMonth = parsedCertificateFields.birthRecordDate.month;
  const fatherStatus = parsedCertificateFields.father.status;
  const motherStatus = parsedCertificateFields.mother.status;
  const gender = parsedCertificateFields.registrant.gender;
  const officerQualifiation = parsedCertificateFields.officer.qualification;
  const officerPosition = parsedCertificateFields.officer.position;

  parsedCertificateFields.registrant.birthTimeAndDate.month = registrantMonth
    ? monthMapPtFr[registrantMonth as MonthPt]
    : null;

  parsedCertificateFields.birthRecordDate.month = recordMonth
    ? monthMapPtFr[recordMonth as MonthPt]
    : null;

  parsedCertificateFields.father.status = fatherStatus
    ? maritalStatusMapPtFr[fatherStatus as MaritalStatusPt]
    : null;
  parsedCertificateFields.mother.status = motherStatus
    ? maritalStatusMapPtFr[motherStatus as MaritalStatusPt]
    : null;

  parsedCertificateFields.registrant.gender = gender
    ? genderMapPtFr[gender as GenderPt]
    : null;

  parsedCertificateFields.officer.position = officerPosition
    ? officerPositionMapPtFr[officerPosition as OfficerPositionPt]
    : null;

  parsedCertificateFields.officer.qualification = officerQualifiation
    ? officerQualificationMapPtFr[officerQualifiation as OfficerQualification]
    : null;

  return parsedCertificateFields as BirthCertificate;
}
