import { HtmlContent } from "@/types/BirthCertificate_POR";
import { EnglishBirthCertificate } from "@/utils/translation";
import { requestApi } from "../requestApi";

const url = "http://localhost:4000/api/certificates";

export async function fetchTranslation(
  htmlContent: HtmlContent
): Promise<EnglishBirthCertificate> {
  const serializedHtmlContent = htmlContent.map((element) => element.outerHTML);

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: serializedHtmlContent,
    }),
  };

  try {
    const result = await requestApi<{
      status: string;
      data: EnglishBirthCertificate;
    }>(url, options);
    console.log(result);
    return result.data;
  } catch (error: unknown) {
    console.error(error);

    let message: string;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = "Unknown error";
    }

    throw new Error(message);
  }
}
