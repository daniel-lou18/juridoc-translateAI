// import { useImageToText } from "../hooks/useImageToText";
// import { useTranslate } from "../hooks/useTranslate";
// import Header from "./Header";
// import Transcription from "./transcription/TranscriptionCards";
// import Translation from "./translation";
// import LoaderWrapper from "./ui/common/LoaderWrapper";
// import TextCardSkeleton from "./ui/skeletons/TextCardSkeleton";
// import File from "./file";

// export default function Home() {
//   const {
//     transcriptionArray,
//     mutate,
//     isPending: isPendingTranscription,
//     error: transcriptionError,
//   } = useImageToText();
//   const {
//     translationArray,
//     isPending: isPendingTranslation,
//     error: translationError,
//   } = useTranslate(transcriptionArray);

//   return (
//     <div className="w-full h-full min-h-screen bg-stone-50">
//       <div className="w-full mx-auto px-4 pb-8">
//         <Header />
//         <File mutateFn={mutate} />
//         <div className="md:grid grid-cols-2 gap-x-4 mt-8">
//           <LoaderWrapper
//             isData={transcriptionArray?.length > 0}
//             isLoading={isPendingTranscription}
//             LoadingIndicator={TextCardSkeleton}
//             error={transcriptionError ? transcriptionError.message : null}
//           >
//             <Transcription textArray={transcriptionArray} />
//           </LoaderWrapper>

//           <LoaderWrapper
//             isData={transcriptionArray?.length > 0}
//             isLoading={isPendingTranslation}
//             LoadingIndicator={TextCardSkeleton}
//             error={translationError ? translationError.message : null}
//           >
//             <Translation textArray={translationArray} />
//           </LoaderWrapper>
//         </div>
//       </div>
//     </div>
//   );
// }
