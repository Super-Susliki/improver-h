import { formatEther, type Address } from "viem";
import { mainnet } from "viem/chains";
import { useBalance, useReadContract } from "wagmi";

import { AggregatorV3InterfaceAbi } from "@/abi/AggregatorV3Interface";
import { ETH_USD_PRICE_FEED } from "@/config/contracts";

interface EthBalanceHook {
  balance: string | null;
  balanceUSD: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useEthBalance = (address?: Address): EthBalanceHook => {
  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useBalance({ address });

  console.log({ balanceData, balanceError });

  const {
    data: roundData,
    isLoading: isPriceLoading,
    error: priceError,
  } = useReadContract({
    address: ETH_USD_PRICE_FEED,
    chainId: mainnet.id,
    abi: AggregatorV3InterfaceAbi,
    functionName: "latestRoundData",
  });

  console.log({ roundData, priceError });

  const balance = balanceData ? formatEther(balanceData.value) : null;

  // [roundId, answer, startedAt, updatedAt, answeredInRound]
  const ethPriceRaw = roundData
    ? (roundData as readonly [bigint, bigint, bigint, bigint, bigint])[1]
    : null;

  const balanceUSD =
    balance && ethPriceRaw ? ((parseFloat(balance) * Number(ethPriceRaw)) / 1e8).toFixed(2) : null;

  return {
    balance,
    balanceUSD,
    isLoading: isBalanceLoading || isPriceLoading,
    error: balanceError?.message ?? priceError?.message ?? null,
  };
};
