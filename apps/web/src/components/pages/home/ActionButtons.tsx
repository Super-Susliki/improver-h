import { useFundWallet } from "@privy-io/react-auth";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { sepolia } from "viem/chains";

import { BuyIcon, ReceiveIcon } from "@/components/svg";
import { useAuth } from "@/contexts/AuthContext";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { isFullyConnected, isConnecting, privyUser } = useAuth();
  const { fundWallet } = useFundWallet();

  const buttonsConfig: {
    title: string;
    icon: React.ReactElement;
    link?: string;
    onClick?: () => void;
    requiresIntMax?: boolean;
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
        requiresIntMax: true,
      },
    ],
    [fundWallet, privyUser],
  );

  const handleButtonClick = (button: (typeof buttonsConfig)[0]) => {
    if (button.requiresIntMax && !isFullyConnected) {
      return;
    }
    if (button.onClick) {
      button.onClick();
      return;
    }
    if (button.link) {
      navigate(button.link);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-[10px] mt-5">
      {buttonsConfig.map((button) => {
        const needsIntMax = button.requiresIntMax;
        const isDisabled = needsIntMax && !isFullyConnected;
        const isLoading = needsIntMax && isConnecting;

        return (
          <button
            key={button.title}
            onClick={() => {
              handleButtonClick(button);
            }}
            disabled={isDisabled}
            className={`
              rounded-[30px] cursor-pointer h-[105px] flex flex-col gap-[10px] justify-center items-center
              ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}
              transition-colors duration-200
            `}
          >
            {isLoading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <p className="text-[14px] leading-[16px] text-white">
                  Connecting...
                </p>
              </>
            ) : (
              <>
                <div className={isDisabled ? "opacity-50" : ""}>
                  {button.icon}
                </div>
                <p
                  className={`text-[14px] leading-[16px] text-white ${isDisabled ? "opacity-50" : ""}`}
                >
                  {button.title}
                </p>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
};

ActionButtons.displayName = "ActionButtons";

export { ActionButtons };
