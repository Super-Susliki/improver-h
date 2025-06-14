import {
  DarkTopPage,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { useIntMaxDeposits } from "@/hooks/use-int-max-deposits";
import type { Transaction } from "intmax2-client-sdk";
import { useMemo } from "react";
import { formatUnits, parseUnits } from "viem";

const payments = [
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
  {
    date: new Date(),
    payments: [
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
      {
        amount: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpWEuGNJdWjitoA-uFMXPivWnrEc5px6n6KQ&s",
        name: "Aroma Coffee",
      },
    ],
  },
];

const TipsHistoryPage = () => {
  const { data, isLoading, error } = useIntMaxDeposits();

  console.log({ data, isLoading, error });

  const dataGrouped = useMemo(() => {
    // if (!data) return [];

    return Object.entries(
      data?.reduce<Record<string, Transaction[]>>((acc, curr) => {
        const dateStartTs = Math.floor(curr.timestamp / 86400) * 86400;
        acc[dateStartTs] = acc[dateStartTs] || [];
        acc[dateStartTs].push(curr);
        return acc;
      }, {}) ?? {}
    );
  }, [data]);

  return (
    <DarkTopPage
      topClassName="relative"
      top={[<DarkTopPageTitle className="col-span-4 text-left">Tips history</DarkTopPageTitle>]}
    >
      <DarkTopPageContent>
        <div className="flex gap-4 flex-col">
          {dataGrouped?.map(([dateStartTs, payments]) => (
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
                      className="flex items-center p-4 gap-4 border  rounded-[20px] border-[#DADADA]"
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
          {!dataGrouped?.length && (
            <div className="text-center text-sm text-[#00000066]">No historical data</div>
          )}
        </div>
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

TipsHistoryPage.displayName = "TipsHistoryPage";

export default TipsHistoryPage;
