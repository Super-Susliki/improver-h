import { httpClient } from "../httpClient";

import { API_ENDPOINTS } from "./endpoints";
import type {
  GrantBonusRequest,
  GrantBonusResponse,
  Store,
  UserStore,
  LoyaltyReward,
  LoyaltyStats,
  RewardRedemption,
  RedemptionStatus,
} from "./types";

export class ApiService {
  static async getUserStores(): Promise<UserStore[]> {
    return httpClient.get<UserStore[]>(API_ENDPOINTS.getUserStores());
  }

  static async getMerchantStores(): Promise<Store[]> {
    return httpClient.get<Store[]>(API_ENDPOINTS.getMerchantStores());
  }

  static async getStore(storeId: string): Promise<Store> {
    return httpClient.get<Store>(API_ENDPOINTS.getStore(storeId));
  }

  static async getStores(): Promise<Store[]> {
    return httpClient.get<Store[]>(API_ENDPOINTS.getAllStores());
  }

  static async grantBonus(request: GrantBonusRequest): Promise<GrantBonusResponse> {
    return httpClient.post<GrantBonusResponse>(
      API_ENDPOINTS.grantBonus(request.storeId),
      {
        userId: request.userId,
        bonusesAmount: request.bonusesAmount,
        signature: request.signature,
      },
      {
        headers: {
          "challenge-id": request.challengeId,
        },
      }
    );
  }

  static async getStoreRewards(storeId: string): Promise<LoyaltyReward[]> {
    return httpClient.get<LoyaltyReward[]>(API_ENDPOINTS.getStoreRewards(storeId));
  }

  static async getUserLoyaltyStats(storeId: string): Promise<LoyaltyStats> {
    return httpClient.get<LoyaltyStats>(API_ENDPOINTS.getUserLoyaltyStats(storeId));
  }

  static async redeemReward(storeId: string, rewardId: string): Promise<RewardRedemption> {
    return httpClient.post<RewardRedemption>(API_ENDPOINTS.redeemReward(storeId), {
      rewardId,
    });
  }

  static async getMerchantRedemptions(storeId: string): Promise<RewardRedemption[]> {
    return httpClient.get<RewardRedemption[]>(API_ENDPOINTS.getMerchantRedemptions(storeId));
  }

  static async updateRedemptionStatus(
    redemptionId: string,
    status: RedemptionStatus
  ): Promise<RewardRedemption> {
    return httpClient.put<RewardRedemption>(API_ENDPOINTS.updateRedemptionStatus(redemptionId), {
      status,
    });
  }

  static async getUserRedemptions(): Promise<RewardRedemption[]> {
    return httpClient.get<RewardRedemption[]>(API_ENDPOINTS.getUserRedemptions());
  }

  static async getUserStoreRedemptions(storeId: string): Promise<RewardRedemption[]> {
    return httpClient.get<RewardRedemption[]>(API_ENDPOINTS.getUserStoreRedemptions(storeId));
  }
}
