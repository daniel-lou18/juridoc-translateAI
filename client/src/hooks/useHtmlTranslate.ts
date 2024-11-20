import { fetchTranslation } from "@/services/translateService/fetchTranslation";
import { HtmlContent } from "@/types/BirthCertificate_POR";
import {
  convertBirthCertificateToState,
  StateObject,
} from "@/utils/translation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function useHtmlTranslate() {
  const [translation, setTranslation] = useState<StateObject | null>(null);
  const { mutate, isPending, error } = useMutation({
    mutationFn: translate,
    mutationKey: ["translate-html"],
    onSuccess: (data) => setTranslation(data),
  });

  async function translate(htmlContent: HtmlContent | null) {
    try {
      if (!htmlContent) {
        throw new Error("No html document provided");
      }

      // const translationObject = await createTranslationObject(htmlContent);
      const translationObject = await fetchTranslation(htmlContent);
      const translationState =
        convertBirthCertificateToState(translationObject);

      return translationState;
    } catch (error) {
      console.log(error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Unknown error occurred while translating html"
      );
    }
  }

  return { translation, mutate, isPending, error };
}
