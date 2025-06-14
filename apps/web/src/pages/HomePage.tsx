import { useEffect } from "react";
import { useNavigate } from "react-router";

import { ActionButtons } from "@/components/pages/home/ActionButtons";
import { BackgroundBlur } from "@/components/pages/home/BackgroundBlur";
import { BalanceDisplay } from "@/components/pages/home/BalanceDisplay";
import { CreatePaymentCard } from "@/components/pages/home/CreatePaymentCard";
import { HomeHeader } from "@/components/pages/home/HomeHeader";
import { StoreList } from "@/components/pages/home/StoreList";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/lib/router";

export const HomePage = () => {
  const { privyReady, privyAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (privyReady && !privyAuthenticated) {
      navigate(routes.login);
    }
  }, [privyReady, privyAuthenticated, navigate]);

  // Show loading while Privy initializes or during redirect
  if (!privyReady || !privyAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show main app - IntMax will connect automatically in the background
  return (
    <div className="relative w-full">
      <BackgroundBlur />
      <HomeHeader />
      <BalanceDisplay />
      <ActionButtons />
      <CreatePaymentCard />
      <StoreList />
    </div>
  );
};

HomePage.displayName = "HomePage";
export default HomePage;
