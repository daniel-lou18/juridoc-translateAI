import { Save } from "lucide-react";
import { Button } from "../../button";

type SaveButtonProps = { onClick: () => void };

export default function SaveButton({ onClick }: SaveButtonProps) {
  return (
    <Button className="h-8 w-8 mr-2 text-sm" onClick={onClick}>
      <Save className="w-4 h-4" />
    </Button>
  );
}
