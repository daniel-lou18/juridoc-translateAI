import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { useDrag } from "../../hooks/useDrag";

type FileDropProps = {
  setFile: Dispatch<SetStateAction<File | null>>;
} & PropsWithChildren;

export default function FileDrop({ children, setFile }: FileDropProps) {
  const { dragActive, handleDrag, handleDrop } = useDrag(setFile);

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full h-[360px] p-2 mb-16 border-2 border-dashed rounded-lg transition-colors hover:bg-stone-100/80 ${
        dragActive ? "border-stone-500 bg-stone-200" : "border-stone-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}
