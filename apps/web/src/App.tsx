import { PrivyProvider } from "@privy-io/react-auth";
import { env } from "./env";
import { RouterProvider } from "react-router";
import { router } from "./lib/router";
import { SUPPORTED_CHAIN } from "./lib/chains";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <PrivyProvider 
      appId={env.VITE_PRIVY_APP_ID} 
      clientId={env.VITE_PRIVY_CLIENT_ID} 
      config={{
        loginMethods: ['email', 'google'],
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'all-users',
          }
        },
        defaultChain: SUPPORTED_CHAIN,
        supportedChains: [SUPPORTED_CHAIN],
        externalWallets: {
          disableAllExternalWallets: true,
        }
    }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default App;
