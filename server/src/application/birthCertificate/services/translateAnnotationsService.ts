import { Amendment } from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import llmService from "../../../infrastructure/LlmService";
import { createTranslatePrompt } from "../../shared/promptConstructor";
import { ILlmService } from "./translateService";

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
        let result;

        if (annotationsTemplate) {
          const chatResult = await this.translateService.getChatCompletion(
            createTranslatePrompt(
              nextLine,
              annotationsTemplate,
              "Portuguese",
              "French"
            )
          );
          if (chatResult) {
            result = this.parseResult(chatResult);
          } else {
            result = null;
          }
        } else {
          result = nextLine;
        }

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
