import { useFundWallet } from "@privy-io/react-auth";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { sepolia } from "viem/chains";

import { BuyIcon, ReceiveIcon } from "@/components/svg";
import { useAuth } from "@/contexts/AuthContext";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { privyUser } = useAuth();
  const { fundWallet } = useFundWallet();

  const buttonsConfig: {
    title: string;
    icon: React.ReactElement;
    link?: string;
    onClick?: () => void;
  }[] = useMemo(
    () => [
      { title: "Receive", icon: <ReceiveIcon />, link: "/receive" },
      {
        title: "Fund",
        icon: <BuyIcon />,
        onClick: () => {
          if (privyUser?.wallet?.address) {
            return fundWallet(privyUser.wallet.address, {
              asset: "native-currency",
              chain: sepolia,
            });
          }
        },
      },
    ],
    [fundWallet, privyUser]
  );

  const handleButtonClick = (button: (typeof buttonsConfig)[0]) => {
    if (button.onClick) {
      button.onClick();
      return;
    }
    if (button.link) {
      void navigate(button.link);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-[10px] mt-5">
      {buttonsConfig.map((button) => {
        return (
          <button
            key={button.title}
            onClick={() => {
              handleButtonClick(button);
            }}
            className={`
              rounded-[30px] cursor-pointer h-[105px] flex flex-col gap-[10px] justify-center items-center
              bg-black hover:bg-gray-800
              transition-colors duration-200
            `}
          >
            <>
              <div>{button.icon}</div>
              <p className={`text-[14px] leading-[16px] text-white`}>{button.title}</p>
            </>
          </button>
        );
      })}
    </div>
  );
};

ActionButtons.displayName = "ActionButtons";

export { ActionButtons };
