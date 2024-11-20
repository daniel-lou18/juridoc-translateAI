import { FileInput } from "lucide-react";
import PageNum from "../ui/common/PageNum";
import TextCardControls from "../ui/common/TextCard/TextCardControls";
import Title from "../ui/common/Title";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type CardProps = {
  text: string;
  pageNum: number;
};

export default function TranscriptionCard({ text, pageNum }: CardProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto mt-2">
      <TextCardControls saveButtonVisible={false}>
        <Title
          className="text-sm text-muted-foreground"
          icon={<FileInput strokeWidth={1} className="w-4 h-4 mr-2" />}
        >
          Texte transcrit
        </Title>
      </TextCardControls>
      <CardContent className="space-y-6">
        <pre className="whitespace-pre-wrap font-sans">{text}</pre>
      </CardContent>
      <CardFooter>
        <PageNum pageNum={pageNum} />
      </CardFooter>
    </Card>
  );
}
