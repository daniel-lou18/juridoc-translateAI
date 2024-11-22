import { HfInference } from "@huggingface/inference";

const API_KEY = import.meta.env.VITE_HF_API_KEY;

const inference = new HfInference(API_KEY);

export type SuccessResponse = string;

export async function getChatCompletion(
  prompt: string
): Promise<SuccessResponse> {
  try {
    let text = "";

    for await (const chunk of inference.chatCompletionStream({
      model: "meta-llama/Meta-Llama-3-8B-Instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 5000,
      temperature: 0.7,
      top_p: 0.95,
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
