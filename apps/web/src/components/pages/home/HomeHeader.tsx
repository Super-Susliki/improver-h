import { WalletIcon } from "@/components/svg";

export const HomeHeader = () => {
  return (
    <div className="flex justify-between w-full py-4">
      <p className="text-[32px] font-medium text-black">Hello 👋</p>

      <button className="cursor-pointer rounded-[30px] bg-black py-[10px] px-4 flex items-center gap-[10px]">
        <WalletIcon />
        <p className="text-[16px] text-white">Wallet</p>
      </button>
    </div>
  );
};

HomeHeader.displayName = "HomeHeader";
