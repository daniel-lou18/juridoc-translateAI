import { Request, Response, NextFunction } from "express";
import { generateBirthCertificate } from "../../application/birthCertificate/useCases/translateBirthCertificate";
import { deserializeHtml } from "../../application/shared/deserializeHtml";

export async function createBirthCertificate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { content } = req.body;

    if (!content || (Array.isArray(content) && content.length === 0)) {
      throw new Error("No content received");
    }

    const htmlContent = deserializeHtml(content);

    if (
      !htmlContent ||
      (Array.isArray(htmlContent) &&
        htmlContent.some((element) => element === null))
    ) {
      throw new Error("Could not deserialize content");
    }

    const data = await generateBirthCertificate(
      htmlContent as Element | [Element, Element]
    );
    res.status(201).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
}
