import { useQuery } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";
import { useAuth } from "@/contexts/AuthContext";

export const useIntMaxBalances = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);
  const { isFullyConnected, intMaxState } = useAuth();

  return useQuery({
    queryKey: ["intmax-balances", intMaxState.address],
    queryFn: async () => {
      if (!intMaxClient) {
        throw new Error("IntMax client not available");
      }

      const balances = await intMaxClient.fetchTokenBalances();
      return balances;
    },
    enabled: Boolean(isFullyConnected && intMaxClient && intMaxState.isLoggedIn),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // 1 minute
  });
};
