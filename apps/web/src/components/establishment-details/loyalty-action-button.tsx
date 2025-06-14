import { useNavigate } from "react-router";
import { Gift, Star } from "lucide-react";
import { useUserLoyaltyStats } from "@/lib/api/hooks";
import { routes } from "@/lib/router";

interface LoyaltyActionButtonProps {
  storeId: string;
}

export const LoyaltyActionButton = ({ storeId }: LoyaltyActionButtonProps) => {
  const navigate = useNavigate();
  const { data: stats, isLoading } = useUserLoyaltyStats(storeId);

  const handleClick = () => {
    navigate(`${routes.loyalty}?storeId=${storeId}&tab=rewards&from=establishment`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full border border-[#DADADA] rounded-[30px] flex flex-col gap-2.5 p-[21px] items-center justify-start relative cursor-pointer hover:bg-gray-50 transition-colors"
    >
      {/* Points Badge */}
      {!isLoading && stats && (
        <div className="absolute text-xs top-2.5 left-2.5 h-[24px] bg-purple-600 rounded-[12px] px-2 py-1 text-white flex items-center gap-1">
          <Star className="h-3 w-3" />
          {stats.totalPoints} pts
        </div>
      )}

      {/* Icon */}
      <div className="w-11 h-11 rounded-[16px] p-2.5 bg-gradient-to-br from-purple-100 to-blue-100">
        <Gift className="w-full h-full text-purple-600" />
      </div>

      {/* Label */}
      <p className="text-base leading-none text-center font-medium">Loyalty & Rewards</p>

      {/* Subtitle */}
      {!isLoading && stats && (
        <p className="text-xs text-gray-500 text-center">
          {stats.availableRewards.length} rewards available
        </p>
      )}
    </div>
  );
};
