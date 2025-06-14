import { usePrivy } from "@privy-io/react-auth";

import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { login } = usePrivy();

  return (
    <section className="flex flex-col max-w-[480px] gap-10 pt-[30vh] items-center">
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
          login();
        }}
      >
        Get Started
      </Button>
    </section>
  );
};

LoginPage.displayName = "LoginPage";

export default LoginPage;
