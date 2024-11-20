import { ACCEPTED_FILETYPES } from "@/utils/constants";
import { Upload } from "lucide-react";
import { ChangeEvent } from "react";

type FileInputProps = {
  handleSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FileInput({ handleSelectFile }: FileInputProps) {
  return (
    <>
      <input
        type="file"
        id="file-upload"
        onChange={handleSelectFile}
        className="hidden"
        accept={ACCEPTED_FILETYPES}
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-full cursor-pointer text-center"
      >
        <Upload className="w-10 h-10 mb-3 text-gray-400" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">
            Cliquez pour séléctionner un fichier
          </span>{" "}
          ou faites glisser le fichier et déposez-le
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Le fichier doit être au format image (JPEG, PNG, BMP, etc.) ou PDF (3
          pages max) et ne pas dépasser 1 Mo.
        </p>
      </label>
    </>
  );
}
