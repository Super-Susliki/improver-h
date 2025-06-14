import { CreditCard, HomeIcon, ShoppingBag } from "lucide-react";

import { routes } from "@/lib/router";

export interface Tab {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const tabs: Tab[] = [
  {
    label: "Home",
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    label: "Establishments",
    icon: <ShoppingBag />,
    href: routes.establishments,
  },
  {
    label: "Tips",
    icon: <CreditCard />,
    href: routes.tipsHistory,
  },
] as const;
