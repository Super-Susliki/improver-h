import { httpClient } from "../httpClient";
import { API_ENDPOINTS } from "./endpoints";
import type {
  GetUserStoresResponse,
  GetMerchantStoresResponse,
  GrantBonusRequest,
  GrantBonusResponse,
} from "./types";

export class ApiService {
  static async getUserStores(
    userAddress: string,
  ): Promise<GetUserStoresResponse> {
    return httpClient.get<GetUserStoresResponse>(
      API_ENDPOINTS.getUserStores(userAddress),
    );
  }

  static async getMerchantStores(
    merchantAddress: string,
  ): Promise<GetMerchantStoresResponse> {
    return httpClient.get<GetMerchantStoresResponse>(
      API_ENDPOINTS.getMerchantStores(merchantAddress),
    );
  }

  static async grantBonus(
    request: GrantBonusRequest,
  ): Promise<GrantBonusResponse> {
    return httpClient.post<GrantBonusResponse>(
      API_ENDPOINTS.grantBonus,
      request,
    );
  }
}
