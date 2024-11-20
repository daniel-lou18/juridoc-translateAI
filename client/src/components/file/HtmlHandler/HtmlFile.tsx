import FileInput from "../FileInput";
import FileDrop from "../FileDrop";
import Hero from "../../Hero";
import Container from "../../ui/common/Container";
import { useHtmlContext } from "@/contexts/htmlContext";

export default function HtmlFile() {
  const { setFile, handleSelectFile } = useHtmlContext();

  return (
    <Container className="px-4 py-8">
      <FileDrop setFile={setFile}>
        <FileInput handleSelectFile={handleSelectFile} />
      </FileDrop>
      <Hero />
    </Container>
  );
}
