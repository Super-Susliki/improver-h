import { useState } from "react";
import type { Address } from "viem";
import { zeroAddress, formatEther } from "viem";

import { EthereumIcon, EyeIcon, EyeOffIcon } from "../../svg";

import { useAuth } from "@/contexts/AuthContext";
import { useEthBalance } from "@/hooks/use-eth-balance";
import { useEthPrice } from "@/hooks/use-eth-price";
import { useIntMaxBalances } from "@/hooks/use-int-max-balances";

interface IntMaxTokenBalance {
  token: {
    contractAddress: string;
    symbol: string;
    decimals?: number;
  };
  amount: bigint;
}

export const BalanceDisplay = () => {
  const { privyUser } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  console.log("privyUser ==>", privyUser);
  const address = privyUser?.wallet?.address as Address | undefined;
  const { balance, balanceUSD, isLoading, error } = useEthBalance(address);

  const { ethPriceUSD } = useEthPrice();
  const { data: intMaxBalances } = useIntMaxBalances();

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const formatBalance = (value: string | null) => {
    if (!value) return "$0.00";
    const num = parseFloat(value);
    return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculate IntMax balance in USD
  const calculateIntMaxUSD = () => {
    const balances = (intMaxBalances as any)?.balances as IntMaxTokenBalance[] | undefined;
    if (!balances) return null;

    // Find ETH balance (native token with zero address)
    const ethBalance = balances.find(
      (balance) => balance.token.contractAddress === zeroAddress || balance.token.symbol === "ETH"
    );

    if (!ethBalance?.amount || ethBalance.amount === 0n) {
      return null;
    }

    // Convert BigInt to ETH string using formatEther
    const intMaxEthAmount = formatEther(ethBalance.amount);

    // Use the ETH price from our price hook
    if (ethPriceUSD && intMaxEthAmount) {
      const intMaxEthAmountNum = parseFloat(intMaxEthAmount);
      return (intMaxEthAmountNum * ethPriceUSD).toFixed(2);
    }

    return null;
  };

  const intMaxBalanceUSD = calculateIntMaxUSD();
  const hasIntMaxBalance = intMaxBalanceUSD !== null && parseFloat(intMaxBalanceUSD) > 0;

  const displayBalance = () => {
    if (isLoading) return "$---.--";
    if (error && !balanceUSD) return "$0.00";
    if (!isVisible) return "****";

    return formatBalance(balanceUSD);
  };

  const getIntMaxETHBalance = () => {
    const balances = (intMaxBalances as any)?.balances as IntMaxTokenBalance[] | undefined;
    if (!balances) return null;

    const ethBalance = balances.find(
      (balance) => balance.token.contractAddress === zeroAddress || balance.token.symbol === "ETH"
    );

    if (!ethBalance?.amount || ethBalance.amount === 0n) {
      return null;
    }

    const ethAmount = formatEther(ethBalance.amount);
    return parseFloat(ethAmount).toFixed(4);
  };

  return (
    <div className="flex flex-col rounded-[30px] border border-black">
      <div className="flex items-center justify-center rounded-t-[30px] bg-black py-4 bg-[url('/bg/balance.jpg')] bg-cover bg-center">
        <div className="flex items-center gap-2">
          <div className="size-[60px] min-w-[60px] rounded-[20px] bg-white flex items-center justify-center">
            <EthereumIcon />
          </div>
          {hasIntMaxBalance && (
            <div className="size-[60px] min-w-[60px] rounded-[20px] bg-white flex items-center justify-center">
              <img src="/intmax.webp" alt="IntMax" className="w-8 h-8 object-contain" />
            </div>
          )}
        </div>
      </div>
      <div className="rounded-b-[30px] bg-white py-4 flex flex-col gap-[2px] justify-center items-center">
        <p className="text-sm text-black">{hasIntMaxBalance ? "Your balances" : "Your balance"}</p>
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

        {/* Error messages */}
        {error && !isLoading && (
          <p className="text-xs text-red-500 mt-1">Failed to fetch ETH balance data</p>
        )}

        {/* Loading message */}
        {isLoading && <p className="text-xs text-gray-500 mt-1">Loading...</p>}

        {/* Balance details when visible */}
        {isVisible && !isLoading && (
          <div className="flex flex-col items-center gap-1 mt-1">
            {balance && (
              <p className="text-xs text-gray-600">
                {parseFloat(balance).toFixed(4)} ETH
                {balanceUSD && ` (${formatBalance(balanceUSD)})`}
              </p>
            )}
            {hasIntMaxBalance && getIntMaxETHBalance() && (
              <p className="text-xs text-gray-600">
                {getIntMaxETHBalance()} ETH on IntMax
                {intMaxBalanceUSD && ` (${formatBalance(intMaxBalanceUSD)})`}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
