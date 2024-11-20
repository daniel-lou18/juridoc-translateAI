import { birthDocTemplate, birthTemplate } from "@/schemas/birthTemplates";

export function createTranslatePrompt(
  sourceText: string,
  targetLang: string,
  pageNumber: number,
  totalPages: number,
  previousContext: string,
  docType = "legal document"
) {
  return `
    You are translating page ${pageNumber} of ${totalPages} of a ${docType} from the detected source language to ${targetLang}.${
    previousContext ? `\nPrevious context: ${previousContext}` : ""
  }

    PAGE MARKER RULES:
    1. Each page must start with [PAGE N] and end with [END PAGE N]
    2. The N in both markers must match the page number exactly
    3. You must preserve these markers exactly as they appear in the source
    4. Your translation must appear between these markers
    5. Do not add any content outside these markers
    6. Example format:
       [PAGE 1]
       Your translation here...
       [END PAGE 1]

    TRANSLATION REQUIREMENTS:
    1. Maintain formal tone and specialized terminology
    2. Preserve original meaning and structure
    3. Ensure natural flow in ${targetLang}
    4. Preserve all line breaks and spacing
    7. Maintain consistency with previous pages' terminology
    5. Do not add any explanatory notes or comments
    6. Do not summarize or modify the content

    SOURCE TEXT TO TRANSLATE:
    ${sourceText}

    Remember: Every page must have both opening [PAGE N] and closing [END PAGE N] markers with matching numbers.`;
}

export function createExtractPrompt(text: string) {
  return `
  Please extract key information from similar Portuguese birth certificate documents and return it as a structured JSON output. Here is an example of an original document along with the expected JSON output.

  Original Document Example:

  ### START DOCUMENT ###

  ${birthDocTemplate}

  ### END DOCUMENT ###

  Completed Output Template Example:

  ### START JSON ###
  ${JSON.stringify(birthTemplate)}
  ### END JSON ###

  Use the Completed Output Template Example format for extracting information from the following document. Please provide the output in the exact same JSON structure, replacing dynamic values with the new information. Always mark the beginning with "### START JSON ###" and the end with "### END JSON ###":

  ${text}
  `;
}

export function createTranslateSegmentPrompt(
  sourceText: string,
  sourceLang: string,
  targetTemplate: string,
  targetLang: string,
  docType = "birth certificate"
) {
  return `
    Please translate the following text from ${sourceLang} to ${targetLang}. The text fragment is taken from a ${docType}. The translation should respect the provided template. Treat every translation as a separate one.

    Original text in ${sourceLang}:
    ${sourceText}

    Closely follow the style, wording and formatting of the following translation template in ${targetLang}:
    ${targetTemplate}

    Your answer should always begin with "### START ANSWER ###" and end with "### END ANSWER ###"
    `;
}
