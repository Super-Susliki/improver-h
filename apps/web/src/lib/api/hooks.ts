import { useSignMessage } from "@privy-io/react-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiService } from "./services";
import { RedemptionStatus } from "./types";

import { useAuth } from "@/contexts/AuthContext";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function useStores() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: () => ApiService.getStores(),
  });
}

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

export function useStore(storeId: string) {
  return useQuery({
    queryKey: ["store", storeId],
    queryFn: () => ApiService.getStore(storeId),
    enabled: !!storeId,
  });
}

export function useGrantBonus({ storeId, userId }: { storeId: string; userId: string }) {
  const queryClient = useQueryClient();
  const challengeId = generateUUID();

  const { privyUser } = useAuth();
  const message = `${challengeId}-${userId}-${storeId}-${privyUser?.id ?? ""}`;

  const { signMessage } = useSignMessage();

  return useMutation({
    mutationFn: async () => {
      const { signature } = await signMessage({ message });

      return ApiService.grantBonus({
        userId,
        storeId,
        bonusesAmount: 1,
        signature,
        challengeId,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["useGrantBonus", storeId, userId],
      });
    },
  });
}

export function useStoreRewards(storeId: string) {
  return useQuery({
    queryKey: ["storeRewards", storeId],
    queryFn: () => ApiService.getStoreRewards(storeId),
    enabled: !!storeId,
  });
}

export function useUserLoyaltyStats(storeId: string) {
  return useQuery({
    queryKey: ["userLoyaltyStats", storeId],
    queryFn: () => ApiService.getUserLoyaltyStats(storeId),
    enabled: !!storeId,
  });
}

export function useRedeemReward(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (rewardId: string) => ApiService.redeemReward(storeId, rewardId),
    onSuccess: () => {
      // Invalidate relevant queries
      void queryClient.invalidateQueries({ queryKey: ["userLoyaltyStats", storeId] });
      void queryClient.invalidateQueries({ queryKey: ["storeRewards", storeId] });
      void queryClient.invalidateQueries({ queryKey: ["userRedemptions"] });
      void queryClient.invalidateQueries({ queryKey: ["userStoreRedemptions", storeId] });
      void queryClient.invalidateQueries({ queryKey: ["userStores"] });
    },
  });
}

export function useMerchantRedemptions(storeId: string) {
  return useQuery({
    queryKey: ["merchantRedemptions", storeId],
    queryFn: () => ApiService.getMerchantRedemptions(storeId),
    enabled: !!storeId,
  });
}

export function useUpdateRedemptionStatus(storeId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ redemptionId, status }: { redemptionId: string; status: RedemptionStatus }) =>
      ApiService.updateRedemptionStatus(redemptionId, status),
    onSuccess: () => {
      // Invalidate relevant queries
      void queryClient.invalidateQueries({ queryKey: ["merchantRedemptions", storeId] });
    },
  });
}

export function useUserRedemptions() {
  return useQuery({
    queryKey: ["userRedemptions"],
    queryFn: () => ApiService.getUserRedemptions(),
  });
}

export function useUserStoreRedemptions(storeId: string) {
  return useQuery({
    queryKey: ["userStoreRedemptions", storeId],
    queryFn: () => ApiService.getUserStoreRedemptions(storeId),
    enabled: !!storeId,
  });
}
