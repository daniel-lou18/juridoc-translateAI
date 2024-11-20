import { FileCode, FileText, Globe, ImageIcon, X } from "lucide-react";
import { isCorrectFileType } from "../../utils/helpers";
import Container from "../ui/common/Container";
import { Button } from "../ui/button";
import { UseMutateFunction } from "@tanstack/react-query";

function mimeMap(mimeType: string) {
  switch (mimeType) {
    case "application/pdf":
      return <FileText className="w-6 h-6" strokeWidth={1.5} />;
    case "image/jpeg":
    case "image/png":
    case "image/gif":
    case "image/webp":
    case "image/bmp":
    case "image/svg+xml":
    case "image/tiff":
    case "image/x-icon":
      return <ImageIcon className="w-6 h-6" strokeWidth={1.5} />;
    case "multipart/related":
      return <FileCode className="w-6 g-6" strokeWidth={1.5} />;
    default:
      return mimeType;
  }
}

type FileActionsProps = {
  file: File;
  handlers: Handlers;
  removeFile: () => void;
};

export interface Handlers {
  transcription: {
    accept: "application/pdf,image";
    handlerFn: UseMutateFunction<string, Error, File, unknown>;
  };
  htmlParser: {
    accept: "multipart/related";
    handlerFn: UseMutateFunction<string, Error, File, unknown>;
  };
}

export default function FileActions({
  file,
  handlers,
  removeFile,
}: FileActionsProps) {
  if (!isCorrectFileType(file)) {
    return null;
  }

  const activeHandler = Object.values(handlers).find((handler) => {
    return handler.accept
      .split(",")
      .some((fileType: string) => file.type.includes(fileType));
  });

  async function handleClick() {
    const typedHandler = activeHandler as Handlers[keyof Handlers];
    typedHandler.handlerFn(file);
  }

  return (
    <Container className="sticky bottom-0 left-0 flex items-center justify-between bg-stone-100 p-2 rounded-md">
      <Container className="flex items-center space-x-4">
        {mimeMap(file.type)}
        <span className="truncate max-w-xs font-medium">{file.name}</span>
      </Container>
      <Container className="flex gap-4">
        <button
          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onClick={handleClick}
        >
          <Globe className="w-5 h-5 mr-2" />
          Traduire
        </button>
        <Button
          variant="ghost"
          onClick={() => removeFile()}
          className="text-red-500 hover:text-red-700"
          aria-label={`Remove ${file.name}`}
        >
          <X className="w-5 h-5" />
        </Button>
      </Container>
    </Container>
  );
}
