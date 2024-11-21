import { IPromptConstructor } from "../application/birthCertificate/services/translateService";

class PromptConstructor implements IPromptConstructor {
  createTranslateSegmentPrompt(
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
}

export default new PromptConstructor();
