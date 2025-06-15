import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "intmax2-client-sdk";

import { useIntMaxClientStore } from "./use-int-max-client";
import { useAuth } from "@/contexts/AuthContext";

export const useIntMaxDeposits = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);
  const { isFullyConnected, intMaxState } = useAuth();

  const { data, isLoading, error, refetch, isError, failureCount } = useQuery({
    queryKey: ["intmax-deposits", intMaxClient?.address ?? null, intMaxState.address],
    queryFn: async (): Promise<Transaction[]> => {
      if (!intMaxClient || !isFullyConnected || !intMaxState.isLoggedIn || !intMaxState.address) {
        throw new Error("IntMax not ready");
      }

      try {
        const deposits = await intMaxClient.fetchDeposits({
          sortBy: "timestamp",
          sortOrder: "desc",
        });
        return deposits || [];
      } catch (error) {
        // Handle "User data not found" as empty data (new user)
        if (error instanceof Error && error.message.includes("User data not found")) {
          return [];
        }
        throw error;
      }
    },
    enabled: Boolean(
      intMaxClient && isFullyConnected && intMaxState.isLoggedIn && intMaxState.address
    ),
    refetchInterval: 30000,
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
