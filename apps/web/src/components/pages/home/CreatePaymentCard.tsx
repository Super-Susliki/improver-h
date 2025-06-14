import { ArrowRight } from "@/components/svg";
import { Link } from "react-router";

export const CreatePaymentCard = () => {
  return (
    <div className="mt-5 rounded-[30px] bg-[linear-gradient(302.76deg,#FFFFFF_30.51%,#B8ACFF_106.11%)] h-[94px] p-5 border flex justify-between border-[#DADADA] bg-[linear-gradient(302.76deg,#FFFFFF_30.51%,#B8ACFF 106.11%)]">
      <div className="flex flex-col">
        <p className="text-[24px] font-medium text-black leading-[30px]">Create Payment</p>
        <div className="flex items-center ml-[2px] gap-[2px]">
          <span className="text-xs text-[#00000099]">Powered by</span>
          <img className="h-[16px]" src="/intmax.webp" alt="intmax" />
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <Link
          to="/create-payment"
          className="rounded-[20px] bg-black size-[54px] flex items-center justify-center"
        >
          <ArrowRight />
        </Link>
      </div>
    </div>
  );
};

CreatePaymentCard.displayName = "CreatePaymentCard";
