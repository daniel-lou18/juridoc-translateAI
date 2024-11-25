import llmService from "../../../infrastructure/LlmService";
import promptConstructor from "../../shared/promptConstructor";
import { ITranslateService } from "./translateAnnotationsService";

export interface ILlmService {
  getChatCompletion(prompt: string): Promise<string>;
}
export interface IPromptConstructor {
  createTranslateSegmentPrompt(
    sourceText: string,
    targetTemplate: string,
    sourceLang: string,
    targetLang: string,
    docType?: string
  ): string;
}

class TranslateService implements ITranslateService {
  constructor(
    private chatCompletionService: ILlmService,
    private promptConstructor: IPromptConstructor
  ) {}

  async translateAnnotationLlm(text: string, template: string) {
    try {
      const result = await this.chatCompletionService.getChatCompletion(
        this.promptConstructor.createTranslateSegmentPrompt(
          text,
          template,
          "Portuguese",
          "French"
        )
      );

      return this.parseResult(result);
    } catch (error) {
      console.log(`Error translating text: "${text}"`, error);
      return text;
    }
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

export default new TranslateService(llmService, promptConstructor);
