export const API_ENDPOINTS = {
  getUserStores: () => `/users/me/stores`,

  getMerchantStores: () => `/merchants/me/stores`,

  getStore: (storeId: string) => `/stores/${storeId}`,

  grantBonus: (storeId: string) => `/merchants/me/stores/${storeId}/bonuses`,
} as const;
