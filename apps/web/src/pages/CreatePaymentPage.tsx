import {
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router";

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
  const { balance, setBalance } = useTipBalance();
  const navigate = useNavigate();

  const onBack = () => {
    return navigate("/");
  };

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
            <div className="border flex flex-col p-[20px] rounded-[30px] shadow-xs gap-[20px]">
              <div className="flex items-center justify-center">
                <div className="text-black font-medium text-[40px]">$</div>
                <Input
                  value={balance}
                  onChange={(e) => {
                    setBalance(e.target.value);
                  }}
                  className="self-end text-center border-none shadow-none !text-[40px] font-medium"
                />
              </div>
              <div className="grid grid-cols-3 gap-[8px]">
                <Button className="">$5</Button>
                <Button className="">$10</Button>
                <Button className="">$15</Button>
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
