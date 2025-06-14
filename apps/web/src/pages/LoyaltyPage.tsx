import { useState } from "react";
import { Gift, History, Store, Sparkles } from "lucide-react";

import {
  LightTopPage,
  LightTopPageBackButton,
  LightTopPageContent,
  LightTopPageTitle,
} from "@/components/common/light-top-page";
import { LoyaltyCard } from "@/components/loyalty/LoyaltyCard";
import { RewardsList } from "@/components/loyalty/RewardsList";
import { RedemptionHistory } from "@/components/loyalty/RedemptionHistory";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { routes } from "@/lib/router";
import { useUserStores } from "@/lib/api/hooks";

const LoyaltyPage = () => {
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "rewards" | "history">("overview");

  const { data: userStores, isLoading } = useUserStores();

  const selectedStore =
    selectedStoreId && userStores ? userStores.find((store) => store.id === selectedStoreId) : null;

  const totalPoints = userStores?.reduce((sum, store) => sum + store.bonusesAmount, 0) || 0;
  const totalStores = userStores?.length || 0;

  if (isLoading) {
    return (
      <LightTopPage
        top={[
          <LightTopPageBackButton route={routes.home} className="col-span-1" />,
          <LightTopPageTitle className="col-span-3">My Loyalty</LightTopPageTitle>,
        ]}
      >
        <LightTopPageContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
                <CardContent className="p-4 text-center">
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="text-sm text-gray-600 mt-2">Total Points</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-teal-50">
                <CardContent className="p-4 text-center">
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="text-sm text-gray-600 mt-2">Active Stores</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </LightTopPageContent>
      </LightTopPage>
    );
  }

  return (
    <LightTopPage
      top={[
        <LightTopPageBackButton route={routes.home} className="col-span-1" />,
        <LightTopPageTitle className="col-span-3">My Loyalty</LightTopPageTitle>,
      ]}
    >
      <LightTopPageContent>
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{totalStores}</div>
                <div className="text-sm text-gray-600">Active Stores</div>
              </CardContent>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              onClick={() => setActiveTab("overview")}
              className="flex-1 h-10 text-base gap-0"
            >
              <Store className="h-4 w-4 mr-2" />
              Stores
            </Button>
            <Button
              variant={activeTab === "rewards" ? "default" : "ghost"}
              onClick={() => setActiveTab("rewards")}
              className="flex-1 h-10 text-base gap-0"
              disabled={!selectedStore}
            >
              <Gift className="h-4 w-4 mr-2" />
              Rewards
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              onClick={() => setActiveTab("history")}
              className="flex-1 h-10 text-base gap-0"
            >
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </div>

          {/* Store Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                Your Loyalty Programs
              </h3>
              {userStores && userStores.length > 0 ? (
                userStores.map((store) => (
                  <div key={store.id} className="cursor-pointer">
                    <LoyaltyCard storeId={store.id} storeName={store.name} />
                    <div className="flex justify-center mt-2">
                      <Button
                        onClick={() => {
                          setSelectedStoreId(store.id);
                          setActiveTab("rewards");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        View Rewards
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No loyalty programs yet.</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Visit participating stores to start earning points!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Rewards Tab */}
          {activeTab === "rewards" && selectedStore && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedStore.name} Rewards
                </h3>
                <Button onClick={() => setActiveTab("overview")} variant="outline" size="sm">
                  Back to Stores
                </Button>
              </div>
              <RewardsList storeId={selectedStore.id} />
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <History className="h-5 w-5 text-gray-600" />
                Redemption History
              </h3>
              <RedemptionHistory />
            </div>
          )}
        </div>
      </LightTopPageContent>
    </LightTopPage>
  );
};

export default LoyaltyPage;
