import {
  BadgeDollarSign,
  CalendarCheck,
  Gift,
  History,
  Sparkles,
  Tag,
  Volleyball,
} from "lucide-react";

import { LoyaltyActionButton } from "./loyalty-action-button";
import { routes } from "@/lib/router";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

const actionButtons = [
  {
    label: "History",
    background: "#FEE5E2",
    icon: <History />,
    route: routes.establishmentHistory,
  },
  {
    label: "Cashback",
    background: "#E0DBFC",
    icon: <BadgeDollarSign />,
  },
  {
    label: "My coupons",
    background: "#E0DBFC",
    icon: <Tag />,
  },
  {
    label: "Challenges",
    background: "#CCE8E6",
    icon: <Volleyball />,
  },
  {
    label: "Birthday gifts",
    background: "#FEE7A6",
    icon: <Gift />,
  },
  {
    label: "Secret customer",
    background: "#E0DBFC",
    icon: <Sparkles />,
  },
  {
    label: "Reserve table",
    background: "#CCE8E6",
    icon: <CalendarCheck />,
  },
];

interface ActionButtonsProps {
  storeId?: string;
}

export const ActionButtons = ({ storeId }: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {storeId && <LoyaltyActionButton storeId={storeId} />}

      {actionButtons.slice(0, storeId ? 5 : 6).map((button) => (
        <ActionButton
          key={button.label}
          {...button}
          route={button.route?.replace(":storeId", storeId ?? "")}
        />
      ))}
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  background: string;
  icon: React.ReactNode;
  route?: string;
}

export const ActionButton = ({ label, background, icon, route }: ActionButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div
      className={cn(
        "w-full border border-[#DADADA] rounded-[30px] flex flex-col gap-2.5 p-[21px] items-center justify-start relative",
        route && "cursor-pointer"
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "absolute text-xs top-2.5 left-2.5 h-[24px] bg-black rounded-[12px] px-2 py-1 text-white",
          route && "hidden"
        )}
      >
        Coming soon
      </div>
      <div style={{ background }} className="w-11 h-11 rounded-[16px] p-2.5">
        {icon}
      </div>
      <p className="text-base leading-none text-center">{label}</p>
    </div>
  );
};
