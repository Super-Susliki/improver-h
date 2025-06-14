import { Outlet, useLocation } from "react-router";

import { BottomTabs } from "@/components/bottom-tabs/bottom-tabs";
import { routes } from "@/lib/router";
import { cn } from "@/lib/utils";

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const isLogin = pathname === routes.login;
  return (
    <div
      className={cn(
        "relative flex min-h-screen pb-[58px] max-w-[480px] flex-col px-5 mx-auto items-center"
      )}
    >
      <Outlet />
      {!isLogin && <BottomTabs />}
    </div>
  );
};

DefaultLayout.displayName = "DefaultLayout";

export default DefaultLayout;
