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
      return <Percent className="h-3.5 w-3.5" />;
    case RewardType.DISCOUNT_FIXED:
      return <DollarSign className="h-3.5 w-3.5" />;
    case RewardType.FREE_ITEM:
      return <Gift className="h-3.5 w-3.5" />;
    case RewardType.SPECIAL_OFFER:
      return <Star className="h-3.5 w-3.5" />;
    default:
      return <Gift className="h-3.5 w-3.5" />;
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
      return <Clock className="h-3 w-3" />;
    case RedemptionStatus.APPROVED:
      return <CheckCircle className="h-3 w-3" />;
    case RedemptionStatus.USED:
      return <CheckCircle className="h-3 w-3" />;
    case RedemptionStatus.REJECTED:
      return <XCircle className="h-3 w-3" />;
    default:
      return <AlertCircle className="h-3 w-3" />;
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
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-5 w-12 flex-shrink-0" />
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
    <div className="space-y-3">
      {redemptions.map((redemption) => (
        <Card key={redemption.id} className="border-gray-200">
          <CardContent className="p-3">
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className="p-1.5 bg-gray-100 rounded-lg flex-shrink-0">
                {getRewardIcon(redemption.reward.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="font-medium text-sm text-gray-900 leading-tight truncate">
                    {redemption.reward.name}
                  </h4>
                  <Badge
                    variant="outline"
                    className={`flex items-center gap-1 text-xs px-1.5 py-0.5 flex-shrink-0 ${getStatusColor(redemption.status)}`}
                  >
                    {getStatusIcon(redemption.status)}
                    <span className="capitalize">{redemption.status.toLowerCase()}</span>
                  </Badge>
                </div>

                <p className="text-xs text-gray-600 mb-1.5 truncate">
                  {redemption.store?.name || "Store"}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant="outline" className="text-xs px-1.5 py-0.5 text-nowrap">
                      {getRewardValue(redemption.reward)}
                    </Badge>
                    <span className="text-xs text-gray-500 truncate">
                      {redemption.pointsUsed} pts
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {formatDistanceToNow(new Date(redemption.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
