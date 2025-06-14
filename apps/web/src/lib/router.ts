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
  old: "/old",
  login: "/login",
  createPayment: "/create-payment",
  scanQrCode: "/scan-qr-code",
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
      {
        path: routes.old,
        Component: lazyWithRetry(() => import("@/pages/HomePage_old")),
      },
      {
        path: routes.createPayment,
        Component: lazyWithRetry(() => import("@/pages/CreatePaymentPage")),
      },
      {
        path: routes.scanQrCode,
        Component: lazyWithRetry(() => import("@/pages/ScanQrPage")),
      },
    ],
  },
]);
