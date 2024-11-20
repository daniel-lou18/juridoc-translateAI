import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { createImageUrl } from "../utils/fileHandlers";

export function useWorker() {
  const worker = useRef<Worker | null>(null);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL("../worker.js", import.meta.url), {
        type: "module",
      });
    }

    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case "initiate":
          setStatus("initiate");
          break;
        case "ready":
          setStatus("ready");
          break;
        case "complete":
          setResult(e.data.output[0].generated_text);
          setStatus("complete");
          break;
        case "error":
          setError(e.data.message);
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current?.removeEventListener("message", onMessageReceived);
  });

  const getTextFromImage = useCallback((image: string) => {
    if (worker.current) {
      worker.current.postMessage({ image });
    }
  }, []);

  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const imageUrl = createImageUrl(e, setImage);
    if (!imageUrl) return;

    getTextFromImage(imageUrl);
  }

  return { image, status, result, error, handleUpload };
}
