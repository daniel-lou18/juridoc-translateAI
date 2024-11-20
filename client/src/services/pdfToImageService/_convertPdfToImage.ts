import { PDF_CONVERT_TO_IMAGE_PATH } from "@/utils/constants";
import { requestApi } from "../requestApi";

const API_URL = import.meta.env.VITE_AWS_API_URL;
const RESOURCE_PATH = PDF_CONVERT_TO_IMAGE_PATH;

type SuccessResponse = { image: string };

export async function convertPdfToImage(base64String: string): Promise<string> {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pdfBase64: base64String }),
  };

  try {
    const { image } = await requestApi<SuccessResponse>(
      `${API_URL}/${RESOURCE_PATH}`,
      options
    );

    return image;
  } catch (error) {
    console.log(error);

    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Unknown error occurred while converting PDF to image";
    }

    throw new Error(message);
  }
}
