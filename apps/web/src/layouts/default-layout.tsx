import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="relative flex min-h-screen max-w-[480px] flex-col px-5 mx-auto items-center">
      <Outlet />
    </div>
  );
};

DefaultLayout.displayName = "DefaultLayout";

export default DefaultLayout;
