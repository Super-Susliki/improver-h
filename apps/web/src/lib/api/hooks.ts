import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "./services";
import type { GrantBonusRequest } from "./types";
import type { Address } from "viem";

export function useUserStores(userAddress?: string) {
  return useQuery({
    queryKey: ["userStores", userAddress],
    queryFn: () => ApiService.getUserStores(userAddress as Address),
    enabled: !!userAddress,
  });
}

export function useMerchantStores(merchantAddress?: string) {
  return useQuery({
    queryKey: ["merchantStores", merchantAddress],
    queryFn: () => ApiService.getMerchantStores(merchantAddress as Address),
    enabled: !!merchantAddress,
  });
}

export function useGrantBonus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: GrantBonusRequest) => ApiService.grantBonus(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["userStores", variables.userAddress],
      });
    },
  });
}
