import Card from "./TranscriptionCard";

export type TextComponentProps = {
  textArray: string[];
};

export default function TranscriptionCards({ textArray }: TextComponentProps) {
  return (
    <div>
      {textArray.map((text, idx) => (
        <Card text={text} pageNum={idx + 1} key={text.slice(0, 5)} />
      ))}
    </div>
  );
}
