import { httpClient } from "../httpClient";
import { API_ENDPOINTS } from "./endpoints";
import type { GrantBonusRequest, GrantBonusResponse, Store, UserStore } from "./types";

export class ApiService {
  static async getUserStores(): Promise<UserStore[]> {
    return httpClient.get<UserStore[]>(API_ENDPOINTS.getUserStores());
  }

  static async getMerchantStores(): Promise<Store[]> {
    return httpClient.get<Store[]>(API_ENDPOINTS.getMerchantStores());
  }

  static async grantBonus(request: GrantBonusRequest): Promise<GrantBonusResponse> {
    return httpClient.post<GrantBonusResponse>(API_ENDPOINTS.grantBonus, request);
  }
}
