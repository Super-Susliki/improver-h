import { Outlet } from "react-router";

import { BottomTabs } from "@/components/bottom-tabs/bottom-tabs";

const DefaultLayout = () => {
  return (
    <div className="relative flex min-h-screen pb-[58px] max-w-[480px] flex-col px-5 mx-auto items-center">
      <Outlet />
      <BottomTabs />
    </div>
  );
};

DefaultLayout.displayName = "DefaultLayout";

export default DefaultLayout;
