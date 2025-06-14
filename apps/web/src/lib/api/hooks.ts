import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "./services";
import type { GrantBonusRequest } from "./types";

export function useUserStores() {
  return useQuery({
    queryKey: ["userStores"],
    queryFn: () => ApiService.getUserStores(),
  });
}

export function useMerchantStores() {
  return useQuery({
    queryKey: ["merchantStores"],
    queryFn: () => ApiService.getMerchantStores(),
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
