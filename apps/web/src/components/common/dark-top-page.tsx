import { ChevronLeft } from "lucide-react";
import type { JSX } from "react";
import { useNavigate } from "react-router";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

interface Props {
  top: JSX.Element | JSX.Element[];
  children: JSX.Element;
  topClassName?: string;
}

export const DarkTopPage = ({ children, top, topClassName }: Props) => {
  return (
    <main className="bg-black w-full h-full text-white flex flex-col gap-[16px] pt-[16px]">
      <div className={cn("grid grid-cols-5 px-5", topClassName)}>
        {Array.isArray(top) ? (
          <>
            {top[0]}
            <div className="flex items-center justify-center col-span-3">{top[1]}</div>
            {top.slice(2)}
          </>
        ) : (
          top
        )}
      </div>
      {children}
    </main>
  );
};

interface DarkTopPageBackButtonProps {
  route: string;
}

export const DarkTopPageBackButton = ({ route }: DarkTopPageBackButtonProps) => {
  const navigate = useNavigate();
  const onBack = () => {
    return navigate(route);
  };

  return (
    <div className="flex">
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

export const DarkTopPageTitle = ({ children }: { children: string }) => {
  return <div className="self-center text-center text-[20px] font-medium">{children}</div>;
};
