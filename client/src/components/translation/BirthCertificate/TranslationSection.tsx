import TextCardSkeleton from "../../ui/skeletons/TextCardSkeleton";
import LoaderWrapper from "../../ui/common/LoaderWrapper";
import { useHtmlContext } from "@/contexts/htmlContext";
import BirthCertificateCards from "./BirthCertificateCards";

export default function TranslationSection() {
  const { translation, isPending, error } = useHtmlContext();

  return (
    <LoaderWrapper
      isData={!!translation}
      isLoading={isPending}
      LoadingIndicator={TextCardSkeleton}
      error={error ? error.message : null}
    >
      <BirthCertificateCards translation={translation!} />
    </LoaderWrapper>
  );
}
