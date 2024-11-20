import { createTranslatePrompt } from "@/utils/prompts";
import { getTranslation } from "./getTranslation";

export async function translatePages(
  transcribedPages: string[]
): Promise<string[]> {
  try {
    const translatedPages: string[] = [];
    let translatedContext = "";

    for (let i = 0; i < transcribedPages.length; i++) {
      const prompt = createTranslatePrompt(
        transcribedPages[i],
        "French",
        i + 1,
        transcribedPages.length,
        translatedContext
      );
      const translatedText = await getTranslation(prompt);
      translatedPages.push(translatedText);

      // Conserver les dernières phrases de chaque page traduite comme contexte pour la prochaine itération
      const sentences = translatedText.split(/[.!?]+/);
      translatedContext = sentences.slice(-2).join(". ");
    }

    return translatedPages;
  } catch (err) {
    console.log(err);
    throw new Error("Translation error");
  }
}
