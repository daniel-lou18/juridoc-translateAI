import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getChatCompletion } from "@/services/getChatCompletion";
import { parseLLMResponse } from "@/utils/parsers";
import { createExtractPrompt } from "@/utils/prompts";
import {
  convertBirthCertificateToState,
  StateObject,
} from "@/utils/translation";
import { translateKeys } from "@/schemas/birthTemplates";
import { validateResponse } from "@/schemas/validateResponse";
import { birthTemplateSchema } from "@/schemas/birthValidate";

export function useExtract(transcription: string) {
  const [parsedObject, setParsedObject] = useState<StateObject | null>(null);
  const { mutate, isPending, error } = useMutation({
    mutationFn: getTranslationText,
    mutationKey: ["extraction"],
    onSuccess: (data) => setParsedObject(data),
  });

  async function getTranslationText(transcription: string) {
    try {
      const text = await getChatCompletion(createExtractPrompt(transcription));
      const parsedObject = parseLLMResponse(text);

      const {
        success,
        data: validatedResponse,
        error: zodError,
      } = validateResponse(parsedObject, birthTemplateSchema);

      if (!success) {
        throw new Error(zodError.message);
      }
      console.log(validatedResponse);

      const translatedObject = translateKeys(validatedResponse);
      const translatedState = convertBirthCertificateToState(translatedObject);
      return translatedState;
    } catch (err) {
      console.log(err);

      const message =
        err instanceof Error ? err.message : "Unknown error while uploading";

      throw new Error(message);
    }
  }

  useEffect(() => {
    if (!transcription) {
      return;
    }

    mutate(transcription);
  }, [transcription, mutate]);

  return { parsedObject, isPending, error };
}
