import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { HistoryItem } from "@/components/establishment-history/history-item";
import { Button } from "@/components/ui/button";
import { useSubmittedSignatures } from "@/lib/subgraph/hooks";

const EstablishmentHistoryPage = () => {
  const { data } = useSubmittedSignatures("0x123");

  const handleExportAsCSV = async () => {
    const csv = data?.map((item) => ({
      "Transaction Hash": item.transactionHash,
      Merchant: item.merchant,
      User: item.user,
      Time: new Date(item.blockTimestamp * 1000).toLocaleString(),
      "Store ID Hash": item.storeIdHash,
      Signature: item.signature,
      ID: item.id,
    }));

    const headers = Object.keys(csv?.[0] || {}).join(",");
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers +
      "\n" +
      csv?.map((e) => Object.values(e).join(",")).join("\n");

    // Create and trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `history-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DarkTopPage
      top={[
        <DarkTopPageBackButton route="/" className="col-span-1" />,
        <DarkTopPageTitle className="col-span-3">McDonalds's history</DarkTopPageTitle>,
      ]}
    >
      <DarkTopPageContent>
        <div className="flex relative flex-col gap-5 pb-20">
          <div className="flex flex-col gap-5">
            {data?.map((item) => <HistoryItem key={item.id} {...item} />)}
            {(!data || data?.length === 0) && (
              <div className="text-center text-base text-light-gray">
                <p>No history found</p>
              </div>
            )}
          </div>

          <Button
            disabled={!data || data?.length === 0}
            className="fixed bottom-20 max-w-[430px] w-[calc(100vw-45px)] mobile:w-full"
            onClick={handleExportAsCSV}
          >
            Export as CSV
          </Button>
        </div>
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

EstablishmentHistoryPage.displayName = "EstablishmentHistoryPage";

export default EstablishmentHistoryPage;
