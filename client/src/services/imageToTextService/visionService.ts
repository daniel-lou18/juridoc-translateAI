import { HfInference } from "@huggingface/inference";

const API_KEY = import.meta.env.VITE_HF_API_KEY;

const inference = new HfInference(API_KEY);

export type SuccessResponse = { text: string };

export async function imageToText(imageUrl: string): Promise<SuccessResponse> {
  try {
    let text = "";

    for await (const chunk of inference.chatCompletionStream({
      model: "meta-llama/Llama-3.2-11B-Vision-Instruct",
      messages: [
        {
          role: "user",
          content: [
            { type: "image_url", image_url: { url: imageUrl } },
            {
              type: "text",
              text: "Please parse all the text from this document, which is written in Portuguese. Do not modify or alter or analyse, just extract the text.",
            },
          ],
        },
      ],
      max_tokens: 1024,
    })) {
      text += chunk.choices[0]?.delta?.content || "";
    }

    return { text };
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
