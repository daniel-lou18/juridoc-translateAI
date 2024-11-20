import { requestApi } from "./requestApi";

const BASE_URL = import.meta.env.VITE_HF_API_URL;

export type ApiSuccessResponse = string;

export async function getTextResponse(
  prompt: string
): Promise<ApiSuccessResponse> {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: { max_new_tokens: 5000, return_full_text: false },
    }),
  };

  try {
    const response = await requestApi<[{ generated_text: string }]>(
      `${BASE_URL}/mistralai/Mistral-7B-v0.1`,
      options
    );
    console.log(response);
    return response[0].generated_text;
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
