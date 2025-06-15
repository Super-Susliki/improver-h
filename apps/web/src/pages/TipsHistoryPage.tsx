import {
  DarkTopPage,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { useAuth } from "@/contexts/AuthContext";
import { useIntMaxDeposits } from "@/hooks/use-int-max-deposits";
import type { Transaction } from "intmax2-client-sdk";
import { useMemo } from "react";
import { formatUnits } from "viem";

const TipsHistoryPage = () => {
  const { data, isLoading, error, isError, refetch } = useIntMaxDeposits();
  const { isFullyConnected, isConnecting, hasError, canRetry, retryIntMaxConnection } = useAuth();

  const dataGrouped = useMemo(() => {
    if (!data || data.length === 0) return [];

    return Object.entries(
      data.reduce<Record<string, Transaction[]>>((acc, curr) => {
        const dateStartTs = Math.floor(curr.timestamp / 86400) * 86400;
        acc[dateStartTs] = acc[dateStartTs] || [];
        acc[dateStartTs].push(curr);
        return acc;
      }, {})
    );
  }, [data]);

  const handleRetry = () => {
    if (hasError && canRetry) {
      retryIntMaxConnection();
    } else if (isError) {
      refetch();
    }
  };

  return (
    <DarkTopPage
      topClassName="relative"
      top={[<DarkTopPageTitle className="col-span-4 text-left">Tips history</DarkTopPageTitle>]}
    >
      <DarkTopPageContent>
        <div className="flex gap-4 flex-col">
          {/* Connection Status */}
          {isConnecting && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600">Connecting to IntMax...</p>
            </div>
          )}

          {/* Loading Status */}
          {isFullyConnected && isLoading && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600">Loading transaction history...</p>
            </div>
          )}

          {/* Error State */}
          {(hasError || isError) && (
            <div className="flex flex-col items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">Failed to load transaction history</p>
              {(canRetry || isError) && (
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              )}
            </div>
          )}

          {/* Transaction History */}
          {dataGrouped.map(([dateStartTs, payments]) => (
            <div
              className="w-full flex flex-col gap-4"
              key={new Date(Number(dateStartTs) * 1000).toLocaleDateString()}
            >
              <div className="text-md text-center">
                {new Date(Number(dateStartTs) * 1000).toLocaleDateString()}
              </div>
              <div className="flex flex-col gap-2">
                {payments
                  .sort((a, b) => b.timestamp - a.timestamp)
                  .map((payment) => (
                    <div
                      className="flex items-center p-4 gap-4 border rounded-[20px] border-[#DADADA]"
                      key={payment.timestamp}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="text-base text-black">
                          Received {formatUnits(BigInt(payment.amount), 18)} ETH
                        </div>
                        <div className="text-sm text-[#00000066]">
                          {new Date(payment.timestamp * 1000).toLocaleString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {isFullyConnected && !isLoading && !isError && dataGrouped.length === 0 && (
            <div className="text-center text-base text-gray-500 py-8">
              <p>No transaction history found</p>
              <p className="text-sm mt-2">Your IntMax deposits will appear here</p>
            </div>
          )}
        </div>
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

TipsHistoryPage.displayName = "TipsHistoryPage";

export default TipsHistoryPage;
