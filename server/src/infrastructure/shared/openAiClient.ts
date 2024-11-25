import { AutoParseableResponseFormat } from "openai/lib/parser";
import { birthTemplateSchema } from "../birthCertificate/image/birthValidate";
import httpClient, { IHttpClient } from "./httpClient";
import { OpenAiChatCompletionResponse } from "./types";
import { zodResponseFormat } from "openai/helpers/zod";

export interface ILlmClient {
  getChatCompletion(messages: OpenAiMessages): Promise<string[]>;
}

export type OpenAiMessages = { role: string; content: string }[];

type OpenAiChatConfig = {
  headers: {
    "Content-Type": "application/json";
    Authorization: string;
  };
  body: {
    model: string;
    messages: OpenAiMessages;
    temperature: number;
    response_format?: ReturnType<typeof zodResponseFormat>;
  };
};

const API_KEY = process.env.OPENAI_API_KEY;
const API_URL = process.env.OPENAI_API_URL;

if (!API_KEY || !API_URL) {
  throw new Error("Missing OPENAI environment variables");
}

class OpenAiClient implements ILlmClient {
  private readonly url = API_URL!;
  private readonly config: OpenAiChatConfig;

  constructor(
    apiKey: string,
    private httpClient: IHttpClient,
    defaultConfig?: Partial<OpenAiChatConfig["body"]>
  ) {
    this.config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: {
        model: defaultConfig?.model || "gpt-4o-mini",
        messages: defaultConfig?.messages || [],
        temperature: defaultConfig?.temperature || 0.7,
      },
    };
  }

  async getChatCompletion(messages: OpenAiMessages): Promise<string[]> {
    try {
      const result = await this.httpClient.post<OpenAiChatCompletionResponse>(
        this.url,
        {
          headers: this.config.headers,
          body: JSON.stringify({
            ...this.config.body,
            messages: [...this.config.body.messages, ...messages],
          }),
        }
      );

      if (!result) {
        throw new Error("Could not get chat completion");
      }
      console.log(result);
      return result.choices.map((choice) => choice.message.content);
    } catch (error) {
      console.error("Error during chat completion:", error);
      throw new Error(
        `Chat completion failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

export default new OpenAiClient(API_KEY, httpClient, {
  response_format: zodResponseFormat(birthTemplateSchema, "birth-certificate"),
});
