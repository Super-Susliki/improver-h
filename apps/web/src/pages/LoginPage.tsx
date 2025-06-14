import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/lib/router";
import LandingPage from "./LandingPage";

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
      <section className="mobile:hidden flex flex-col gap-10 pt-[30vh] items-center">
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
            Lorem ipsum dolor sit amet consectetur. Ut in ut phasellus augue turpis magna gravida
            tincidunt. Sem massa in id duis.
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
      </section>
      <LandingPage />
    </>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
