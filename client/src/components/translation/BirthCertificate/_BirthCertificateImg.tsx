// import Header from "../../Header";
// import { useTesseract } from "@/hooks/useTesseract";
// import { useExtract } from "@/hooks/useExtract";
// import { parsedObject as testObject, testText } from "@/utils/constants";
// import File from "../../file";
// import Container from "../../ui/common/Container";
// import BirthCertificate_POR from "./BirthCertificate_POR";
// import { convertBirthCertificateToState } from "@/utils/translation";

// export default function BirthCertificateImg() {
//   const {
//     transcription,
//     mutate,
//     isPending: isPendingTranscription,
//     error: transcriptionError,
//   } = useTesseract();
//   const {
//     parsedObject,
//     isPending: isPendingTranslation,
//     error: translationError,
//   } = useExtract(transcription);

//   const testState = convertBirthCertificateToState(testObject);

//   console.log(translationHtml);

//   return (
//     <Container className="w-full h-full min-h-screen mx-auto bg-stone-50">
//       <Header />
//       <File handlers={handlers} />
//       <Transcription
//         data={transcription}
//         isLoading={isPendingTranscription}
//         error={transcriptionError ? transcriptionError.message : ""}
//       />
//       <BirthCertificate_POR
//         data={parsedObject}
//         isLoading={isPendingTranscription || isPendingTranslation}
//         error={translationError ? translationError.message : ""}
//       />
//     </Container>
//   );
// }
