import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

interface Props {
  top: React.ReactNode | React.ReactNode[];
  children: React.ReactNode;
  topClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const DarkTopPage = ({ children, top, topClassName, className, style }: Props) => {
  return (
    <main
      style={style}
      className={cn(
        "bg-black w-full h-full text-white flex flex-col gap-[16px] pt-[16px] flex-1",
        className
      )}
    >
      <div className={cn("grid grid-cols-5 min-h-11 px-5", topClassName)}>
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
        className="rounded-full bg-transparent border border-white size-[44px] p-0"
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
  addBottomPadding = false,
}: {
  children: React.ReactNode;
  className?: string;
  addBottomPadding?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-full bg-white text-black rounded-t-[30px] p-[24px] gap-8 flex-1 pb-0",
        className,
        addBottomPadding && "pb-[58px]"
      )}
    >
      {children}
    </div>
  );
};
