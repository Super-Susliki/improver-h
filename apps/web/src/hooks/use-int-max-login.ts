import { useMutation } from "@tanstack/react-query";

import { useIntMaxClientStore } from "./use-int-max-client";

export const useIntMaxLogin = () => {
  const intMaxClient = useIntMaxClientStore((state) => state.intMaxClient);

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: async () => {
      if (!intMaxClient) {
        throw new Error("IntMax client not initialized");
      }

      const result = await intMaxClient.login();
      return result;
    },
  });

  return {
    login: mutateAsync,
    isPending,
    error,
  };
};
