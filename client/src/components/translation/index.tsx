import { TextComponentProps } from "../transcription/TranscriptionCards";
import TranslationCards from "./TranslationCards";

export default function Translation({ textArray }: TextComponentProps) {
  return <TranslationCards textArray={textArray} />;
}
