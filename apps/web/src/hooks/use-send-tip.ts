import { useMutation } from "@tanstack/react-query";
import { TokenType } from "intmax2-client-sdk";
import { zeroAddress } from "viem";
import { mainnet } from "viem/chains";
import { useReadContract } from "wagmi";

import { AggregatorV3InterfaceAbi } from "@/abi/AggregatorV3Interface";
import { ETH_USD_PRICE_FEED } from "@/config/contracts";
import { useAuth } from "@/contexts/AuthContext";

interface UseSendTipParams {
  address: string;
  value: string;
}

export const useSendTip = () => {
  const { isFullyConnected, intMaxClient } = useAuth();
  const { data: roundData } = useReadContract({
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
        // Validation checks with meaningful error messages
        if (!address) {
          throw new Error("Recipient address is required");
        }

        if (!value) {
          throw new Error("Amount is required");
        }

        const number = parseFloat(value);
        if (isNaN(number) || number <= 0) {
          throw new Error("Please enter a valid amount");
        }

        if (!ethPriceRaw) {
          throw new Error("Unable to fetch current ETH price. Please try again.");
        }

        if (!intMaxClient) {
          throw new Error("IntMax client not initialized. Please refresh and try again.");
        }

        if (!isFullyConnected) {
          throw new Error("IntMax not connected. Please wait for connection to complete.");
        }

        // Calculate ETH amount
        const ethPrice = Number(ethPriceRaw) / 1e8;
        const eth = number / ethPrice;

        // Get token list
        const tokens = await intMaxClient.getTokensList();
        const ether = tokens.find((t) => t.contractAddress === zeroAddress);

        if (!ether) {
          throw new Error("ETH token not found. Please try again.");
        }

        // Execute deposit
        const deposit = await intMaxClient.deposit({
          address,
          amount: eth,
          token: {
            ...ether,
            tokenType: TokenType.NATIVE,
          },
        });

        return deposit;
      } catch (error) {
        // Re-throw with more user-friendly error messages
        if (error instanceof Error) {
          // Handle specific IntMax errors
          if (error.message.includes("User rejected")) {
            throw new Error("Transaction was cancelled by user");
          }
          if (error.message.includes("insufficient")) {
            throw new Error("Insufficient balance to complete this transaction");
          }
          if (error.message.includes("network")) {
            throw new Error("Network error. Please check your connection and try again");
          }

          // Use the original error message if it's already user-friendly
          throw error;
        }

        // Fallback for unknown errors
        throw new Error("An unexpected error occurred while processing your tip");
      }
    },
  });
};
