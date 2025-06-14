import { BuyIcon, QRCodeIcon, ReceiveIcon } from "@/components/svg";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router";

const buttonsConfig: {
  title: string;
  icon: React.ReactElement;
  link: string;
  requiresIntMax?: boolean;
}[] = [
  { title: "Scan QR", icon: <QRCodeIcon />, link: "/scan-qr" },
  { title: "Receive", icon: <ReceiveIcon />, link: "/receive" },
  { title: "Buy", icon: <BuyIcon />, link: "/buy", requiresIntMax: true },
];

const ActionButtons = () => {
  const navigate = useNavigate();
  const { isFullyConnected, isConnecting } = useAuth();

  const handleButtonClick = (button: (typeof buttonsConfig)[0]) => {
    if (button.requiresIntMax && !isFullyConnected) {
      return;
    }
    navigate(button.link);
  };

  return (
    <div className="grid grid-cols-3 gap-[10px] mt-5">
      {buttonsConfig.map((button) => {
        const needsIntMax = button.requiresIntMax;
        const isDisabled = needsIntMax && !isFullyConnected;
        const isLoading = needsIntMax && isConnecting;

        return (
          <button
            key={button.title}
            onClick={() => handleButtonClick(button)}
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
                <p className="text-[14px] leading-[16px] text-white">Connecting...</p>
              </>
            ) : (
              <>
                <div className={isDisabled ? "opacity-50" : ""}>{button.icon}</div>
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
