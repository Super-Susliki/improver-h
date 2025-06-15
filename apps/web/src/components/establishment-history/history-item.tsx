import type { UseSubmittedSignature } from "@/lib/subgraph/hooks";
import { HistoryRow } from "./history-row";
import { CopyButton } from "../ui/copy-button";
import { shortenAddress } from "@/lib/utils";
import { ExternalLinkButton } from "../ui/external-link-button";

interface Props extends UseSubmittedSignature {}

export const HistoryItem = ({ blockTimestamp, merchant, user, transactionHash }: Props) => {
  return (
    <div className="flex flex-col gap-2.5 border border-[#DADADA] rounded-[30px] p-2.5">
      <HistoryRow
        title="Transaction Hash"
        value={
          <div className="flex items-center gap-1">
            <p>{shortenAddress(transactionHash)}</p>
            <ExternalLinkButton href={`https://sepolia.basescan.org/tx/${transactionHash}`} />
          </div>
        }
      />
      <HistoryRow
        title="Merchant"
        value={
          <div className="flex items-center gap-1">
            <p>{shortenAddress(merchant)}</p>
            <CopyButton data={merchant} />
          </div>
        }
      />
      <HistoryRow
        title="User"
        value={
          <div className="flex items-center gap-1">
            <p>{shortenAddress(user)}</p>
            <CopyButton data={user} />
          </div>
        }
      />
      <HistoryRow
        title="Time"
        value={
          <p>
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
