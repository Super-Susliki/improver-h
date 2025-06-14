import { BalanceDisplay } from "@/components/pages/home/BalanceDisplay";
import { HomeHeader } from "@/components/pages/home/HomeHeader";
import { ActionButtons } from "@/components/pages/home/ActionButtons";
import { CreatePaymentCard } from "@/components/pages/home/CreatePaymentCard";
import { BackgroundBlur } from "@/components/pages/home/BackgroundBlur";
import { StoreList } from "@/components/pages/home/StoreList";

export const HomePage = () => {
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
