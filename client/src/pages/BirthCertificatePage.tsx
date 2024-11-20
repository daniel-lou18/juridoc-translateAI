// import BirthCertificate from "@/components/translation/BirthCertificate/BirthCertificate";
import BirthCertHtml from "@/components/file/HtmlHandler";
import HtmlContextProvider from "@/contexts/htmlContext";

export default function BirthCertificatePage() {
  return (
    <HtmlContextProvider>
      <BirthCertHtml />
    </HtmlContextProvider>
  );
}
