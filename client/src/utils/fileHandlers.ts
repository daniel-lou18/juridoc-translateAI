import { ChangeEvent, Dispatch } from "react";
import { htmlElementToString, parseMhtmlContent } from "./parsers";
import { HtmlContent } from "@/types/BirthCertificate_POR";

function createFile(e: ChangeEvent<HTMLInputElement>) {
  return e.target.files?.[0];
}

export function createImageUrl(
  e: ChangeEvent<HTMLInputElement>,
  setImage: Dispatch<string>
) {
  const file = createFile(e);
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);
  setImage(imageUrl);

  return imageUrl;
}

export function createDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) reject(new Error("No file"));

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target) {
        const imageUrl = e.target.result as string;
        resolve(imageUrl);
      }
    };

    reader.onerror = () => reject(new Error("Could not read file"));

    reader.readAsDataURL(file);
  });
}

export async function createBase64String(file: File): Promise<string> {
  try {
    const dataUrl = await createDataUrl(file);

    if (!dataUrl) {
      throw new Error("Error while creating dataUrl");
    }

    return dataUrl.replace("data:application/pdf;base64,", "");
  } catch (error) {
    console.log(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unknown error occurred while creating base64 string"
    );
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function extractHtml(file: File): Promise<{
  htmlContent: HtmlContent;
  htmlString: string;
}> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No .mhtml file provided"));
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const mhtmlContent = e.target?.result;
      if (mhtmlContent) {
        const [certificate, annotations] = parseMhtmlContent(
          mhtmlContent as string
        );
        const htmlString = htmlElementToString(certificate);
        resolve({
          htmlContent: [certificate, annotations],
          htmlString: htmlString as string,
        });
      }
    };

    reader.onerror = () => reject(new Error("Could not read .mhtml file"));

    reader.readAsText(file);
  });
}

export function createUrlFromHtmlString(htmlString: string) {
  const blob = new Blob([htmlString], { type: "text/html" });
  return URL.createObjectURL(blob);
}
