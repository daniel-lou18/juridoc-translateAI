import {
  birthDocTemplate,
  birthTemplate,
} from "../../../infrastructure/birthCertificate/image/birthTemplates";
import { extractJsonFromText } from "../../../infrastructure/birthCertificate/image/extractJsonFromText";
import { extractTextFromImage } from "../../../infrastructure/birthCertificate/image/extractTextFromImage";

export async function extractFieldsAi() {
  const extractedTextOcr = await extractTextFromImage();
  const extractedTextAi = await extractJsonFromText({
    text: extractedTextOcr,
    docTemplate: birthDocTemplate,
    outputTemplate: birthTemplate,
  });
}
