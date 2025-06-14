import { useQuery } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";

export const useIntMaxDeposits = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);

  const { data, isLoading, error } = useQuery({
    queryKey: ["intmax-deposits", intMaxClient?.address ?? null],
    queryFn: async () => {
      if (!intMaxClient?.address) return [];
      const deposits = await intMaxClient.fetchDeposits({ sortBy: "timestamp", sortOrder: "desc" });
      return deposits;
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
