import { useBalance, useReadContract, useChainId } from "wagmi";
import { formatEther, type Address } from "viem";
import { AggregatorV3InterfaceAbi } from "@/abi/AggregatorV3Interface";
import { ETH_USD_PRICE_FEEDS } from "@/config/contracts";

interface EthBalanceHook {
  balance: string | null;
  balanceUSD: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useEthBalance = (address?: Address): EthBalanceHook => {
  const chainId = useChainId();

  const {
    data: balanceData,
    isLoading: isBalanceLoading,
    error: balanceError,
  } = useBalance({ address });

  const priceFeedAddress = ETH_USD_PRICE_FEEDS[chainId as keyof typeof ETH_USD_PRICE_FEEDS];

  const {
    data: roundData,
    isLoading: isPriceLoading,
    error: priceError,
  } = useReadContract({
    address: priceFeedAddress,
    abi: AggregatorV3InterfaceAbi,
    functionName: "latestRoundData",
    query: {
      enabled: !!priceFeedAddress,
    },
  });

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
    error: balanceError?.message || priceError?.message || null,
  };
};
