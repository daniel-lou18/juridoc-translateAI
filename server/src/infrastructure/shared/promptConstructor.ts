export function createTranslatePrompt(
  sourceText: string,
  targetTemplate: string,
  sourceLang: string,
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

export function createExtractPrompt(
  text: string,
  birthDocTemplate: string,
  birthTemplate: string
) {
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

  Use the Completed Output Template Example format for extracting information from the following document. Please provide the output in the exact same JSON structure, replacing dynamic values with the new information. Always mark the beginning with "### START JSON ###" and the end with "### END JSON ###". This is the document to be analyzed:

  ${text}
  `;
}

export function createExtractPromptSystem(
  birthDocTemplate: string,
  birthTemplate: object
) {
  return `
  You are an AI assistant tasked with extracting information from Portuguese birth certificates.
  Follow these rules:
  - Parse the document carefully and extract key details.
  - Do not include any extra text or commentary in your response.

  - Original Document Example:
  ### START DOCUMENT ###
  ${birthDocTemplate}
  ### END DOCUMENT ###

  - Expected JSON Output:
  ${JSON.stringify(birthTemplate)}
  `;
}

export function createExtractPromptUser(text: string) {
  return `
  Here is the document to analyze:
  ### START DOCUMENT ###
  ${text}
  ### END DOCUMENT ###
  `;
}
