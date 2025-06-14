import { useQuery } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";

export const useIntMaxBalances = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);

  const { data, isLoading, error } = useQuery({
    queryKey: ["intmax-balances", intMaxClient?.address ?? null],
    queryFn: async () => {
      if (!intMaxClient) return [];
      console.log("fetching balances");
      const balances = await intMaxClient.fetchTokenBalances();
      console.log("balances", balances);
      return balances;
    },
    enabled: !!intMaxClient,
    refetchInterval: 10000,
  });

  return {
    data,
    isLoading,
    error,
  };
};
