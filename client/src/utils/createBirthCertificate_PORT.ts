import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";
import { birthCertificateResult } from "./extractInfo";

interface DocGeneratorOptions {
  title?: string;
  sourceLang?: string;
  targetLang?: string;
  fontSize?: number;
  spacing?: number;
}

export async function createBirthCertificate_PORT(
  docData: birthCertificateResult,
  options: DocGeneratorOptions = {}
) {
  const {
    title = "Traduction_Acte_de_naissance_PORT",
    targetLang = "French",
    fontSize = 24, // 12pt
    spacing = 360, // 1.5 line spacing
  } = options;
  const { child, father, mother } = docData;

  const childInfo = [
    new Paragraph({
      spacing: {
        before: 240, // 12pt
        after: 240,
        line: spacing,
      },
      children: [
        new TextRun(`Acte de Naissance`),
        new TextRun(`\nPrénom : ${child.firstName || ""}`),
        new TextRun(`\nNom de famille : ${child.lastName || ""}`),
        new TextRun(`\nSexe : ${child.sex || ""}`),
        new TextRun(`\nDate de Naissance : ${child.birthDate || ""}`),
        new TextRun(
          `\nOriginaire : ${child.birthPlace?.village || ""}, ${
            child.birthPlace?.commune || ""
          }`
        ),
      ],
    }),
  ];

  const fatherInfo = [
    new Paragraph({
      spacing: {
        before: 240, // 12pt
        after: 240,
        line: spacing,
      },
      children: [
        new TextRun(`Père`),
        new TextRun(`\nNom : ${father.name || ""}`),
        new TextRun(`\nÂge : ${father.age || ""}`),
        new TextRun(`\nÉtat matrimonial : ${father.maritalStatus || ""}`),
        new TextRun(
          `\nDomicile : ${father.domicile?.lugar || ""}, ${
            father.domicile?.village || ""
          }, ${father.domicile?.commune || ""}`
        ),
      ],
    }),
  ];

  const motherInfo = [
    new Paragraph({
      spacing: {
        before: 240, // 12pt
        after: 240,
        line: spacing,
      },
      children: [
        new TextRun(`Mère`),
        new TextRun(`\nNom : ${mother.name || ""}`),
        new TextRun(`\nÂge : ${mother.age || ""}`),
        new TextRun(`\nÉtat matrimonial : ${mother.maritalStatus || ""}`),
        new TextRun(
          `\nDomicile : ${mother.domicile?.lugar || ""}, ${
            mother.domicile?.village || ""
          }, ${mother.domicile?.commune || ""}`
        ),
      ],
    }),
  ];

  // Create the document
  const doc = new Document({
    title,
    creator: "Translation Service",
    description: `Translation to ${targetLang}`,
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: fontSize,
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [...childInfo, ...fatherInfo, ...motherInfo],
      },
    ],
  });

  // Generate and save the document
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${title}.docx`);
}
