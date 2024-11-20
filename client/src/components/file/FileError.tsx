import { FileX } from "lucide-react";

export default function FileError({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="flex items-center space-x-4">
      <FileX className="h-16 w-16" strokeWidth={1} /> {errorMessage}
    </div>
  );
}
