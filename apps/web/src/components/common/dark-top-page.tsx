import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

interface Props {
  top: React.ReactNode | React.ReactNode[];
  children: React.ReactNode;
  topClassName?: string;
}

export const DarkTopPage = ({ children, top, topClassName }: Props) => {
  return (
    <main className="bg-black w-full h-full text-white flex flex-col gap-[16px] pt-[16px]">
      <div className={cn("grid grid-cols-5 px-5 relative", topClassName)}>
        {Array.isArray(top) ? top.map((item) => item) : top}
      </div>
      {children}
    </main>
  );
};

interface DarkTopPageBackButtonProps {
  route: string;
  className?: string;
}

export const DarkTopPageBackButton = ({ route, className }: DarkTopPageBackButtonProps) => {
  const navigate = useNavigate();
  const onBack = () => {
    return navigate(route);
  };

  return (
    <div className={cn("flex", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-transparent border border-white w-16 h-16 p-0"
        onClick={() => {
          void onBack();
        }}
      >
        <ChevronLeft size={32} />
      </Button>
    </div>
  );
};

export const DarkTopPageTitle = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <div className={cn("self-center text-center text-[20px] font-medium", className)}>
      {children}
    </div>
  );
};

export const DarkTopPageContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-full bg-white text-black rounded-t-[30px] p-[24px] gap-8",
        className
      )}
    >
      {children}
    </div>
  );
};
