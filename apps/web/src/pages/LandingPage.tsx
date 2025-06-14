import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UseMobileNotification } from "@/components/common/use-mobile-notification";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage = () => {
  const { privyLogin } = useAuth();

  return (
    <div className="min-h-screen max-mobile:hidden bg-white">
      <section className="relative min-h-screen z-20 flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <UseMobileNotification />
        <div className="absolute top-0 left-0 w-full h-full z-[1]">
          <img
            src="/landing-bg.svg"
            alt="bg"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="max-w-4xl relative z-20 mx-auto mt-16 md:mt-0">
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="Improver Logo"
              className="w-20 h-20 mx-auto rounded-2xl shadow-lg"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Improve your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}
              HoReCa{" "}
            </span>
            with Improver
          </h1>

          <p className="text-lg md:text-xl text-light-gray mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate loyalty and tipping platform for hotels, restaurants, and cafes. Connect
            customers with establishments through blockchain-secured rewards and payments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              className="text-lg px-8 py-4 h-auto sm:w-[500px]"
              onClick={() => {
                privyLogin();
              }}
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

LandingPage.displayName = "LandingPage";
export default LandingPage;
