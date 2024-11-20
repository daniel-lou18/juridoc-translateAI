import { Document, Page, pdfjs } from "react-pdf";
import { ViewerProps } from "./ImageViewer";
import SkeletonCard from "../ui/common/SkeletonCard";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ file }: ViewerProps) {
  return (
    <div>
      <Document
        file={file}
        error={<div className="text-red-500">Failed to load PDF</div>}
        loading={<SkeletonCard className="w-[300px]" />}
      >
        <Page
          pageNumber={1}
          width={300}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="shadow-md rounded-lg overflow-hidden"
        />
      </Document>
    </div>
  );
}
