import { useState } from "react";
import { EthereumIcon, EyeIcon, EyeOffIcon } from "../../svg";
import { useEthBalance } from "@/hooks/use-eth-balance";
import { useAccount } from "wagmi";

export const BalanceDisplay = () => {
  const { address } = useAccount();
  const [isVisible, setIsVisible] = useState(true);
  const { balance, balanceUSD, isLoading, error } = useEthBalance(address);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const formatBalance = (value: string | null) => {
    if (!value) return "$0.00";
    const num = parseFloat(value);
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const displayBalance = () => {
    if (isLoading) return "$---.--";
    if (error) return "$0.00";
    if (!isVisible) return "****";
    return formatBalance(balanceUSD);
  };

  return (
    <div className="flex flex-col rounded-[30px] border border-black">
      <div className="flex items-center justify-center rounded-t-[30px] bg-black py-4 bg-[url('/bg/balance.jpg')] bg-cover bg-center">
        <div className="size-[60px] min-w-[60px] rounded-[20px] bg-white flex items-center justify-center">
          <EthereumIcon />
        </div>
      </div>
      <div className="rounded-b-[30px] bg-white py-4 flex flex-col gap-[2px] justify-center items-center">
        <p className="text-sm text-black">Your balance</p>
        <div className="flex gap-[10px] items-center">
          <p className="text-[40px] leading-[50px] font-medium text-black">{displayBalance()}</p>
          <button
            onClick={toggleVisibility}
            className="transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 rounded"
            aria-label={isVisible ? "Hide balance" : "Show balance"}
          >
            {isVisible ? <EyeIcon /> : <EyeOffIcon />}
          </button>
        </div>
        {error && !isLoading && (
          <p className="text-xs text-red-500 mt-1">Failed to fetch price data</p>
        )}
        {isLoading && <p className="text-xs text-gray-500 mt-1">Loading...</p>}
        {balance && isVisible && !isLoading && (
          <p className="text-xs text-gray-600 mt-1">{parseFloat(balance).toFixed(4)} ETH</p>
        )}
      </div>
    </div>
  );
};
