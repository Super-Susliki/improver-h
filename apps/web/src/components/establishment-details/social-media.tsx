import { Instagram, Send } from "lucide-react";

import { Button } from "../ui/button";

export const SocialMedia = () => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-[20px] font-medium">Social media</h3>
      <div className="flex items-center gap-2.5">
        <Button className="h-11 w-11 p-2.5 rounded-[16px]">
          <Instagram />
        </Button>
        <Button className="h-11 w-11 p-2.5 rounded-[16px]">
          <Send />
        </Button>
      </div>
    </div>
  );
};
