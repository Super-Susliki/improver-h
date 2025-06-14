import { Gift, Star, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserLoyaltyStats } from "@/lib/api/hooks";
import { Skeleton } from "@/components/ui/skeleton";

interface LoyaltyCardProps {
  storeId: string;
  storeName: string;
}

export const LoyaltyCard = ({ storeId, storeName }: LoyaltyCardProps) => {
  const { data: stats, isLoading } = useUserLoyaltyStats(storeId);

  if (isLoading) {
    return (
      <Card className="w-full bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-24 mx-auto" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-purple-100">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-8" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  const progressPercentage = stats.nextReward
    ? (stats.totalPoints / stats.nextReward.reward.pointsRequired) * 100
    : 100;

  return (
    <Card className="w-full bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            {storeName} Loyalty
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Points */}
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">{stats.totalPoints}</div>
          <div className="text-sm text-gray-600">Points Available</div>
        </div>

        {/* Progress to Next Reward */}
        {stats.nextReward && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Next Reward</span>
              <span className="font-medium text-gray-800">
                {stats.totalPoints}/{stats.nextReward.reward.pointsRequired}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-center text-xs text-gray-600">
              {stats.nextReward.pointsNeeded} more points for{" "}
              <span className="font-medium text-purple-600">{stats.nextReward.reward.name}</span>
            </div>
          </div>
        )}

        {/* Available Rewards */}
        <div className="flex items-center justify-between pt-2 border-t border-purple-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Gift className="h-4 w-4" />
            Available Rewards
          </div>
          <Badge variant="outline" className="border-purple-200 text-purple-700">
            {stats.availableRewards.length}
          </Badge>
        </div>

        {/* Total Points Earned */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Total Earned
          </div>
          <span>{stats.totalPoints} points</span>
        </div>
      </CardContent>
    </Card>
  );
};
