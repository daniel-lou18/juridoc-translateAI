import { useEffect, useState } from "react";

export type ViewerProps = { file: File };

export default function ImageViewer({ file }: ViewerProps) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const newImageUrl = URL.createObjectURL(file);
    setImageUrl(newImageUrl);

    return () => URL.revokeObjectURL(newImageUrl);
  }, [file]);

  return <img className="h-full w-auto object-cover" src={imageUrl} />;
}
