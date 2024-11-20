import Container from "../../ui/common/Container";
import ActionBar from "../ActionBar";
import { FileCode } from "lucide-react";
import { useHtmlContext } from "@/contexts/htmlContext";
import ViewSwitcher from "@/components/ui/layout/ViewSwitcher";
import TranslationSection from "../../translation/BirthCertificate/TranslationSection";
import { useViewContext } from "@/contexts/viewContext";
import HtmlCardPages from "./HtmlCardPages";
import ViewTabs from "@/components/ui/layout/ViewTabs";

const containerStyles = {
  miniature: "px-8",
  "side-by-side": "px-8",
  toggle: "max-w-4xl",
};

const gridStyles = {
  miniature: `grid-cols-2 grid-rows-1 grid-flow-col gap-8`,
  "side-by-side": "grid-cols-2 grid-rows-1 gap-8 text-xs",
  toggle: "grid-cols-1",
};

export default function HtmlViewerContainer() {
  const { file, translation, handleFileAction, removeFile, isPending } =
    useHtmlContext();
  const { viewMode, setViewMode } = useViewContext();
  const tabsData = [
    { triggerValue: "traduction", component: <TranslationSection /> },
    { triggerValue: "original", component: <HtmlCardPages /> },
  ];

  const renderViewSwitcher = (): JSX.Element | null =>
    translation ? (
      <ViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />
    ) : null;

  const renderHtmlCard = (): JSX.Element => <HtmlCardPages />;

  const renderTranslation = (): JSX.Element | null =>
    translation ? <TranslationSection /> : null;

  const renderWithTabs = (): JSX.Element | null => (
    <ViewTabs tabsData={tabsData} isTranslated={!!translation} />
  );

  const renderWithoutTabs = (): JSX.Element | null => (
    <>
      {renderTranslation()}
      {renderHtmlCard()}
    </>
  );

  const renderActionBar = (): JSX.Element | null =>
    translation ? null : (
      <ActionBar
        file={file}
        isLoading={isPending}
        onClick={handleFileAction}
        removeFile={removeFile}
        icon={<FileCode className="w-6 h-6" strokeWidth={1.5} />}
      />
    );

  return (
    <>
      <Container className={`w-full mx-auto ${containerStyles[viewMode]}`}>
        {renderViewSwitcher()}
        <Container className={`grid ${gridStyles[viewMode]}`}>
          {viewMode === "toggle" ? renderWithTabs() : renderWithoutTabs()}
        </Container>
      </Container>
      {renderActionBar()}
    </>
  );
}
