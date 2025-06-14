import { useMutation } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
import { useReadContract } from "wagmi";

import { AggregatorV3InterfaceAbi } from "@/abi/AggregatorV3Interface";
import { ETH_USD_PRICE_FEED } from "@/config/contracts";
import { useAuth } from "@/contexts/AuthContext";
import { zeroAddress } from "viem";
import { TokenType } from "intmax2-client-sdk";

interface UseSendTipParams {
  address: string;
  value: string;
}

export const useSendTip = () => {
  const { isFullyConnected, intMaxClient } = useAuth();
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

  const ethPriceRaw = roundData
    ? (roundData as readonly [bigint, bigint, bigint, bigint, bigint])[1]
    : null;

  return useMutation({
    mutationFn: async ({ address, value }: UseSendTipParams) => {
      try {
        const number = parseFloat(value);
        if (
          !address ||
          !number ||
          !ethPriceRaw ||
          !intMaxClient ||
          !isFullyConnected
        )
          return;

        const ethPrice = Number(ethPriceRaw) / 1e8;
        const eth = number / ethPrice;

        const tokens = await intMaxClient.getTokensList();
        const ether = tokens.find((t) => t.contractAddress === zeroAddress);
        if (!ether) return;

        const deposit = await intMaxClient.deposit({
            address,
            amount: eth,
            token: {
                ...ether,
                tokenType: TokenType.NATIVE,
            }
        });

        return deposit;
      } catch (e) {}
    },
  });
};
