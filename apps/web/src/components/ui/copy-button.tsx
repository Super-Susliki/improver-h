import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  data: string;
  className?: string;
}

export const CopyButton = ({ data, className }: CopyButtonProps) => {
  const handleCopy = async (data: string) => {
    await navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
  };

  return (
    <button onClick={() => handleCopy(data)} className="cursor-pointer">
      <Copy className={cn("w-4 h-4", className)} />
    </button>
  );
};
