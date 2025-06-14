import React, { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";

import { usePrivyIntMaxSync } from "@/hooks/use-privy-intmax-sync";

type AuthContextType = ReturnType<typeof usePrivyIntMaxSync>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = usePrivyIntMaxSync();

  const contextValue = useMemo(
    () => authState,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      authState.privyReady,
      authState.privyAuthenticated,
      authState.privyUser?.wallet?.address,
      authState.intMaxState.isLoggedIn,
      authState.intMaxState.address,
      authState.intMaxState.isConnecting,
      authState.intMaxState.error,
      authState.isFullyConnected,
      authState.isConnecting,
      authState.hasError,
    ]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthContext };
