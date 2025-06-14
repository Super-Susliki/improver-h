import { BuyIcon, QRCodeIcon, ReceiveIcon } from "@/components/svg";
import { useNavigate } from "react-router";

const buttonsConfig: { title: string; icon: React.ReactElement; link: string }[] = [
  { title: "Scan QR", icon: <QRCodeIcon />, link: "/scan-qr" },
  { title: "Receive", icon: <ReceiveIcon />, link: "/receive" },
  { title: "Buy", icon: <BuyIcon />, link: "/buy" },
];

export const ActionButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-3 gap-[10px] mt-5">
      {buttonsConfig.map(({ title, icon, link }) => (
        <button
          key={title}
          onClick={() => navigate(link)}
          className="rounded-[30px] cursor-pointer h-[105px] bg-black flex flex-col gap-[10px] justify-center items-center"
        >
          {icon}
          <p className="text-[14px] leading-[16px] text-white">{title}</p>
        </button>
      ))}
    </div>
  );
};

ActionButtons.displayName = "ActionButtons";
