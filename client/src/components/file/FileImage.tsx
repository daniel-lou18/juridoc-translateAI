import { isCorrectFileType } from "../../utils/helpers";
import Container from "../ui/common/Container";
import FileError from "./FileError";
import HtmlViewer from "./HtmlViewer";
import ImageViewer from "./ImageViewer";
import PdfViewer from "./PdfViewer";

type FileImageProps = {
  file: File;
  error: string;
};

function getContent(file: File, error: string) {
  const { type: mimeType } = file;

  if (error) {
    return <FileError errorMessage={error} />;
  }

  if (mimeType === "application/pdf") {
    return <PdfViewer file={file} />;
  }

  if (mimeType.startsWith("image/")) {
    return <ImageViewer file={file} />;
  }

  if (mimeType === "multipart/related") {
    return <HtmlViewer file={file} />;
  }

  if (!isCorrectFileType(file)) {
    return (
      <FileError
        errorMessage="Le fichier ne correspond
        pas aux formats acceptés (png, jpg, jpeg, bmp, PDF, html, mhtml)"
      />
    );
  }

  return null;
}

export default function FileImage({ file, error }: FileImageProps) {
  const content = getContent(file, error);

  return (
    <Container className="w-full max-w-4xl mx-auto mt-8 col-span-2 rounded-md overflow-hidden">
      {content}
    </Container>
  );
}
