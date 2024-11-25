import { NextFunction, Request, Response } from "express";
import openAiClient from "../../infrastructure/shared/openAiClient";
import { extractFieldsAi } from "../../application/birthCertificate/services/extractFieldsAi";

export async function generateChatCompletion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const { prompt } = req.body;
    // const result = await openAiClient.getChatCompletion(prompt);
    const result = await extractFieldsAi();
    res.status(201).json({ status: "success", result });
  } catch (error) {
    next(error);
  }
}
