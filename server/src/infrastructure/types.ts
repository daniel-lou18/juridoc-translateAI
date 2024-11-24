export type OpenAiChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    completion_tokens_details: {
      reasoning_tokens: number;
      accepted_prediction_tokens: number;
      rejected_prediction_tokens: number;
    };
  };
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    logprobs: null | Record<string, unknown>;
    finish_reason: string;
    index: number;
  }>;
};
