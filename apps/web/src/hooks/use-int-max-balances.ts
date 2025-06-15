import { useQuery } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";
import { useAuth } from "@/contexts/AuthContext";

export const useIntMaxBalances = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);
  const { isFullyConnected, intMaxState } = useAuth();

  const { data, isLoading, error, refetch, isError, failureCount } = useQuery({
    queryKey: ["intmax-balances", intMaxClient?.address ?? null, intMaxState.address],
    queryFn: async () => {
      if (!intMaxClient || !isFullyConnected || !intMaxState.isLoggedIn || !intMaxState.address) {
        throw new Error("IntMax not ready");
      }

      try {
        const balances = await intMaxClient.fetchTokenBalances();
        return balances;
      } catch (error) {
        // Handle "User data not found" as empty data (new user)
        if (error instanceof Error && error.message.includes("User data not found")) {
          return { balances: [] };
        }
        throw error;
      }
    },
    enabled: Boolean(
      intMaxClient && isFullyConnected && intMaxState.isLoggedIn && intMaxState.address
    ),
    refetchInterval: 15000,
    retry: (failureCount, error) => {
      if (
        error?.message?.includes("User data not found") ||
        error?.message?.includes("IntMax not ready")
      ) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    data,
    isLoading,
    error,
    isError,
    failureCount,
    refetch,
  };
};
