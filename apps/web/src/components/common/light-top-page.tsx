import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

interface Props {
  top: React.ReactNode | React.ReactNode[];
  children: React.ReactNode;
  topClassName?: string;
}

export const LightTopPage = ({ children, top, topClassName }: Props) => {
  return (
    <main className="bg-white w-full h-full text-black flex flex-col gap-[16px] pt-[16px] flex-1">
      <div className={cn("grid grid-cols-5 px-5", topClassName)}>
        {Array.isArray(top) ? top.map((item) => item) : top}
      </div>
      {children}
    </main>
  );
};

interface LightTopPageBackButtonProps {
  route: string;
  className?: string;
}

export const LightTopPageBackButton = ({ route, className }: LightTopPageBackButtonProps) => {
  const navigate = useNavigate();
  const onBack = () => {
    return navigate(route);
  };

  return (
    <div className={cn("flex", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-transparent border border-black w-16 h-16 p-0"
        onClick={() => {
          void onBack();
        }}
      >
        <ChevronLeft size={32} />
      </Button>
    </div>
  );
};

export const LightTopPageTitle = ({
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

export const LightTopPageContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-full bg-white text-black rounded-t-[30px] p-[24px] gap-8 flex-1",
        className
      )}
    >
      {children}
    </div>
  );
};
