import { lazy } from "react";
import { createBrowserRouter } from "react-router";

function lazyWithRetry(dynamicImportFn: () => any) {
  return lazy(() =>
    dynamicImportFn().catch(() => {
      window.location.reload();
    })
  );
}

export const routes = {
  home: "/",
  login: "/login",
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: lazyWithRetry(() => import("@/layouts/default-layout")),
    children: [
      {
        path: routes.home,
        Component: lazyWithRetry(() => import("@/pages/HomePage")),
      },
      {
        path: routes.login,
        Component: lazyWithRetry(() => import("@/pages/LoginPage")),
      },
    ],
  },
]);
