import { PrivyProvider } from "@privy-io/react-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { memo, Suspense, useState } from "react";
import { RouterProvider } from "react-router";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./lib/wagmi-config";

import { Loader } from "./components/common/Loader";
import { AuthProvider } from "./contexts/AuthContext";
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
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <RouterProvider router={router} />
            </Suspense>
          </AuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
});

export default App;
