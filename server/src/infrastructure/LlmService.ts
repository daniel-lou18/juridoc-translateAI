import { HfInference } from "@huggingface/inference";
import { ILlmService } from "../application/birthCertificate/services/translateService";

export type SuccessResponse = string;

const API_KEY = process.env.HF_API_KEY;

if (!API_KEY) {
  throw new Error("Missing HF_API_KEY environment variable");
}

type InferenceConfig = {
  model: string;
  role: "user" | "system";
  max_tokens: number;
  temperature: number;
  top_p: number;
};

class LlmService implements ILlmService {
  private inference: HfInference;
  private readonly config: InferenceConfig;

  constructor(apiKey: string, config?: InferenceConfig) {
    this.inference = new HfInference(apiKey);
    this.config = config || {
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      role: "user",
      max_tokens: 5000,
      temperature: 0.7,
      top_p: 0.95,
    };
  }

  async getChatCompletion(prompt: string): Promise<SuccessResponse> {
    const { model, role, max_tokens, temperature, top_p } = this.config;

    try {
      let text = "";

      for await (const chunk of this.inference.chatCompletionStream({
        model,
        messages: [
          {
            role,
            content: prompt,
          },
        ],
        max_tokens,
        temperature,
        top_p,
      })) {
        text += chunk.choices[0]?.delta?.content || "";
      }

      if (text.trim().length === 0) {
        throw new Error("No translation was generated");
      }

      return text;
    } catch (err: unknown) {
      console.error(err);

      let message: string;
      if (err instanceof Error) {
        message = err.message;
      } else {
        message = "Unknown error";
      }

      throw new Error(message);
    }
  }
}

export default new LlmService(API_KEY!);
