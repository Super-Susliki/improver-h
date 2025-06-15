import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface ExternalLinkButtonProps {
  href: string;
  className?: string;
}

export const ExternalLinkButton = ({ href, className }: ExternalLinkButtonProps) => {
  const handleClick = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <button onClick={handleClick} className="cursor-pointer">
      <ExternalLink className={cn("w-4 h-4", className)} />
    </button>
  );
};
