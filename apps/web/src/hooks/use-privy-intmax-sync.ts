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
    console.log("🚀 [IntMax-Init] Starting IntMax client initialization...");
    console.log("🔍 [IntMax-Init] Prerequisites check:", {
      authenticated,
      ready,
      walletsCount: wallets.length,
      userAgent: navigator.userAgent,
      hostname: window.location.hostname,
      timestamp: new Date().toISOString(),
    });

    if (!authenticated || !ready || wallets.length === 0) {
      console.warn("❌ [IntMax-Init] Prerequisites not met - aborting initialization");
      return { success: false, error: "Prerequisites not met" };
    }

    try {
      console.log("🔗 [IntMax-Init] Getting wallet provider...");
      const wallet = wallets[0];
      console.log("🔗 [IntMax-Init] Wallet info:", {
        walletType: wallet.walletClientType,
        address: wallet.address,
      });

      const provider = await wallet.getEthereumProvider();
      console.log("✅ [IntMax-Init] Provider obtained successfully");

      console.log("🌐 [IntMax-Init] Initializing IntMax client with environment: testnet");
      const startTime = Date.now();

      const client = await IntMaxClient.init({
        environment: "testnet",
        provider: provider as any,
      });

      const initTime = Date.now() - startTime;
      console.log("✅ [IntMax-Init] IntMax client initialized successfully!", {
        initTimeMs: initTime,
        clientAddress: client?.address || "unknown",
      });

      setIntMaxClient(client);
      return { success: true, client };
    } catch (error) {
      console.error("❌ [IntMax-Init] Failed to initialize IntMax client:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : null,
        hostname: window.location.hostname,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      });
      return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
  }, [authenticated, ready, wallets, setIntMaxClient]);

  const loginToIntMax = useCallback(async () => {
    console.log("🔐 [IntMax-Login] Starting IntMax login process...");
    console.log("🔍 [IntMax-Login] Pre-login check:", {
      intMaxClientExists: !!intMaxClient,
      privyAuthenticated: authenticated,
      privyReady: ready,
      privyUserExists: !!user,
      privyUserId: user?.id || "N/A",
      walletCount: wallets.length,
      timestamp: new Date().toISOString(),
    });

    try {
      console.log("📞 [IntMax-Login] Calling loginIntMax function...");
      const loginStartTime = Date.now();

      const loginResult = await loginIntMax();

      const loginTime = Date.now() - loginStartTime;
      console.log("✅ [IntMax-Login] loginIntMax completed successfully!", {
        loginTimeMs: loginTime,
        resultExists: !!loginResult,
        resultAddress: loginResult?.address || "N/A",
        timestamp: new Date().toISOString(),
      });

      if (loginResult?.address) {
        console.log("✅ [IntMax-Login] Login result contains address, returning success", {
          address: loginResult.address,
        });
        return { success: true, address: loginResult.address };
      } else {
        console.error("❌ [IntMax-Login] Login result missing address:", {
          loginResult,
          loginResultType: typeof loginResult,
          loginResultKeys: loginResult ? Object.keys(loginResult) : "N/A",
        });
        throw new Error("Login result missing address");
      }
    } catch (error) {
      console.error("❌ [IntMax-Login] Login failed with error:", {
        error: error instanceof Error ? error.message : "Unknown error",
        errorType: typeof error,
        errorName: error instanceof Error ? error.name : "N/A",
        errorStack: error instanceof Error ? error.stack : null,
        privyUserExists: !!user,
        privyUserId: user?.id || "N/A",
        intMaxClientExists: !!intMaxClient,
        timestamp: new Date().toISOString(),
      });
      return { success: false, error: error instanceof Error ? error.message : "Login failed" };
    }
  }, [loginIntMax, intMaxClient, authenticated, ready, user, wallets]);

  const warmUpIntMaxClient = useCallback(async (client: any) => {
    console.log("🔥 [IntMax-Warmup] Starting client warm-up...");
    try {
      console.log("📊 [IntMax-Warmup] Fetching token balances for warm-up...");
      const warmupStartTime = Date.now();

      await client.fetchTokenBalances();

      const warmupTime = Date.now() - warmupStartTime;
      console.log("✅ [IntMax-Warmup] Client warm-up completed successfully!", {
        warmupTimeMs: warmupTime,
      });
      return { success: true };
    } catch (error) {
      console.error("❌ [IntMax-Warmup] Warm-up failed:", {
        error: error instanceof Error ? error.message : "Unknown error",
        errorStack: error instanceof Error ? error.stack : null,
        timestamp: new Date().toISOString(),
      });
      return { success: false, error: error instanceof Error ? error.message : "Warm-up failed" };
    }
  }, []);

  const performFullConnection = useCallback(async () => {
    if (operationInProgress.current) return;

    operationInProgress.current = true;
    setIntMaxState((prev) => ({ ...prev, isConnecting: true, error: null }));

    console.log("🚀 [IntMax-FullConn] Starting full connection process...");
    console.log("🔍 [IntMax-FullConn] Connection state:", {
      operationInProgress: operationInProgress.current,
      intMaxClientExists: !!intMaxClient,
      intMaxStateLoggedIn: intMaxState.isLoggedIn,
      retryCount: intMaxState.retryCount,
      timestamp: new Date().toISOString(),
    });

    try {
      let client = intMaxClient;
      if (!client) {
        console.log("⚡ [IntMax-FullConn] No existing client, initializing...");
        const initResult = await initializeIntMax();
        if (!initResult.success) {
          throw new Error(initResult.error || "Failed to initialize IntMax client");
        }
        client = initResult.client!;
        console.log("✅ [IntMax-FullConn] Client initialization completed");
      } else {
        console.log("✅ [IntMax-FullConn] Using existing client");
      }

      if (!intMaxState.isLoggedIn) {
        console.log("🔐 [IntMax-FullConn] Not logged in, attempting login...");
        const loginResult = await loginToIntMax();
        if (!loginResult.success) {
          throw new Error(loginResult.error || "Failed to login to IntMax");
        }
        console.log("✅ [IntMax-FullConn] Login completed successfully");

        console.log("⏳ [IntMax-FullConn] Waiting 1 second before warm-up...");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("🔥 [IntMax-FullConn] Starting client warm-up...");
        await warmUpIntMaxClient(client);

        console.log("✅ [IntMax-FullConn] Setting final state...");
        setIntMaxState({
          isLoggedIn: true,
          address: loginResult.address!,
          isConnecting: false,
          error: null,
          retryCount: 0,
        });
        console.log("🎉 [IntMax-FullConn] Full connection process completed successfully!");
      }
    } catch (error) {
      let errorMessage = "Failed to connect to IntMax";
      let shouldRetry = true;

      console.error("❌ [IntMax-FullConn] Connection failed:", {
        error: error instanceof Error ? error.message : "Unknown error",
        errorType: typeof error,
        errorCode: (error as any)?.code || "N/A",
        errorStack: error instanceof Error ? error.stack : null,
        timestamp: new Date().toISOString(),
      });

      if (error && typeof error === "object" && "code" in error) {
        if (error.code === 4001) {
          errorMessage = "User rejected the connection request";
          shouldRetry = false;
          console.log("👤 [IntMax-FullConn] User rejected connection, will not retry");
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      const newRetryCount = intMaxState.retryCount + 1;
      console.log("🔄 [IntMax-FullConn] Setting error state:", {
        errorMessage,
        shouldRetry,
        newRetryCount,
        maxRetries: MAX_RETRY_ATTEMPTS,
        willRetry: shouldRetry && newRetryCount < MAX_RETRY_ATTEMPTS,
      });

      setIntMaxState((prev) => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
        retryCount: newRetryCount,
      }));

      if (shouldRetry && newRetryCount < MAX_RETRY_ATTEMPTS) {
        console.log(
          `⏰ [IntMax-FullConn] Scheduling retry ${newRetryCount}/${MAX_RETRY_ATTEMPTS} in ${RETRY_DELAY}ms`
        );
        retryTimeoutRef.current = setTimeout(() => {
          operationInProgress.current = false;
          setIntMaxState((prev) => ({ ...prev, error: null }));
          console.log("🔄 [IntMax-FullConn] Retry timeout triggered, clearing error state");
        }, RETRY_DELAY);
      } else {
        console.log("🛑 [IntMax-FullConn] Max retries reached or no retry allowed, stopping");
      }
    } finally {
      if (!retryTimeoutRef.current) {
        operationInProgress.current = false;
        console.log("🏁 [IntMax-FullConn] Operation completed, clearing progress flag");
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
