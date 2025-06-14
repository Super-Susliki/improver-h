import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/lib/router";

const LoginPage = () => {
  const { privyReady, privyAuthenticated, privyLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (privyReady && privyAuthenticated) {
      navigate(routes.home);
    }
  }, [privyReady, privyAuthenticated, navigate]);

  if (!privyReady || privyAuthenticated) {
    return <Loader />;
  }

  return (
    <section className="flex flex-col gap-10 pt-[30vh] items-center">
      <div className="absolute top-0 left-0 w-full h-full  z-[-1]">
        <img src="/login-bg.svg" alt="bg" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-[32px]">Improve your HoReCa with Improver</h1>
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
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
