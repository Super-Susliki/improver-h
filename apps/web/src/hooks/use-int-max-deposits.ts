import { useQuery } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";

export const useIntMaxDeposits = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);

  const { data, isLoading, error } = useQuery({
    queryKey: ["intmax-deposits", intMaxClient?.address ?? null],
    queryFn: async () => {
      if (!intMaxClient?.address) return [];
      console.log("fetching deposits");
      const deposits = await intMaxClient.fetchDeposits({ sortBy: "timestamp", sortOrder: "desc" });
      console.log("deposits", deposits);
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
