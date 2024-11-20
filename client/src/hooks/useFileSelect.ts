import { isCorrectFileType } from "@/utils/helpers";
import { ChangeEvent, useCallback, useState } from "react";

export function useFileSelect() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSelectFile = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const file = e.target.files && e.target.files[0];

      if (!file) {
        return;
      }

      if (!isCorrectFileType(file)) {
        setError("This file type is not supported");
        setFile(null);
        return;
      }

      setFile(file);
      setError("");
    },
    [setFile]
  );

  const removeFile = useCallback(() => {
    setFile(null);
  }, [setFile]);

  return {
    file,
    setFile,
    error,
    handleSelectFile,
    removeFile,
  };
}
