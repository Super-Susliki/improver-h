export const API_ENDPOINTS = {
  getUserStores: () => `/users/me/stores`,

  getMerchantStores: () => `/merchants/me/stores`,

  grantBonus: (storeId: string) => `/merchants/me/stores/${storeId}/bonuses`,
} as const;
