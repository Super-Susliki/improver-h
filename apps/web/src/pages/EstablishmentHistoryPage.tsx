import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { Button } from "@/components/ui/button";
import { useSubmittedSignatures } from "@/lib/subgraph/hooks";

const EstablishmentHistoryPage = () => {
  const { data } = useSubmittedSignatures("0x123");

  const handleExportAsCSV = async () => {};

  return (
    <DarkTopPage
      top={[
        <DarkTopPageBackButton route="/" className="col-span-1" />,
        <DarkTopPageTitle className="col-span-3">Establishment history</DarkTopPageTitle>,
      ]}
    >
      <DarkTopPageContent>
        <div className="flex flex-col gap-5">
          <Button>Export as CSV</Button>
        </div>
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

EstablishmentHistoryPage.displayName = "EstablishmentHistoryPage";

export default EstablishmentHistoryPage;
