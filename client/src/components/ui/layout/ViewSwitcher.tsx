import { Columns2, Grid2X2, ToggleLeft } from "lucide-react";
import { Button } from "../button";
import Container from "../common/Container";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { ViewOptions } from "@/contexts/viewContext";

type ViewSwitcherProps = {
  viewMode: ViewOptions;
  setViewMode: Dispatch<SetStateAction<ViewOptions>>;
  className?: string;
};

export default function ViewSwitcher({
  viewMode,
  setViewMode,
  className,
}: ViewSwitcherProps) {
  return (
    <Container className="flex justify-between items-center mb-3">
      <div id="tabs-portal"></div>
      <Container
        className={cn("flex items-center justify-end gap-2", className)}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode("miniature")}
          className={viewMode === "miniature" ? "bg-gray-100" : ""}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode("side-by-side")}
          className={viewMode === "side-by-side" ? "bg-gray-100" : ""}
        >
          <Columns2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setViewMode("toggle")}
          className={viewMode === "toggle" ? "bg-gray-100" : ""}
        >
          <ToggleLeft className="h-4 w-4" />
        </Button>
      </Container>
    </Container>
  );
}
