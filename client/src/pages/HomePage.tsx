// import Home from "@/components/Home";
import BirthCertHtml from "@/components/file/HtmlHandler";
import HtmlContextProvider from "@/contexts/htmlContext";

export default function HomePage() {
  return (
    <HtmlContextProvider>
      <BirthCertHtml />
    </HtmlContextProvider>
  );
}
