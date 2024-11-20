import Card from "../transcription/TranscriptionCard";

export default function TranslationCards({
  textArray,
}: {
  textArray: string[];
}) {
  return (
    <>
      {textArray.map((text, idx) => (
        <Card text={text} pageNum={idx + 1} key={text.slice(0, 5)}></Card>
      ))}
    </>
  );
}
