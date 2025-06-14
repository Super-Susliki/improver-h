import {
  BadgeDollarSign,
  CalendarCheck,
  Gift,
  Sparkles,
  Tag,
  ThumbsUp,
  Volleyball,
} from "lucide-react";

const actionButtons = [
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
  {
    label: "Vote to improve",
    background: "#FEE5E2",
    icon: <ThumbsUp />,
  },
];

export const ActionButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {actionButtons.map((button) => (
        <ActionButton key={button.label} {...button} />
      ))}
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  background: string;
  icon: React.ReactNode;
}

export const ActionButton = ({ label, background, icon }: ActionButtonProps) => {
  return (
    <div className="w-full border border-[#DADADA] rounded-[30px] flex flex-col gap-2.5 p-[21px] items-center justify-start relative">
      <div className="absolute text-xs top-2.5 left-2.5 h-[24px] bg-black rounded-[12px] px-2 py-1 text-white">
        Coming soon
      </div>
      <div style={{ background }} className="w-11 h-11 rounded-[16px] p-2.5">
        {icon}
      </div>
      <p className="text-base leading-none text-center">{label}</p>
    </div>
  );
};
