import { useEffect, useState } from "react";
import { parseTranscribedPages, parseTranslatedPages } from "../utils/parsers";
import { translatePages } from "@/services/translateService/translatePages";
import { useMutation } from "@tanstack/react-query";

export function useTranslate(transcription: string[]) {
  const [translationArray, setTranslationArray] = useState<string[]>([]);
  const { mutate, isPending, error } = useMutation({
    mutationFn: getTranslationText,
    mutationKey: ["translation"],
    onSuccess: (data) => setTranslationArray(data),
  });

  async function getTranslationText(
    transcriptionArray: string[]
  ): Promise<string[]> {
    try {
      const transcribedPages = parseTranscribedPages(transcriptionArray);
      const translationArray = await translatePages(transcribedPages);

      return parseTranslatedPages(translationArray);
    } catch (err) {
      console.log(err);

      const message =
        err instanceof Error ? err.message : "Unknown error while uploading";

      throw new Error(message);
    }
  }

  useEffect(() => {
    if (!transcription?.length) {
      return;
    }

    mutate(transcription);
  }, [transcription, mutate]);

  return { translationArray, isPending, error };
}
