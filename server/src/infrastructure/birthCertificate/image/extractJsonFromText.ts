import openAiClient, {
  ILlmClient,
  OpenAiMessages,
} from "../../shared/openAiClient";
import {
  createExtractPromptSystem,
  createExtractPromptUser,
} from "../../shared/promptConstructor";

export async function extractJsonFromText(
  data: { text: string; docTemplate: string; outputTemplate: object },
  llmClient: ILlmClient = openAiClient
): Promise<string[]> {
  const { text, docTemplate, outputTemplate } = data;

  try {
    const adminPrompt = createExtractPromptSystem(docTemplate, outputTemplate);
    const userPrompt = createExtractPromptUser(text);
    const messages: OpenAiMessages = [
      { role: "system", content: adminPrompt },
      { role: "user", content: userPrompt },
    ];

    const result = await llmClient.getChatCompletion(messages);

    if (!result || result.length === 0) throw new Error("No text extracted");
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error during text extraction:", error);
    throw new Error(
      `Text extraction failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
