import { BadgeDollarSign, ChevronRight, QrCode, Wallet } from "lucide-react";

import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreatePaymentPage = () => {
  return (
    <DarkTopPage
      top={[
        <DarkTopPageBackButton route="/" className="col-span-1" />,
        <DarkTopPageTitle className="col-span-3">Create a payment</DarkTopPageTitle>,
      ]}
    >
      <DarkTopPageContent>
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
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

export default CreatePaymentPage;
