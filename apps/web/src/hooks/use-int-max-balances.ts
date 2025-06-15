import { useQuery } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";
import { useAuth } from "@/contexts/AuthContext";

export const useIntMaxBalances = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);
  const { isFullyConnected, intMaxState } = useAuth();

  console.log("💰 [IntMax-Balances] Hook state:", {
    intMaxClientExists: !!intMaxClient,
    intMaxClientAddress: intMaxClient?.address || "N/A",
    isFullyConnected,
    intMaxStateLoggedIn: intMaxState.isLoggedIn,
    intMaxStateAddress: intMaxState.address || "N/A",
    intMaxStateError: intMaxState.error || "N/A",
    intMaxStateConnecting: intMaxState.isConnecting,
    timestamp: new Date().toISOString(),
  });

  const { data, isLoading, error, refetch, isError, failureCount } = useQuery({
    queryKey: ["intmax-balances", intMaxClient?.address ?? null, intMaxState.address],
    queryFn: async () => {
      console.log("📊 [IntMax-Balances] Starting balance fetch...");
      console.log("🔍 [IntMax-Balances] Prerequisites check:", {
        intMaxClientExists: !!intMaxClient,
        isFullyConnected,
        intMaxStateLoggedIn: intMaxState.isLoggedIn,
        intMaxStateAddress: intMaxState.address,
      });

      if (!intMaxClient || !isFullyConnected || !intMaxState.isLoggedIn || !intMaxState.address) {
        const errorMsg = "IntMax not ready";
        console.error("❌ [IntMax-Balances] Prerequisites not met:", {
          intMaxClientExists: !!intMaxClient,
          isFullyConnected,
          intMaxStateLoggedIn: intMaxState.isLoggedIn,
          intMaxStateAddress: intMaxState.address,
          errorMsg,
        });
        throw new Error(errorMsg);
      }

      try {
        console.log("📞 [IntMax-Balances] Calling fetchTokenBalances...");
        const fetchStartTime = Date.now();

        const balances = await intMaxClient.fetchTokenBalances();

        const fetchEndTime = Date.now();
        console.log("✅ [IntMax-Balances] fetchTokenBalances completed successfully!", {
          fetchDurationMs: fetchEndTime - fetchStartTime,
          balancesExists: !!balances,
          balancesType: typeof balances,
          balancesKeys: balances && typeof balances === "object" ? Object.keys(balances) : "N/A",
          balancesLength: balances?.balances ? balances.balances.length : "N/A",
          balancesRaw: balances,
          timestamp: new Date().toISOString(),
        });

        return balances;
      } catch (error) {
        console.error("❌ [IntMax-Balances] fetchTokenBalances failed:", {
          error: error instanceof Error ? error.message : "Unknown error",
          errorType: typeof error,
          errorName: error instanceof Error ? error.name : "N/A",
          errorStack: error instanceof Error ? error.stack : null,
          timestamp: new Date().toISOString(),
        });

        // Handle "User data not found" as empty data (new user)
        if (error instanceof Error && error.message.includes("User data not found")) {
          console.log("ℹ️ [IntMax-Balances] User data not found, returning empty balances");
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
      console.log("🔄 [IntMax-Balances] Retry logic triggered:", {
        failureCount,
        errorMessage: error?.message || "N/A",
        willRetry: !(
          error?.message?.includes("User data not found") ||
          error?.message?.includes("IntMax not ready") ||
          failureCount >= 3
        ),
      });

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

  console.log("📈 [IntMax-Balances] Query result:", {
    dataExists: !!data,
    isLoading,
    isError,
    errorMessage: error?.message || "N/A",
    failureCount,
    timestamp: new Date().toISOString(),
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
