import { WalletIcon } from "@/components/svg";
import { BalanceDisplay } from "@/components/BalanceDisplay";
import { useAccount } from "wagmi";

export const HomePage = () => {
  const { address } = useAccount();

  return (
    <div className="relative w-full">
      <div
        className="size-[369px] z-[-1] absolute top-[-81px] left-[-109px] rounded-full"
        style={{
          background: "radial-gradient(circle, #E0DBFC 0%, rgba(255, 255, 255, 0.1) 100%)",
          filter: "blur(15px)",
        }}
      />

      <div className="flex justify-between w-full py-4">
        <p className="text-[32px] font-medium text-black">Hello 👋</p>

        <button className="cursor-pointer rounded-[30px] bg-black py-[10px] px-4 flex items-center gap-[10px]">
          <WalletIcon />
          <p className="text-[16px] text-white">Wallet</p>
        </button>
      </div>

      <BalanceDisplay address={address} />
    </div>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
