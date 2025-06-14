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

  description?: string | null;

  logoUrl?: string | null;

  bannerUrl?: string | null;

  websiteUrl?: string | null;

  createdAt: Date;

  updatedAt: Date;
}

export interface UserStore extends Store {
  bonusesAmount: number;
}

export interface GrantBonusRequest {
  userId: string;
  storeId: string;
  bonusesAmount: number;
  signature: string;
  challengeId: string;
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

export enum RewardType {
  DISCOUNT_PERCENTAGE = "DISCOUNT_PERCENTAGE",
  DISCOUNT_FIXED = "DISCOUNT_FIXED",
  FREE_ITEM = "FREE_ITEM",
  SPECIAL_OFFER = "SPECIAL_OFFER",
}

export enum RedemptionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  USED = "USED",
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description?: string;
  type: RewardType;
  value: number;
  pointsRequired: number;
  maxRedemptions: number | null;
  currentRedemptions: number;
  isActive: boolean;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RewardRedemption {
  id: string;
  userId: string;
  storeId: string;
  rewardId: string;
  pointsUsed: number;
  status: RedemptionStatus;
  createdAt: string;
  updatedAt: string;
  reward: LoyaltyReward;
  store?: Store;
}

export interface LoyaltyStats {
  totalPoints: number;
  availableRewards: LoyaltyReward[];
  recentRedemptions: RewardRedemption[];
  nextReward?: {
    reward: LoyaltyReward;
    pointsNeeded: number;
  };
}
