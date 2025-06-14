import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { memo, Suspense, useState } from "react";
import { RouterProvider } from "react-router";

import { env } from "./env";
import { SUPPORTED_CHAIN } from "./lib/chains";
import { router } from "./lib/router";

const App = memo(() => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <PrivyProvider
      appId={env.VITE_PRIVY_APP_ID}
      clientId={env.VITE_PRIVY_CLIENT_ID}
      config={{
        loginMethods: ["email", "google"],
        embeddedWallets: {
          ethereum: {
            createOnLogin: "all-users",
          },
        },
        defaultChain: SUPPORTED_CHAIN,
        supportedChains: [SUPPORTED_CHAIN],
        externalWallets: {
          disableAllExternalWallets: true,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </PrivyProvider>
  );
});

export default App;
