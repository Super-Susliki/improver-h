import { NavLink } from "react-router";

import { tabs, type Tab } from "./tabs";

import { cn } from "@/lib/utils";

export const BottomTabs = () => {
  return (
    <div className="fixed bottom-0 w-full flex mx-auto max-w-[480px] justify-between items-center py-2 left-0 right-0 px-4 backdrop-blur-[4px] bg-white/60">
      {tabs.map((tab) => (
        <BottomTab key={tab.href} tab={tab} />
      ))}
    </div>
  );
};

export const BottomTab = ({ tab }: { tab: Tab }) => {
  return (
    <NavLink
      to={tab.href}
      className={({ isActive }) =>
        cn(
          "flex flex-col gap-0.5 items-center transition-all",
          isActive ? "text-black" : "text-light-gray"
        )
      }
    >
      {tab.icon}
      <p className="text-xs font-red-hat-text">{tab.label}</p>
    </NavLink>
  );
};
