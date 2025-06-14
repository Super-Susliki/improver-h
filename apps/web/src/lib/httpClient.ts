import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

import { env } from "../env";

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

class HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL: baseURL ?? env.VITE_API_BASE_URL ?? "http://localhost:3000/api",
      timeout: 30000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // HTTP Methods
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const httpClient = new HttpClient();

export { HttpClient };

export interface ApiEndpoint<TParams = Record<string, unknown>, TResponse = unknown> {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string | ((params: TParams) => string);
  response: TResponse;
}
