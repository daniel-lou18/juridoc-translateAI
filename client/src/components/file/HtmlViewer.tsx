import { useHtmlUrl } from "@/hooks/useHtmlUrl";
import { ViewerProps } from "./ImageViewer";

export default function HtmlViewer({ file }: ViewerProps) {
  const { blobUrl } = useHtmlUrl(file);

  return <iframe src={blobUrl} className="min-h-screen w-full" />;
}
