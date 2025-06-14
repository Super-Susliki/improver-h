export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MERCHANT_USER = "MERCHANT_USER",
}

export interface User {
  id: string;
  email?: string;
  walletAddress: string;
  roles: Role[];
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStore {
  userId: string;
  storeId: string;
  bonusesAmount: number;
  createdAt: string;
  updatedAt: string;
  user?: User;
  store?: Store;
}

export interface MerchantSignature {
  id: string;
  userId: string;
  storeId: string;
  signature: string;
  createdAt: string;
  updatedAt: string;
}

// API Request/Response types
export interface UserStoreWithDetails extends UserStore {
  store: Store;
}

export interface GetUserStoresResponse {
  stores: UserStoreWithDetails[];
  totalBonuses: number;
}

export interface GetMerchantStoresResponse {
  stores: Store[];
}

export interface GrantBonusRequest {
  userAddress: string;
  storeId: string;
  merchantSignature: string;
  amount?: number; // Optional, defaults to 1
}

export interface GrantBonusResponse {
  success: boolean;
  newBonusAmount: number;
  transactionId?: string;
}

// Common API response wrapper
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

// Error types
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: unknown;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  message: string;
  code: string;
  statusCode: number;
  timestamp: string;
  path: string;
  errors?: ValidationError[];
}
