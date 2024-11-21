import chatCompletionService from "../../../infrastructure/chatCompletionService";
import promptConstructor from "../../../infrastructure/promptConstructor";
import { ITranslateService } from "./translateAnnotations";

export interface IChatCompletionService {
  getChatCompletion(prompt: string): Promise<string>;
}
export interface IPromptConstructor {
  createTranslateSegmentPrompt(
    sourceText: string,
    sourceLang: string,
    targetTemplate: string,
    targetLang: string,
    docType?: string
  ): string;
}

class TranslateService implements ITranslateService {
  constructor(
    private chatCompletionService: IChatCompletionService,
    private promptConstructor: IPromptConstructor
  ) {}

  async translateAnnotationLlm(
    text: string,
    annotationsMap: Record<string, string>,
    idx: number
  ) {
    for (const key of Object.keys(annotationsMap)) {
      if (text.includes(key)) {
        try {
          const result = await this.chatCompletionService.getChatCompletion(
            this.promptConstructor.createTranslateSegmentPrompt(
              text,
              "Portuguese",
              annotationsMap[key as keyof typeof annotationsMap],
              "French"
            )
          );

          const parsedResult =
            result.match(
              /### START ANSWER ###\n([\s\S]*?)\n### END ANSWER ###/
            )?.[1] ||
            result ||
            "";

          return parsedResult.trim();
        } catch (error) {
          console.log(`Error translating annotation at index ${idx}:`, error);
          return text;
        }
      }
    }
    return text;
  }
}

export default new TranslateService(chatCompletionService, promptConstructor);
