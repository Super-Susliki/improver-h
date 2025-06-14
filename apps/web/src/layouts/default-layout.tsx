import { Outlet } from "react-router";

const DefaultLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col px-5 items-center">
      <Outlet />
    </div>
  );
};

DefaultLayout.displayName = "DefaultLayout";

export default DefaultLayout;
