import TranscriptionCards from "./TranscriptionCards";
import LoaderWrapper from "../ui/common/LoaderWrapper";
import TextCardSkeleton from "../ui/skeletons/TextCardSkeleton";

type TranscriptionProps = {
  data: string;
  isLoading: boolean;
  error: string;
};

export default function Transcription({
  data,
  isLoading,
  error,
}: TranscriptionProps) {
  return (
    <LoaderWrapper
      isData={!!data}
      isLoading={isLoading}
      LoadingIndicator={TextCardSkeleton}
      error={error}
    >
      <TranscriptionCards textArray={[data]} />
    </LoaderWrapper>
  );
}
