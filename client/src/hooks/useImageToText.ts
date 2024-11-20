import { createDataUrl } from "../utils/fileHandlers";
import { imageToText } from "../services/imageToTextService/index";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function useImageToText() {
  const [transcriptionArray, setTranscriptionArray] = useState<string[]>([]);
  const { mutate, isPending, error } = useMutation({
    mutationFn: handleUpload,
    mutationKey: ["transcription"],
    onSuccess: (data) => setTranscriptionArray(data),
  });

  async function handleUpload(file: File) {
    try {
      const imageUrl = await createDataUrl(file);

      if (!imageUrl) {
        throw new Error("Failed to create imageUrl");
      }

      const textArray = await imageToText(imageUrl);
      if (!textArray?.length) {
        throw new Error("Could not extract text from image");
      }

      return textArray;
    } catch (err) {
      console.log(err);

      const message =
        err instanceof Error ? err.message : "Unknown error while uploading";

      throw new Error(message);
    }
  }

  return { transcriptionArray, mutate, isPending, error };
}
