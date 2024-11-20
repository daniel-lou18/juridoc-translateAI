import { BirthCertificatePages } from "@/hooks/useCertificate";
import {
  maritalStatusTranslations,
  monthsTranslations,
  officerTextTranslations,
  officerTitleTranslations,
} from "./extractInfo";

type StringOrEmptyString = string | "";

export interface RegistryOffice {
  municipality: StringOrEmptyString;
  birthRecordNumber: StringOrEmptyString;
  birthRecordYear: StringOrEmptyString;
}

interface Birthplace {
  parish: StringOrEmptyString;
  municipality: StringOrEmptyString;
}

interface UsualResidence {
  place: StringOrEmptyString;
  parish: StringOrEmptyString;
  municipality: StringOrEmptyString;
}

interface BirthTimeAndDate extends Date {
  hours: StringOrEmptyString;
  minutes: StringOrEmptyString;
}

interface Date {
  day: StringOrEmptyString;
  month: StringOrEmptyString;
  year: StringOrEmptyString;
}

interface Person {
  name: StringOrEmptyString;
  age: StringOrEmptyString;
  status: StringOrEmptyString;
  birthplace: Birthplace;
  usualResidence: UsualResidence;
}

interface Registrant {
  firstName: StringOrEmptyString;
  surname: StringOrEmptyString;
  gender: StringOrEmptyString;
  birthTimeAndDate: BirthTimeAndDate;
  birthplace: Birthplace;
}

export interface Officer {
  position: StringOrEmptyString;
  name: StringOrEmptyString;
  qualification?: StringOrEmptyString;
  office?: StringOrEmptyString;
}

export interface Amendment {
  number: StringOrEmptyString;
  date: StringOrEmptyString;
  description: StringOrEmptyString;
  responsible: {
    person: StringOrEmptyString;
    office: StringOrEmptyString;
  };
}

export interface EnglishBirthCertificate {
  registryOffice: RegistryOffice;
  registrant: Registrant;
  father: Person;
  mother: Person;
  paternalGrandparents: StringOrEmptyString;
  maternalGrandparents: StringOrEmptyString;
  declarant: StringOrEmptyString;
  specialMentions: StringOrEmptyString;
  witnesses: StringOrEmptyString;
  birthRecordDate: Date;
  officer: Officer;
  processNumber: StringOrEmptyString;
  amendments: Amendment[];
}

export type StateObject = {
  pageHeader: RegistryOffice;
  pages: BirthCertificatePages;
};

export function convertBirthCertificateToState(
  translation: object
): StateObject {
  const {
    registryOffice,
    registrant: {
      firstName,
      surname: surnames,
      gender,
      birthTimeAndDate: dateTimeOfBirth,
      birthplace,
    },
    father: {
      name: fatherName,
      age: fatherAge,
      status: fatherStatus,
      birthplace: fatherBirthplace,
      usualResidence: fatherResidence,
    },
    mother: {
      name: motherName,
      age: motherAge,
      status: motherStatus,
      birthplace: motherBirthplace,
      usualResidence: motherResidence,
    },
    paternalGrandparents,
    maternalGrandparents,
    declarant,
    specialMentions,
    witnesses,
    birthRecordDate: registrationDate,
    officer,
    processNumber,
    amendments,
  } = translation as EnglishBirthCertificate;

  const {
    hours,
    minutes,
    day: birthDay,
    month: birthMonth,
    year: birthYear,
  } = dateTimeOfBirth;
  const {
    day: registrationDay,
    month: registrationMonth,
    year: registrationYear,
  } = registrationDate;
  const {
    position: officerPosition,
    name: officerName,
    qualification: officerComment,
  } = officer;

  const pages: BirthCertificatePages = [
    [
      {
        title: "Le déclarant :",
        fields: [
          { label: "Prénom :", value: firstName, id: "first-name" },
          {
            label: "Nom de famille :",
            value: surnames,
            id: "surnames",
          },
          {
            label: "Sexe :",
            value:
              gender?.toLowerCase() === "masculino" ? "Masculin" : "Féminin",
            id: "gender",
          },
          {
            label: "Heure de naissance :",
            value: `${hours} heures et ${minutes} minutes, au jour du ${birthDay} ${
              monthsTranslations[
                birthMonth?.toLowerCase() as keyof typeof monthsTranslations
              ]
            } ${birthYear} `,
            id: "date-of-birth",
          },
          {
            label: "Originaire :",
            value: `village de ${birthplace.parish}, commune de ${birthplace.municipality}`,
            id: "birth-place",
          },
        ],
      },
      {
        title: "Père :",
        fields: [
          { label: "Nom :", value: fatherName, id: "father-name" },
          {
            label: "Age :",
            value: fatherAge ? `${fatherAge} ans` : "",
            id: "father-age",
          },
          {
            label: "Etat matrimonial :",
            value:
              maritalStatusTranslations[
                fatherStatus?.toLowerCase() as keyof typeof maritalStatusTranslations
              ],
            id: "father-status",
          },
          {
            label: "Originaire :",
            value: `village de ${fatherBirthplace.parish}, commune de ${fatherBirthplace.municipality}`,
            id: "father-birthplace",
          },
          {
            label: "Domicile :",
            value: `lugar de ${fatherResidence.place}, village de ${fatherResidence.parish}, commune de ${fatherResidence.municipality}`,
            id: "father-usual-residence",
          },
        ],
      },
      {
        title: "Mère :",
        fields: [
          { label: "Nom :", value: motherName, id: "mother-name" },
          {
            label: "Age :",
            value: motherAge ? `${motherAge} ans` : "",
            id: "mother-age",
          },
          {
            label: "Etat matrimonial :",
            value:
              maritalStatusTranslations[
                motherStatus?.toLowerCase() as keyof typeof maritalStatusTranslations
              ],
            id: "mother-status",
          },
          {
            label: "Originaire :",
            value: `village de ${motherBirthplace.parish}, commune de ${motherBirthplace.municipality}`,
            id: "mother-birthplace",
          },
          {
            label: "Domicile :",
            value: `lugar de ${motherResidence.place}, village de ${motherResidence.parish}, commune de ${motherResidence.municipality}`,
            id: "mother-usual-residence",
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            label: "Aïeuls paternels :",
            value: paternalGrandparents?.replace(" e ", " et ") || "",
            id: "paternal-grandparents",
          },
          {
            label: "Aïeuls maternels :",
            value: maternalGrandparents?.replace(" e ", " et ") || "",
            id: "maternal-grandparents",
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            label: "Déclarant(s) :",
            value: declarant,
            id: "declarants",
          },
          {
            label: "Mentions spéciales :",
            value: specialMentions,
            id: "special-mentions",
          },
          {
            label: "Témoin(s) :",
            value: witnesses,
            id: "witnesses",
          },
          {
            label: "Date d'enregistrement :",
            value: `le ${registrationDay} ${
              monthsTranslations[
                registrationMonth?.toLowerCase() as keyof typeof monthsTranslations
              ]
            } ${registrationYear}`,
            id: "registration-date",
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            label: "Officier d'état civil :",
            value: ` O/A ${
              officerTitleTranslations[
                officerPosition?.toLowerCase() as keyof typeof officerTitleTranslations
              ]
            }, ${officerName}, ${
              officerTextTranslations[
                officerComment
                  ?.toLowerCase()
                  .trim() as keyof typeof officerTextTranslations
              ]
            }`,
            id: "officer",
          },
          {
            label: "Processus n° :",
            value: processNumber,
            id: "process-number",
          },
        ],
      },
    ],
    [
      ...amendments.map((annotation) => ({
        ...annotation,
        date: `Mention n° ${annotation.number}, du ${annotation.date}`,
      })),
    ],
  ];

  return { pageHeader: registryOffice, pages };
}

// const templateAnnotations = [
//   {
//     title: "Mention n° 1",
//     fields: [
//       {
//         label: null,
//         value: `Mariage catholique avec Libório Rodrigues Cerqueira, le 29 mars 1967, au village d'Espinho,
// commune de Braga. Acte n°69/67 du Bureau de Monção. Le 31/3/67
// 2° Assistante, Maria Lurdes Simenta Valadas Mendes Rodrigues, Bureau du Registre Civil/des Biens/Commercial de Monção`,
//         id: "mention-1",
//       },
//     ],
//   },
//   {
//     title: "Mention n° 2",
//     fields: [
//       {
//         label: null,
//         value: `Modification du nom par Esperança Fernandes Alves Cerqueria, par effet du mariage qui se réfère à la mention n°1 Doc. N°22, mai 5-C.Année 2005. Le 2/3/05.
// 2° Assistante, Maria Lurdes Simenta Valadas Mendes Rodrigues, Bureau du Registre Civil/des Biens/Commercial de Monção`,
//         id: "mention-2",
//       },
//     ],
//   },
// ];
