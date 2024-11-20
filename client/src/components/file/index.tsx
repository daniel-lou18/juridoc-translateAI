import FileActions, { Handlers } from "./FileActions";
import FileInput from "./FileInput";
import FileImage from "./FileImage";
import FileDrop from "./FileDrop";
import { useFileSelect } from "@/hooks/useFileSelect";
import Hero from "../Hero";
import Container from "../ui/common/Container";

type FileProps = {
  handlers: Handlers;
};

export default function File({ handlers }: FileProps) {
  const { file, setFile, handleSelectFile, removeFile } = useFileSelect();

  return (
    <>
      {file ? (
        <Container className="flex flex-col gap-y-8">
          <FileImage file={file} error={""} />
          <FileActions
            file={file}
            handlers={handlers}
            removeFile={removeFile}
          />
        </Container>
      ) : (
        <>
          <FileDrop setFile={setFile}>
            <FileInput handleSelectFile={handleSelectFile} />
          </FileDrop>
          <Hero />
        </>
      )}
    </>
  );
}
