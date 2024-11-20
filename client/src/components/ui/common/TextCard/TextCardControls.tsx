import { ReactNode } from "react";
import CopyToClipboard from "./CopyToClipboard";
import DocControls from "./DocControls";
import SaveButton from "./SaveButton";

type TextCardControlsProps = {
  children: ReactNode;
  saveButtonVisible: boolean;
};

export default function TextCardControls({
  children,
  saveButtonVisible,
}: TextCardControlsProps) {
  return (
    <div className="flex justify-between items-center border-b bg-muted pl-4 pr-2 py-2">
      {children}
      <div className="flex">
        {saveButtonVisible ? <SaveButton onClick={() => undefined} /> : null}
        <DocControls content={[""]} />
        <CopyToClipboard text={""} />
      </div>
    </div>
  );
}
