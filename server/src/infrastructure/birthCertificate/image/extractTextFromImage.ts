import path from "path";
import { createWorker } from "tesseract.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testPath = path.join(__dirname, "acte_PORT.jpg");

export async function extractTextFromImage(filepath: string = testPath) {
  const worker = await createWorker("por");
  const {
    data: { text },
  } = await worker.recognize(filepath);
  await worker.terminate();
  return text;
}
