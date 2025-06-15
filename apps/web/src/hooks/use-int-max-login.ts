import { useMutation } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";

export const useIntMaxLogin = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async () => {
      console.log("🎯 [IntMax-LoginHook] Starting IntMax client login...");
      console.log("🔍 [IntMax-LoginHook] Client check:", {
        clientExists: !!intMaxClient,
        clientType: typeof intMaxClient,
        clientAddress: intMaxClient?.address || "N/A",
        clientMethods: intMaxClient
          ? Object.getOwnPropertyNames(Object.getPrototypeOf(intMaxClient))
          : "N/A",
        timestamp: new Date().toISOString(),
      });

      if (!intMaxClient) {
        console.error("❌ [IntMax-LoginHook] No IntMax client available");
        throw new Error("IntMax client not available");
      }

      try {
        console.log("📞 [IntMax-LoginHook] Calling intMaxClient.login()...");
        const loginStartTime = Date.now();

        const result = await intMaxClient.login();

        const loginEndTime = Date.now();
        console.log("✅ [IntMax-LoginHook] intMaxClient.login() completed successfully!", {
          loginDurationMs: loginEndTime - loginStartTime,
          resultExists: !!result,
          resultType: typeof result,
          resultKeys: result && typeof result === "object" ? Object.keys(result) : "N/A",
          resultAddress: result?.address || "N/A",
          timestamp: new Date().toISOString(),
        });

        return result;
      } catch (error) {
        console.error("❌ [IntMax-LoginHook] intMaxClient.login() failed:", {
          error: error instanceof Error ? error.message : "Unknown error",
          errorType: typeof error,
          errorName: error instanceof Error ? error.name : "N/A",
          errorCode: (error as any)?.code || "N/A",
          errorStack: error instanceof Error ? error.stack : null,
          clientExists: !!intMaxClient,
          timestamp: new Date().toISOString(),
        });
        throw error;
      }
    },
  });

  return {
    login: mutateAsync,
    isPending,
    error,
  };
};
