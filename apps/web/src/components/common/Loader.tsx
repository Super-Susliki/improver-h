import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4 border",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={cn(
          "animate-spin rounded-full border-b-gray-900 border-t-transparent",
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
};

Loader.displayName = "Loader";
