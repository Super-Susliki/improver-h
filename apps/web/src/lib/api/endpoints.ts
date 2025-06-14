export const API_ENDPOINTS = {
  getUserStores: (userAddress: string) => `/users/${userAddress}/stores`,

  getMerchantStores: (merchantAddress: string) =>
    `/merchants/${merchantAddress}/stores`,

  grantBonus: "/bonuses/grant",
} as const;
