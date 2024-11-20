import { copyToClipboard } from "@/utils/fileHandlers";
import { Button } from "../../button";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type CopyToClipboardProps = {
  text: string;
};

export default function CopyToClipboard({ text }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  async function handleClick() {
    const success = await copyToClipboard(text);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (success) {
      setCopied(true);
      timerRef.current = setTimeout(() => {
        setCopied(false);
        timerRef.current = null;
      }, 3000);
    }
  }

  return (
    <Button
      variant="ghost"
      className="h-8 w-8 text-sm text-muted-foreground hover:text-foreground hover:bg-stone-200"
      onClick={handleClick}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </Button>
  );
}
