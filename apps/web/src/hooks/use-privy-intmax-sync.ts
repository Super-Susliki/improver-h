import { usePrivy, useWallets } from "@privy-io/react-auth";
import { IntMaxClient } from "intmax2-client-sdk";
import { useCallback, useEffect, useRef, useState } from "react";

import { useIntMaxClientStore } from "./use-int-max-client";
import { useIntMaxLogin } from "./use-int-max-login";

interface IntMaxState {
  isLoggedIn: boolean;
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  retryCount: number;
}

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 5000;

export const usePrivyIntMaxSync = () => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const { wallets } = useWallets();
  const { intMaxClient, setIntMaxClient } = useIntMaxClientStore();
  const { login: loginIntMax, isPending: isLoginIntMaxPending } = useIntMaxLogin();

  const [intMaxState, setIntMaxState] = useState<IntMaxState>({
    isLoggedIn: false,
    address: null,
    isConnecting: false,
    error: null,
    retryCount: 0,
  });

  const operationInProgress = useRef(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!authenticated) {
      operationInProgress.current = false;
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      setIntMaxClient(null);
      setIntMaxState({
        isLoggedIn: false,
        address: null,
        isConnecting: false,
        error: null,
        retryCount: 0,
      });
    }
  }, [authenticated, setIntMaxClient]);

  const initializeIntMax = useCallback(async () => {
    if (!authenticated || !ready || wallets.length === 0) {
      return { success: false, error: "Prerequisites not met" };
    }

    try {
      const wallet = wallets[0];
      const provider = await wallet.getEthereumProvider();
      const client = await IntMaxClient.init({
        environment: "testnet",
        provider: provider as any,
      });
      setIntMaxClient(client);
      return { success: true, client };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }, [authenticated, ready, wallets, setIntMaxClient]);

  const loginToIntMax = useCallback(async () => {
    try {
      const loginResult = await loginIntMax();
      if (loginResult?.address) {
        return { success: true, address: loginResult.address };
      } else {
        throw new Error("Login result missing address");
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Login failed" };
    }
  }, [loginIntMax]);

  const warmUpIntMaxClient = useCallback(async (client: any) => {
    try {
      await client.fetchTokenBalances();
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Warm-up failed" };
    }
  }, []);

  const performFullConnection = useCallback(async () => {
    if (operationInProgress.current) return;

    operationInProgress.current = true;
    setIntMaxState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      let client = intMaxClient;
      if (!client) {
        const initResult = await initializeIntMax();
        if (!initResult.success) {
          throw new Error(initResult.error || "Failed to initialize IntMax client");
        }
        client = initResult.client!;
      }

      if (!intMaxState.isLoggedIn) {
        const loginResult = await loginToIntMax();
        if (!loginResult.success) {
          throw new Error(loginResult.error || "Failed to login to IntMax");
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        await warmUpIntMaxClient(client);

        setIntMaxState({
          isLoggedIn: true,
          address: loginResult.address!,
          isConnecting: false,
          error: null,
          retryCount: 0,
        });
      }
    } catch (error) {
      let errorMessage = "Failed to connect to IntMax";
      let shouldRetry = true;

      if (error && typeof error === "object" && "code" in error) {
        if (error.code === 4001) {
          errorMessage = "User rejected the connection request";
          shouldRetry = false;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      const newRetryCount = intMaxState.retryCount + 1;
      setIntMaxState((prev) => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
        retryCount: newRetryCount,
      }));

      if (shouldRetry && newRetryCount < MAX_RETRY_ATTEMPTS) {
        retryTimeoutRef.current = setTimeout(() => {
          operationInProgress.current = false;
          setIntMaxState((prev) => ({ ...prev, error: null }));
        }, RETRY_DELAY);
      }
    } finally {
      if (!retryTimeoutRef.current) {
        operationInProgress.current = false;
      }
    }
  }, [
    intMaxClient,
    intMaxState.isLoggedIn,
    intMaxState.retryCount,
    initializeIntMax,
    loginToIntMax,
    warmUpIntMaxClient,
  ]);

  useEffect(() => {
    const shouldConnect =
      authenticated &&
      ready &&
      wallets.length > 0 &&
      !intMaxState.isLoggedIn &&
      !operationInProgress.current &&
      !intMaxState.isConnecting;

    if (shouldConnect) {
      void performFullConnection();
    }
  }, [
    authenticated,
    ready,
    wallets.length,
    intMaxState.isLoggedIn,
    intMaxState.isConnecting,
    performFullConnection,
  ]);

  const handlePrivyLogout = useCallback(async () => {
    try {
      if (intMaxClient) {
        await intMaxClient.logout();
      }
    } catch (error) {
      // Ignore logout errors
    } finally {
      setIntMaxClient(null);
      setIntMaxState({
        isLoggedIn: false,
        address: null,
        isConnecting: false,
        error: null,
        retryCount: 0,
      });
      operationInProgress.current = false;
      await logout();
    }
  }, [intMaxClient, setIntMaxClient, logout]);

  const retryIntMaxConnection = useCallback(async () => {
    if (!authenticated || !wallets.length) return;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    operationInProgress.current = false;
    setIntMaxClient(null);
    setIntMaxState({
      isLoggedIn: false,
      address: null,
      isConnecting: false,
      error: null,
      retryCount: 0,
    });
  }, [authenticated, wallets.length, setIntMaxClient]);

  const isFullyConnected = authenticated && intMaxState.isLoggedIn && intMaxClient;
  const isConnecting =
    (authenticated && !intMaxState.isLoggedIn && intMaxState.isConnecting) || isLoginIntMaxPending;
  const hasError = intMaxState.error !== null;
  const canRetry = hasError && intMaxState.retryCount < MAX_RETRY_ATTEMPTS;

  return {
    privyReady: ready,
    privyAuthenticated: authenticated,
    privyUser: user,
    privyLogin: login,
    privyLogout: handlePrivyLogout,
    intMaxState,
    intMaxClient,
    isFullyConnected,
    isConnecting,
    hasError,
    canRetry,
    retryIntMaxConnection,
  };
};
