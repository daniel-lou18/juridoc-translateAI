// import FileHtml from "@/components/file/HtmlHandler";
// import BirthCertificate_POR from "./BirthCertificate_POR";
// import { useHtmlTranslate } from "@/hooks/useHtmlTranslate";
// import { useHtmlUrl } from "@/hooks/useHtmlUrl";
// import { useFileSelect } from "@/hooks/useFileSelect";

// export default function BirthCertificateHtml() {
//   const { file, setFile, handleSelectFile, removeFile } = useFileSelect();
//   const { htmlDoc } = useHtmlUrl(file);
//   const { translation, mutate, isPending, error } = useHtmlTranslate();

//   function handleFileAction() {
//     mutate(htmlDoc);
//   }

//   return (
//     <>
//       <FileHtml
//         fileProps={{ file, setFile, handleSelectFile, removeFile }}
//         htmlProps={{
//           innerHtml: htmlDoc?.body.innerHTML || "",
//           handleFileAction,
//         }}
//         isTranslated={!!translation}
//       />
//       <BirthCertificate_POR
//         data={translation}
//         isLoading={isPending}
//         error={error ? error.message : ""}
//       />
//     </>
//   );
// }
