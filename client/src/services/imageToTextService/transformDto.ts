export type OcrResult = {
  ParsedResults: { ParsedText: string; FileParseExitCode: number }[];
  OCRExitCode: number;
  IsErroredOnProcessing: boolean;
};

export function extractTextFromOcrResult(result: OcrResult) {
  if (!result.ParsedResults?.length) {
    throw new Error("Error while processing file");
  }
  return result.ParsedResults.map((parsedResult) => parsedResult.ParsedText);
}
