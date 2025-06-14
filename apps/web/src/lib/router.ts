import { lazy } from "react";
import { createBrowserRouter } from "react-router";

function lazyWithRetry(dynamicImportFn: () => Promise<{ default: React.ComponentType }>) {
  return lazy(() =>
    dynamicImportFn().catch(() => {
      window.location.reload();
      return dynamicImportFn();
    })
  );
}

export const routes = {
  home: "/",
  old: "/old",
  login: "/login",
  sendTip: "/send-tip",
  establishments: "/establishments",
  scanQrCode: "/scan-qr-code",
  receive: "/receive",
  qr: "/qr",
  loyalty: "/loyalty",
  tipsHistory: "/tips-history",
  establishmentDetails: "/establishment/:storeId",
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
        path: routes.sendTip,
        Component: lazyWithRetry(() => import("@/pages/SendTipPage")),
      },
      {
        path: routes.establishments,
        Component: lazyWithRetry(() => import("@/pages/EstablishmentsPage")),
      },
      {
        path: routes.scanQrCode,
        Component: lazyWithRetry(() => import("@/pages/ScanQrPage")),
      },
      {
        path: routes.tipsHistory,
        Component: lazyWithRetry(() => import("@/pages/TipsHistoryPage")),
      },
      {
        path: routes.receive,
        Component: lazyWithRetry(() => import("@/pages/ReceivePage")),
      },
      {
        path: routes.qr,
        Component: lazyWithRetry(() => import("@/pages/ShowQRPage")),
      },
      {
        path: routes.loyalty,
        Component: lazyWithRetry(() => import("@/pages/LoyaltyPage")),
      },
      {
        path: routes.establishmentDetails,
        Component: lazyWithRetry(() => import("@/pages/EstablishmentDetailsPage")),
      },
    ],
  },
]);
