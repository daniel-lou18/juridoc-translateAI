import { Globe, X } from "lucide-react";
import { isCorrectFileType } from "../../utils/helpers";
import Container from "../ui/common/Container";
import { Button } from "../ui/button";
import { ReactNode } from "react";

type FileActionsProps = {
  file: File | null;
  isLoading: boolean;
  icon: ReactNode;
  onClick: () => void;
  removeFile: () => void;
};

export default function ActionBar({
  file,
  isLoading,
  icon,
  onClick,
  removeFile,
}: FileActionsProps) {
  if (!file || !isCorrectFileType(file)) {
    return null;
  }

  return (
    <Container className="sticky bottom-0 left-0 flex items-center justify-between bg-stone-100 p-2">
      <Container className="flex items-center space-x-4">
        {icon}
        <span className="truncate max-w-xs font-medium">{file.name}</span>
      </Container>
      <Container className="flex items-center gap-4">
        <button
          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onClick={onClick}
        >
          <Globe
            className={`w-5 h-5 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Traduire
        </button>
        <Button
          variant="ghost"
          onClick={() => removeFile()}
          className="w-8 h-8 text-red-500 hover:text-red-700"
          aria-label={`Remove ${file.name}`}
        >
          <X className="w-5 h-5" />
        </Button>
      </Container>
    </Container>
  );
}
