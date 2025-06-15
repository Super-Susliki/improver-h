import type { UseSubmittedSignature } from "@/lib/subgraph/hooks";
import { HistoryRow } from "./history-row";
import { CopyButton } from "../ui/copy-button";
import { shortenAddress } from "@/lib/utils";
import { ExternalLinkButton } from "../ui/external-link-button";

interface Props extends UseSubmittedSignature {}

export const HistoryItem = ({ blockTimestamp, merchant, user, transactionHash }: Props) => {
  return (
    <div className="flex flex-col gap-3 border border-[#E5E7EB] rounded-[20px] p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <HistoryRow
        title="Transaction Hash"
        value={
          <div className="flex items-center gap-2">
            <p className="text-gray-900 font-medium">{shortenAddress(transactionHash)}</p>
            <ExternalLinkButton href={`https://sepolia.basescan.org/tx/${transactionHash}`} />
          </div>
        }
      />
      <div className="h-px bg-gray-100 my-1" />
      <HistoryRow
        title="Merchant"
        value={
          <div className="flex items-center gap-2">
            <p className="text-gray-900">{shortenAddress(merchant)}</p>
            <CopyButton data={merchant} />
          </div>
        }
      />
      <HistoryRow
        title="User"
        value={
          <div className="flex items-center gap-2">
            <p className="text-gray-900">{shortenAddress(user)}</p>
            <CopyButton data={user} />
          </div>
        }
      />
      <HistoryRow
        title="Time"
        value={
          <p className="text-gray-900">
            {new Date(blockTimestamp * 1000).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        }
      />
    </div>
  );
};
