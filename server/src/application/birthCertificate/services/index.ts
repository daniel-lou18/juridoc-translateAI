import { annotationsMapPtFr } from "../../../domain/birthCertificate/interfaces/annotationsMap_PT-FR";
import { BirthCertificate } from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import { getAnnotationsFromRows } from "../../getAnnotationsFromRows";
import { getFieldsFromRows } from "../../getFieldsFromRows";
import { getRows } from "../../getRows";
import { createAnnotations } from "./createAnnotations";
import { createCertificateFields } from "./createCertificateFields";
import { extractAnnotations } from "./extractAnnotations";
import { extractCertificateFields } from "./extractCertificateFields";
import translateAnnotationsService from "./translateAnnotationsService";

export type HtmlContent = [Element, Element] | Element;

export async function generateBirthCertificate(
  htmlContent: HtmlContent
): Promise<BirthCertificate> {
  const [certificateHtml, annotationsHtml] = Array.isArray(htmlContent)
    ? htmlContent
    : [htmlContent, null];

  const certificateFields = extractCertificateFields(
    certificateHtml,
    getRows,
    getFieldsFromRows
  );
  const birthCertificateFields = createCertificateFields(certificateFields);

  if (!annotationsHtml) {
    return {
      ...birthCertificateFields,
      amendments: [],
    };
  }

  const certificateAnnotations = extractAnnotations(
    annotationsHtml,
    getRows,
    getAnnotationsFromRows
  );
  const birthCertificateAnnotations =
    await translateAnnotationsService.translateAnnotations(
      certificateAnnotations,
      annotationsMapPtFr,
      createAnnotations
    );

  return {
    ...birthCertificateFields,
    amendments: birthCertificateAnnotations,
  };
}
