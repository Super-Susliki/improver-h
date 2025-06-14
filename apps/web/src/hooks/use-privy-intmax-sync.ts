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
}

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
      });
    }
  }, [authenticated, setIntMaxClient]);

  useEffect(() => {
    // eslint-disable-next-line complexity
    const initializeAndLogin = async () => {
      if (!authenticated || !ready || wallets.length === 0 || operationInProgress.current) {
        return;
      }

      if (intMaxClient && intMaxState.isLoggedIn) {
        return;
      }

      operationInProgress.current = true;
      setIntMaxState((prev) => ({ ...prev, isConnecting: true, error: null }));

      try {
        let client = intMaxClient;

        if (!client) {
          console.log("🔄 Initializing IntMax client...");
          const wallet = wallets[0];
          const provider = await wallet.getEthereumProvider();

          client = await IntMaxClient.init({
            environment: "testnet",
            provider: provider as any,
          });

          setIntMaxClient(client);
          console.log("✅ IntMax client initialized successfully");
        }

        if (!intMaxState.isLoggedIn) {
          console.log("🔄 Logging into IntMax...");
          const loginResult = await loginIntMax();

          if (loginResult?.address) {
            setIntMaxState({
              isLoggedIn: true,
              address: loginResult.address,
              isConnecting: false,
              error: null,
            });
            console.log("✅ IntMax login successful:", loginResult.address);
          } else {
            throw new Error("Login result missing address");
          }
        }
      } catch (error) {
        console.error("❌ IntMax connection failed:", error);

        let errorMessage = "Failed to connect to IntMax";
        let shouldRetry = true;

        // Handle specific error types
        if (error && typeof error === "object" && "code" in error) {
          if (error.code === 4001) {
            errorMessage = "User rejected the connection request";
            shouldRetry = false; // Don't retry user rejections
          }
        } else if (error instanceof Error && error.message.includes("400")) {
          errorMessage = "IntMax service temporarily unavailable";
        }

        setIntMaxState((prev) => ({
          ...prev,
          isConnecting: false,
          error: errorMessage,
        }));

        if (shouldRetry) {
          retryTimeoutRef.current = setTimeout(() => {
            operationInProgress.current = false;
            setIntMaxState((prev) => ({ ...prev, error: null }));
          }, 10000);
        }
      } finally {
        if (!retryTimeoutRef.current) {
          operationInProgress.current = false;
        }
      }
    };

    void initializeAndLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    authenticated,
    ready,
    wallets.length,
    intMaxClient,
    intMaxState.isLoggedIn,
    setIntMaxClient,
    loginIntMax,
  ]);

  const handlePrivyLogout = useCallback(async () => {
    try {
      if (intMaxClient) {
        await intMaxClient.logout();
      }
    } catch (error) {
      console.error("Failed to logout from IntMax:", error);
    } finally {
      setIntMaxClient(null);
      setIntMaxState({
        isLoggedIn: false,
        address: null,
        isConnecting: false,
        error: null,
      });
      operationInProgress.current = false;
      await logout();
    }
  }, [intMaxClient, setIntMaxClient, logout]);

  const retryIntMaxConnection = useCallback(async () => {
    if (!authenticated || !wallets.length) return;

    // Clear any existing retry timeout
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }

    // Reset state to trigger reconnection
    operationInProgress.current = false;
    setIntMaxClient(null);
    setIntMaxState({
      isLoggedIn: false,
      address: null,
      isConnecting: false,
      error: null,
    });
  }, [authenticated, wallets.length, setIntMaxClient]);

  const isFullyConnected = authenticated && intMaxState.isLoggedIn;
  const isConnecting =
    (authenticated && !intMaxState.isLoggedIn && intMaxState.isConnecting) || isLoginIntMaxPending;
  const hasError = intMaxState.error !== null;

  return {
    // Privy state
    privyReady: ready,
    privyAuthenticated: authenticated,
    privyUser: user,
    privyLogin: login,
    privyLogout: handlePrivyLogout,

    // IntMax state
    intMaxState,
    intMaxClient,

    // Combined state
    isFullyConnected,
    isConnecting,
    hasError,

    // Actions
    retryIntMaxConnection,
  };
};
