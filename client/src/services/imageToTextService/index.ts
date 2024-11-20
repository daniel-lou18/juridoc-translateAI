import { requestApi } from "../requestApi";
import { OcrResult, extractTextFromOcrResult } from "./transformDto";

const BASE_URL = import.meta.env.VITE_OCR_API_URL;
const API_KEY = import.meta.env.VITE_OCR_API_KEY;

export async function imageToText(
  imageUrl: string
): Promise<ReturnType<typeof extractTextFromOcrResult>> {
  const formData = new FormData();
  formData.append("language", "por");
  formData.append("isOverlayRequired", "false");
  formData.append("base64Image", imageUrl);
  formData.append("iscreatesearchablepdf", "false");
  formData.append("issearchablepdfhidetextlayer", "false");

  const options = {
    method: "POST",
    headers: {
      apiKey: API_KEY,
    },
    body: formData,
  };

  try {
    const data = await requestApi<OcrResult>(`${BASE_URL}`, options);
    console.log(data);
    return extractTextFromOcrResult(data);
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
