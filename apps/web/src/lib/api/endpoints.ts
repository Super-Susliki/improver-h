export const API_ENDPOINTS = {
  getUserStores: () => `/users/me/stores`,

  getMerchantStores: () => `/merchants/me/stores`,

  getStore: (storeId: string) => `/stores/${storeId}`,

  getAllStores: () => `/stores`,

  grantBonus: (storeId: string) => `/merchants/me/stores/${storeId}/bonuses`,

  // Loyalty endpoints
  getStoreRewards: (storeId: string) => `/loyalty/stores/${storeId}/rewards`,

  getUserLoyaltyStats: (storeId: string) => `/loyalty/stores/${storeId}/my-stats`,

  redeemReward: (storeId: string) => `/loyalty/stores/${storeId}/redeem`,

  getUserRedemptions: () => `/loyalty/users/me/redemptions`,

  getUserStoreRedemptions: (storeId: string) => `/loyalty/stores/${storeId}/my-redemptions`,

  getMerchantRedemptions: (storeId: string) => `/loyalty/merchants/stores/${storeId}/redemptions`,

  updateRedemptionStatus: (redemptionId: string) => `/loyalty/redemptions/${redemptionId}/status`,
} as const;
