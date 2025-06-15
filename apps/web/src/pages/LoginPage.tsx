import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/lib/router";
import LandingPage from "./LandingPage";
import { IntMax, RedStone } from "@/components/svg";

const LoginPage = () => {
  const { privyReady, privyAuthenticated, privyLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (privyReady && privyAuthenticated) {
      void navigate(routes.home);
    }
  }, [privyReady, privyAuthenticated, navigate]);

  if (!privyReady || privyAuthenticated) {
    return <Loader />;
  }

  return (
    <>
      <section className="mobile:hidden flex flex-col gap-8 pt-[20vh] items-center min-h-[100vh]">
        <div className="absolute top-0 left-0 w-full h-full  z-[-1]">
          <img src="/login-bg.svg" alt="bg" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="font-medium text-[32px]">
            Improve your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}
              HoReCa{" "}
            </span>{" "}
            with Improver
          </h1>
          <p className="text-light-gray text-lg">
            The ultimate loyalty and tipping platform for hotels, restaurants, and cafes. Connect
            customers with establishments through blockchain-secured rewards and payments.
          </p>
        </div>
        <Button
          className="w-full"
          onClick={() => {
            privyLogin();
          }}
        >
          Get Started
        </Button>

        <div className="mt-auto mb-5">
          <p className="text-sm text-light-gray mb-4 text-center">Powered by</p>
          <div className="flex justify-center items-center gap-3 opacity-70">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <RedStone className="size-4" />
              RedStone
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <IntMax className="size-4" />
              IntMax
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <img src="/the-graph.svg" alt="the-graph" className="size-4" />
              The Graph
            </div>
          </div>
          <div className="flex mt-2 justify-center items-center gap-3 opacity-70">
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <img src="/ethereum.svg" alt="ethereum" className="size-4" />
              Ethereum
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <img src="/base.svg" alt="base" className="size-4" />
              Base
            </div>
          </div>
        </div>
      </section>
      <LandingPage />
    </>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
