import { BadgeDollarSign, ChevronRight, QrCode, Wallet } from "lucide-react";

import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTipBalance } from "@/hooks/use-tip-balance";

const CreatePaymentPage = () => {
  const { balance, setBalance, to, setTo } = useTipBalance();

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
              <Input value={to} onChange={(e) => setTo(e.target.value)} className="py-[20px] pl-[20px] rounded-[30px] text-[18px]" />
            </div>
          </div>
          <Button>
            Or scan QR <QrCode />
          </Button>
        </div>
        <div className="flex flex-col gap-4 flex-1 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <BadgeDollarSign />
              Leave a tip
            </div>
            <div className="border flex flex-col p-[20px] rounded-[30px] shadow-xs gap-[20px]">
              <div className="flex items-center justify-center">
                <div className="text-black font-medium text-[40px]">$</div>
                <div className="flex justify-items items-center">
                    <Input
                    value={balance}
                    onChange={(e) => {
                        setBalance(e.target.value);
                    }}
                    className="self-end text-center border-none shadow-none !text-[40px] font-medium my-0"
                    />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-[8px]">
                <Button className="bg-[#E0DBFC] text-black font-normal hover:bg-[#E0DBFC]/50" onClick={() => setBalance("5")}>$5</Button>
                <Button className="bg-[#E0DBFC] text-black font-normal hover:bg-[#E0DBFC]/50" onClick={() => setBalance("10")}>$10</Button>
                <Button className="bg-[#E0DBFC] text-black font-normal hover:bg-[#E0DBFC]/50" onClick={() => setBalance("15")}>$15</Button>
              </div>
            </div>
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
