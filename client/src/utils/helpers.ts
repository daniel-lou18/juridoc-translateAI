import { FILETYPES } from "./constants";

export function isCorrectFileType(file: File, fileTypes: string[] = FILETYPES) {
  if (fileTypes.indexOf(file.type) !== -1) {
    return true;
  }
  return false;
}
