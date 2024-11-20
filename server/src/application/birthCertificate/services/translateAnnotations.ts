import { Amendment } from "../../../domain/birthCertificate/interfaces/BirthCertificate";
import chatCompletionService from "../../../infrastructure/chatCompletionService";
import promptConstructor from "../../../infrastructure/promptConstructor";
import { IChatCompletionService, IPromptConstructor } from "./translateService";

export interface ITranslateService {
  translateAnnotationLlm(
    text: string,
    annotationsMap: Record<string, string>,
    idx: number,
    { getChatCompletion }: IChatCompletionService,
    { createTranslateSegmentPrompt }: IPromptConstructor
  ): Promise<string>;
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

export async function translateAnnotations(
  annotations: string[],
  annotationsMap: Record<string, string>,
  createAnnotations: CreateAnnotations,
  { translateAnnotationLlm }: ITranslateService
) {
  const results: Amendment[] = [];

  for (let idx = 0; idx < annotations.length; idx++) {
    const text = annotations[idx];

    if (text.includes("Averbamento")) {
      const {
        description: [, number, date],
        responsible,
      } = createAnnotations(annotations, idx);

      const result = await translateAnnotationLlm(
        annotations[idx + 1],
        annotationsMap,
        idx,
        chatCompletionService,
        promptConstructor
      );

      results[parseInt(number) - 1] = {
        number,
        description: result || "",
        date,
        responsible,
      };
    }
  }

  return results;
}
