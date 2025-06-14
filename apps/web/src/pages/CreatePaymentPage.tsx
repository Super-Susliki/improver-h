import {
  BadgeDollarSign,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";

const CreatePaymentPage = () => {
    const navigate = useNavigate();

    const onBack = () => {
        return navigate("/");
    }

  return (
    <main className="bg-black w-full h-full text-white flex flex-col gap-[16px] pt-[16px]">
      <div className="grid grid-cols-3 px-5">
        <div className="flex">
          <Button
            variant="ghost"
            size="icon"
            className="w-fit h-fit rounded-full bg-transparent border border-white w-16 h-16 p-0"
            onClick={onBack}
          >
            <ChevronLeft size={32} />
          </Button>
        </div>
        <div className="self-center text-center text-[20px] font-medium">
          Create a payment
        </div>
      </div>
      <div className="flex flex-col w-full h-full bg-white text-black rounded-t-[30px] p-[24px] gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <Wallet />
              Send to
            </div>
            <div><Input className="py-[20px] pl-[20px] rounded-[30px] text-[18px]" /></div>
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
    </main>
  );
};

export default CreatePaymentPage;
