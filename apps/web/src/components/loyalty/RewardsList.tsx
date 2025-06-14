import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Percent, DollarSign, Star } from "lucide-react";
import { useStoreRewards, useRedeemReward, useUserLoyaltyStats } from "@/lib/api/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { RewardType } from "@/lib/api/types";
import { toast } from "sonner";

interface RewardsListProps {
  storeId: string;
}

const getRewardIcon = (type: RewardType) => {
  switch (type) {
    case RewardType.DISCOUNT_PERCENTAGE:
      return <Percent className="h-4 w-4" />;
    case RewardType.DISCOUNT_FIXED:
      return <DollarSign className="h-4 w-4" />;
    case RewardType.FREE_ITEM:
      return <Gift className="h-4 w-4" />;
    case RewardType.SPECIAL_OFFER:
      return <Star className="h-4 w-4" />;
    default:
      return <Gift className="h-4 w-4" />;
  }
};

const getRewardValue = (reward: { type: RewardType; value: number }) => {
  switch (reward.type) {
    case RewardType.DISCOUNT_PERCENTAGE:
      return `${reward.value}% off`;
    case RewardType.DISCOUNT_FIXED:
      return `$${reward.value} off`;
    case RewardType.FREE_ITEM:
      return "Free item";
    case RewardType.SPECIAL_OFFER:
      return "Special offer";
    default:
      return "Reward";
  }
};

export const RewardsList = ({ storeId }: RewardsListProps) => {
  const { data: rewards, isLoading: isLoadingRewards } = useStoreRewards(storeId);
  const { data: stats, isLoading: isLoadingStats } = useUserLoyaltyStats(storeId);
  const { mutate: redeemReward, isPending: isRedeeming } = useRedeemReward(storeId);

  const handleRedeem = (rewardId: string) => {
    redeemReward(rewardId, {
      onSuccess: () => {
        toast.success("Reward redeemed successfully!");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to redeem reward");
      },
    });
  };

  if (isLoadingRewards || isLoadingStats) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-3" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-start gap-3 flex-1">
                      <Skeleton className="h-8 w-8" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-48 mb-2" />
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                    <Skeleton className="h-9 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!rewards || !stats || rewards.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No rewards available yet.</p>
          <p className="text-sm text-gray-500 mt-1">Check back later for exciting rewards!</p>
        </CardContent>
      </Card>
    );
  }

  const availableRewards = rewards.filter((reward) => reward.isActive);
  const redeemableRewards = availableRewards.filter(
    (reward) =>
      stats.totalPoints >= reward.pointsRequired &&
      (!reward.maxRedemptions || reward.currentRedemptions < reward.maxRedemptions)
  );
  const futureRewards = availableRewards.filter(
    (reward) => stats.totalPoints < reward.pointsRequired
  );

  return (
    <div className="space-y-6">
      {/* Available to Redeem */}
      {redeemableRewards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Gift className="h-5 w-5 text-green-600" />
            Ready to Redeem ({redeemableRewards.length})
          </h3>
          <div className="space-y-3">
            {redeemableRewards.map((reward) => (
              <Card key={reward.id} className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-green-100 rounded-lg">
                        {getRewardIcon(reward.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{reward.name}</h4>
                        {reward.description && (
                          <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 text-nowrap"
                          >
                            {getRewardValue(reward)}
                          </Badge>
                          <span className="text-sm text-gray-600">
                            {reward.pointsRequired} points
                          </span>
                        </div>
                        {reward.maxRedemptions && (
                          <p className="text-xs text-gray-500 mt-1">
                            {reward.maxRedemptions - reward.currentRedemptions} left
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRedeem(reward.id)}
                      disabled={isRedeeming}
                      className="bg-green-600 hover:bg-green-700 px-3 py-1 text-sm rounded-lg h-6 text-white"
                    >
                      {isRedeeming ? "Redeeming..." : "Redeem"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Future Rewards */}
      {futureRewards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Star className="h-5 w-5 text-purple-600" />
            Coming Soon ({futureRewards.length})
          </h3>
          <div className="space-y-3">
            {futureRewards.map((reward) => (
              <Card key={reward.id} className="border-gray-200 bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-1">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 bg-gray-200 rounded-lg">{getRewardIcon(reward.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-700">{reward.name}</h4>
                        {reward.description && (
                          <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="border-gray-300 text-nowrap">
                            {getRewardValue(reward)}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            {reward.pointsRequired} points needed
                          </span>
                        </div>
                        <p className="text-xs text-purple-600 mt-1">
                          {reward.pointsRequired - stats.totalPoints} more points to unlock
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">
                        {reward.pointsRequired - stats.totalPoints} more
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
