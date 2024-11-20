import { createContext, ReactNode, useContext } from "react";
import { useHtmlTranslate } from "@/hooks/useHtmlTranslate";
import { useHtmlUrl } from "@/hooks/useHtmlUrl";
import { useFileSelect } from "@/hooks/useFileSelect";
import { HtmlContent } from "@/types/BirthCertificate_POR";

type ContextValue = Omit<ReturnType<typeof useFileSelect>, "error"> & {
  htmlContent: HtmlContent | null;
} & ReturnType<typeof useHtmlTranslate> & { handleFileAction: () => void };

const HtmlContext = createContext<ContextValue | null>(null);

export default function HtmlContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { file, setFile, handleSelectFile, removeFile } = useFileSelect();
  const { htmlContent } = useHtmlUrl(file);
  const { translation, mutate, isPending, error } = useHtmlTranslate();

  function handleFileAction() {
    mutate(htmlContent);
  }

  return (
    <HtmlContext.Provider
      value={{
        file,
        setFile,
        handleFileAction,
        handleSelectFile,
        removeFile,
        htmlContent,
        translation,
        mutate,
        isPending,
        error,
      }}
    >
      {children}
    </HtmlContext.Provider>
  );
}

export function useHtmlContext() {
  const context = useContext(HtmlContext);

  if (!context) {
    throw new Error(
      "useHtmlContext should be used within a HtmlContextProvider"
    );
  }

  return context;
}
