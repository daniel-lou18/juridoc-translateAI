import llmService from "../../../infrastructure/LlmService";
import { ITranslateService } from "./translateAnnotationsService";

export interface ILlmService {
  getChatCompletion(prompt: string): Promise<string>;
}

class TranslateService implements ITranslateService {
  constructor(private chatCompletionService: ILlmService) {}

  async translateAnnotationLlm(prompt: string) {
    try {
      const result = await this.chatCompletionService.getChatCompletion(prompt);

      return this.parseResult(result);
    } catch (error) {
      console.log(`Error translating text: "${prompt}"`, error);
      return prompt;
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

export default new TranslateService(llmService);
