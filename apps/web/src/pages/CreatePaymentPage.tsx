import { BadgeDollarSign, ChevronRight, QrCode, Wallet } from "lucide-react";

import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreatePaymentPage = () => {
  return (
    <DarkTopPage
      top={[
        <DarkTopPageBackButton route="/" />,
        <DarkTopPageTitle>Create a payment</DarkTopPageTitle>,
      ]}
    >
      <div className="flex flex-col w-full h-full bg-white text-black rounded-t-[30px] p-[24px] gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Wallet />
              Send to
            </div>
            <div>
              <Input className="py-[20px] pl-[20px] rounded-[30px] text-[18px]" />
            </div>
          </div>
          <Button>
            Or scan QR <QrCode />
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <BadgeDollarSign />
              Leave a tip
            </div>
            <div className="border flex flex-col p-[20px]"></div>
          </div>
          <Button>
            Next <ChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </DarkTopPage>
  );
};

export default CreatePaymentPage;
