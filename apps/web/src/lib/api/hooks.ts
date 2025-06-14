import { useSignMessage } from "@privy-io/react-auth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiService } from "./services";

import { useAuth } from "@/contexts/AuthContext";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
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

export function useGrantBonus({ storeId, userId }: { storeId: string; userId: string }) {
  const queryClient = useQueryClient();
  const challengeId = generateUUID();

  const { privyUser } = useAuth();
  const message = `${challengeId}-${userId}-${storeId}-${privyUser?.id}`;

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
