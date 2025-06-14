export const API_ENDPOINTS = {
  getUserStores: () => `/users/me/stores`,

  getMerchantStores: () => `/merchants/me/stores`,

  grantBonus: "/bonuses/grant",
} as const;
