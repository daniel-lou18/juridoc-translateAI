// import { TextContentProps } from "@/types/Components";
// import TextCardSkeleton from "../../ui/skeletons/TextCardSkeleton";
// import BirthCertificateCard from "./BirthCertificateCard";
// import LoaderWrapper from "../../ui/common/LoaderWrapper";
// import { StateObject } from "@/utils/translation";

// type BirthCertificate_PORProps = TextContentProps<StateObject | null>;

// export default function BirthCertificate_POR({
//   data,
//   isLoading,
//   error,
// }: BirthCertificate_PORProps) {
//   return (
//     <LoaderWrapper
//       isData={!!data}
//       isLoading={isLoading}
//       LoadingIndicator={TextCardSkeleton}
//       error={error}
//     >
//       {data ? <BirthCertificateCard translation={data} /> : null}
//     </LoaderWrapper>
//   );
// }
