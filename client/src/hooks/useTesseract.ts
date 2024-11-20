import { createDataUrl } from "@/utils/fileHandlers";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createWorker } from "tesseract.js";

async function imageToText(imageUrl: string) {
  const worker = await createWorker("por");

  const {
    data: { text },
  } = await worker.recognize(imageUrl);

  await worker.terminate();
  return text;
}

export function useTesseract() {
  const [transcription, setTranscription] = useState<string>("");
  const { mutate, isPending, error } = useMutation({
    mutationFn: handleUpload,
    mutationKey: ["transcription"],
    onSuccess: (data) => setTranscription(data),
  });

  async function handleUpload(file: File) {
    try {
      const imageUrl = await createDataUrl(file);

      if (!imageUrl) {
        throw new Error("Failed to create imageUrl");
      }

      const text = await imageToText(imageUrl);

      if (!text) {
        throw new Error("Could not extract text from image");
      }

      return text;
    } catch (err) {
      console.log(err);

      const message =
        err instanceof Error ? err.message : "Unknown error while uploading";

      throw new Error(message);
    }
  }

  return { transcription, mutate, isPending, error };
}
