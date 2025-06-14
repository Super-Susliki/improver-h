import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  History,
  Gift,
  Percent,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useUserRedemptions } from "@/lib/api/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { RewardType, RedemptionStatus } from "@/lib/api/types";
import { formatDistanceToNow } from "date-fns";

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

const getStatusIcon = (status: RedemptionStatus) => {
  switch (status) {
    case RedemptionStatus.PENDING:
      return <Clock className="h-4 w-4" />;
    case RedemptionStatus.APPROVED:
      return <CheckCircle className="h-4 w-4" />;
    case RedemptionStatus.USED:
      return <CheckCircle className="h-4 w-4" />;
    case RedemptionStatus.REJECTED:
      return <XCircle className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusColor = (status: RedemptionStatus) => {
  switch (status) {
    case RedemptionStatus.PENDING:
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case RedemptionStatus.APPROVED:
      return "bg-blue-100 text-blue-700 border-blue-200";
    case RedemptionStatus.USED:
      return "bg-green-100 text-green-700 border-green-200";
    case RedemptionStatus.REJECTED:
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const RedemptionHistory = () => {
  const { data: redemptions, isLoading } = useUserRedemptions();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Skeleton className="h-10 w-10" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-6 w-16 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!redemptions || redemptions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No redemption history yet.</p>
          <p className="text-sm text-gray-500 mt-1">Your redeemed rewards will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {redemptions.map((redemption) => (
        <Card key={redemption.id} className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getRewardIcon(redemption.reward.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{redemption.reward.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{redemption.store?.name || "Store"}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-nowrap">
                      {getRewardValue(redemption.reward)}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {redemption.pointsUsed} points used
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(redemption.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant="outline"
                  className={`flex items-center gap-1 ${getStatusColor(redemption.status)}`}
                >
                  {getStatusIcon(redemption.status)}
                  {redemption.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
