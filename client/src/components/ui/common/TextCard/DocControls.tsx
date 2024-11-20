import { FileText } from "lucide-react";
import { Button } from "../../button";
import { createTranslationDoc } from "@/utils/createDocFile";

const documentOptions = {
  title: "Translated Document",
  targetLang: "fr-FR",
  fontSize: 24, // 12pt
  spacing: 360, // 1.5 line spacing
};

type DocControlsProps = {
  content: string[];
};

export default function DocControls({ content }: DocControlsProps) {
  async function handleClick() {
    await createTranslationDoc(content, documentOptions);
  }

  return (
    <Button
      variant="ghost"
      className="w-8 h-8 text-sm text-muted-foreground hover:text-foreground hover:bg-stone-200"
      onClick={handleClick}
    >
      <FileText className="w-4 h-4" />
    </Button>
  );
}
