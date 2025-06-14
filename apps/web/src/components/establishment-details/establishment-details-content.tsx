import { SendTipCard } from "../pages/home/SendTipCard";
import { Button } from "../ui/button";

import { ActionButtons } from "./action-buttons";
import { SocialMedia } from "./social-media";

export const EstablishmentDetailsContent = () => {
  return (
    <div className="flex flex-col gap-5 pb-5">
      <div className="flex flex-col gap-2.5">
        <Button className="flex flex-col h-[94px]  gap-1 items-center">
          <div className="grid grid-cols-2 gap-[2px]">
            <div className="w-2 h-2 rounded-[1px] border border-white"></div>
            <div className="w-2 h-2 rounded-[1px] border border-white"></div>
            <div className="w-2 h-2 rounded-[1px] border border-white"></div>
            <div className="w-2 h-2 rounded-[1px] border border-white"></div>
          </div>
          Scan QR
        </Button>
        <SendTipCard />
      </div>
      <ActionButtons />
      <SocialMedia />
    </div>
  );
};
