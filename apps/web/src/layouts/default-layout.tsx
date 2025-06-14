import { AnimatePresence, motion } from "framer-motion";
import { cloneElement } from "react";
import { useLocation, useOutlet } from "react-router";
import { Toaster } from "sonner";

import { BottomTabs } from "@/components/bottom-tabs/bottom-tabs";
import { routes } from "@/lib/router";
import { cn } from "@/lib/utils";

const routesWithPadding = [routes.login, routes.home];

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const outlet = useOutlet();
  const isLogin = pathname === routes.login;

  return (
    <div className={cn("relative flex min-h-screen max-w-[480px] flex-col mx-auto items-center")}>
      <Toaster position="top-center" richColors closeButton />
      <AnimatePresence mode="wait" initial={false}>
        {outlet && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "w-full flex-1 overflow-y-auto",
              routesWithPadding.includes(pathname) ? "px-5" : "",
              !isLogin ? "pb-20" : ""
            )}
          >
            {cloneElement(outlet, { key: pathname })}
          </motion.div>
        )}
      </AnimatePresence>
      {!isLogin && <BottomTabs />}
    </div>
  );
};

DefaultLayout.displayName = "DefaultLayout";

export default DefaultLayout;
