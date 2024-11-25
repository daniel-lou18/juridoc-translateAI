import { Amendment } from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import llmService from "../../../infrastructure/shared/LlmService";
import { createTranslatePrompt } from "../../shared/promptConstructor";

export interface ILlmService {
  getChatCompletion(prompt: string): Promise<string>;
}
type CreateAnnotations = (
  annotations: string[],
  idx: number
) => {
  description: RegExpMatchArray;
  responsible: {
    person: string;
    office: string;
  };
};

class TranslateAnnotationsService {
  constructor(private translateService: ILlmService) {}

  async translateAnnotations(
    annotations: string[],
    annotationsMap: Record<string, string>,
    createAnnotations: CreateAnnotations
  ) {
    const results: Amendment[] = [];

    for (let idx = 0; idx < annotations.length; idx++) {
      const text = annotations[idx];

      if (text.includes("Averbamento")) {
        const {
          description: [, number, date],
          responsible,
        } = createAnnotations(annotations, idx);

        const nextLine = annotations[idx + 1];
        const annotationsTemplate = this.getTemplate(nextLine, annotationsMap);

        const result = await this.getTranslation(nextLine, annotationsTemplate);

        results[parseInt(number) - 1] = {
          number,
          description: result,
          date,
          responsible,
        };
      }
    }
    return results;
  }

  private async getTranslation(nextLine: string, annotationsTemplate: string) {
    if (!annotationsTemplate) return nextLine;

    try {
      const prompt = createTranslatePrompt(
        nextLine,
        annotationsTemplate,
        "Portuguese",
        "French"
      );
      const chatResult = await this.translateService.getChatCompletion(prompt);

      if (!chatResult) return nextLine;

      const parsedResult = this.parseResult(chatResult);
      if (!parsedResult) return nextLine;

      return parsedResult;
    } catch (error) {
      console.error("Error in getTranslation method:", error);
      return nextLine;
    }
  }

  private getTemplate(textSegment: string, dictionary: Record<string, string>) {
    const annotationsTemplate = Object.entries(dictionary).filter(([key]) =>
      textSegment.includes(key)
    )?.[0]?.[1];

    return annotationsTemplate;
  }

  private parseResult(result: string) {
    const parsedResult =
      result.match(
        /### START ANSWER ###\n([\s\S]*?)\n### END ANSWER ###/
      )?.[1] ||
      result ||
      "";

    return parsedResult.trim();
  }
}

export default new TranslateAnnotationsService(llmService);
