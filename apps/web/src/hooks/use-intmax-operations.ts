import { useFundWallet } from "@privy-io/react-auth";
import { TokenType, type PrepareDepositTransactionRequest } from "intmax2-client-sdk";
import { useMutation } from "@tanstack/react-query";
import { zeroAddress } from "viem";
import { SUPPORTED_CHAIN } from "../lib/chains";
import { useAuth } from "@/contexts/AuthContext";

export const useIntMaxOperations = () => {
  const { fundWallet } = useFundWallet();
  const { privyUser, intMaxClient, isFullyConnected } = useAuth();

  const fundWalletMutation = useMutation({
    mutationFn: async ({ amount }: { amount: string }) => {
      if (!privyUser?.wallet?.address) {
        throw new Error("No wallet address available");
      }

      return fundWallet(privyUser.wallet.address, {
        asset: "native-currency",
        amount,
        chain: SUPPORTED_CHAIN,
      });
    },
  });

  const depositMutation = useMutation({
    mutationFn: async ({ amount }: { amount: string }) => {
      if (!intMaxClient) {
        throw new Error("IntMax client not initialized");
      }

      const listTokens = await intMaxClient.getTokensList();
      const ether = listTokens.find((token) => token.contractAddress === zeroAddress);

      if (!ether) {
        throw new Error("ETH token not found");
      }

      const params: PrepareDepositTransactionRequest = {
        address: intMaxClient.address,
        token: {
          ...ether,
          tokenType: TokenType.NATIVE,
        },
        // @ts-expect-error - TODO: verify the correct type for amount
        amount,
      };

      return await intMaxClient.deposit(params);
    },
  });

  const fundWalletWithAmount = async (amount: string = "0.001") => {
    return fundWalletMutation.mutateAsync({ amount });
  };

  const depositToIntMax = async (amount: string = "0.01") => {
    if (!isFullyConnected) {
      throw new Error("IntMax is not connected. Please wait for connection to complete.");
    }
    return depositMutation.mutateAsync({ amount });
  };

  return {
    // Actions
    fundWalletWithAmount,
    depositToIntMax,

    // States
    isFundingWallet: fundWalletMutation.isPending,
    isDepositing: depositMutation.isPending,

    // Errors
    fundWalletError: fundWalletMutation.error,
    depositError: depositMutation.error,

    // Status
    canPerformOperations: isFullyConnected,
    isIntMaxReady: isFullyConnected,
  };
};
