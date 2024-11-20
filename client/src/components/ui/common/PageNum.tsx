import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../button";

export default function SimplePageNum({
  pageNum,
}: {
  pageNum: number | string;
}) {
  return (
    <div className="flex justify-center w-full text-sm text-muted-foreground mt-1">
      - {pageNum.toString()} -
    </div>
  );
}

type PageNumProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (newPage: number) => void;
};

export function PageNav({
  currentPage,
  totalPages,
  setCurrentPage,
}: PageNumProps) {
  function toNextPage() {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  }

  function toPrevPage() {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  }

  return (
    <div className="flex justify-between items-center w-full mt-1">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
        onClick={toPrevPage}
      >
        <ChevronLeft />
      </Button>
      <span className="text-sm text-muted-foreground">
        {`Page ${currentPage.toString()} sur ${totalPages.toString()}`}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={toNextPage}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
