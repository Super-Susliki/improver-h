import { mainnet } from "viem/chains";
import { useReadContract } from "wagmi";

import { AggregatorV3InterfaceAbi } from "@/abi/AggregatorV3Interface";
import { ETH_USD_PRICE_FEED } from "@/config/contracts";

interface EthPriceHook {
  ethPriceUSD: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useEthPrice = (): EthPriceHook => {
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

  // [roundId, answer, startedAt, updatedAt, answeredInRound]
  const ethPriceRaw = roundData
    ? (roundData as readonly [bigint, bigint, bigint, bigint, bigint])[1]
    : null;

  const ethPriceUSD = ethPriceRaw ? Number(ethPriceRaw) / 1e8 : null; // Chainlink price feeds have 8 decimals

  return {
    ethPriceUSD,
    isLoading: isPriceLoading,
    error: priceError?.message ?? null,
  };
};
