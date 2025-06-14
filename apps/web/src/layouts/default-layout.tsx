import { Outlet } from "react-router";

export const DefaultLayout = () => {
  return (
    <div className="relative flex min-h-screen flex-col px-5">
      <Outlet />
    </div>
  );
};
