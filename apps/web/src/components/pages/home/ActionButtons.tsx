import { useFundWallet } from "@privy-io/react-auth";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { sepolia } from "viem/chains";

import { BuyIcon, QRCodeIcon } from "@/components/svg";
import { Gift, ArrowDownToLine } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ActionButtons = () => {
  const navigate = useNavigate();
  const { privyUser } = useAuth();
  const { fundWallet } = useFundWallet();
  console.log("privyUser ==>", privyUser);
  const buttonsConfig: {
    title: string;
    subtitle?: string;
    icon: React.ReactElement;
    link?: string;
    onClick?: () => void;
  }[] = useMemo(
    () => [
      { title: "Show QR", icon: <QRCodeIcon />, link: "/qr" },
      { title: "Loyalty", icon: <Gift className="h-6 w-6" color="#B8ACFF" />, link: "/loyalty" },
      {
        title: "Receive Tips",
        subtitle: "via IntMax",
        icon: <ArrowDownToLine className="h-6 w-6" color="#B8ACFF" />,
        link: "/receive",
      },
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
    <div className="grid grid-cols-2 gap-[10px] my-5">
      {buttonsConfig.map((button) => {
        return (
          <button
            key={button.title}
            onClick={() => {
              handleButtonClick(button);
            }}
            className={`
              rounded-[30px] cursor-pointer h-[105px] flex flex-col gap-[6px] justify-center items-center
              bg-black hover:bg-gray-800
              transition-colors duration-200
            `}
          >
            <>
              <div>{button.icon}</div>
              <div className="flex flex-col items-center gap-[2px]">
                <p className={`text-[14px] leading-[16px] text-white`}>{button.title}</p>
                {button.subtitle && (
                  <p className="text-[10px] leading-[12px] text-gray-300">{button.subtitle}</p>
                )}
              </div>
            </>
          </button>
        );
      })}
    </div>
  );
};

ActionButtons.displayName = "ActionButtons";

export { ActionButtons };
