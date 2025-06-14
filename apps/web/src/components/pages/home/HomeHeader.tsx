import { WalletIcon } from "@/components/svg";
import { useAuth } from "@/contexts/AuthContext";

export const HomeHeader = () => {
  const { privyUser, privyLogout } = useAuth();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="flex justify-between w-full py-4">
      <div>
        <p className="text-[32px] font-medium text-black">Hello 👋</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button className="cursor-pointer rounded-[30px] bg-black py-[10px] px-4 flex items-center gap-[10px]">
          <WalletIcon />
          <p className="text-[16px] text-white">
            {privyUser?.wallet?.address ? formatAddress(privyUser.wallet.address) : "Wallet"}
          </p>
        </button>

        <button onClick={privyLogout} className="text-xs text-red-600 hover:text-red-800">
          Logout
        </button>
      </div>
    </div>
  );
};

HomeHeader.displayName = "HomeHeader";
