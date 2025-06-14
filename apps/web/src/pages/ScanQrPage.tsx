import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router";

import {
  LightTopPage,
  LightTopPageBackButton,
  LightTopPageContent,
  LightTopPageTitle,
} from "@/components/common/light-top-page";
import { useTipBalance } from "@/hooks/use-tip-balance";
import { routes } from "@/lib/router";

const ScanQrPage = () => {
  const navigate = useNavigate();
  const setTo = useTipBalance((s) => s.setTo);

  const onScan = (result: IDetectedBarcode[]) => {
    const r = result[0];
    if (!r) {
      return;
    }

    setTo(r.rawValue);
    void navigate(routes.sendTip);
  };

  return (
    <LightTopPage
      top={[
        <LightTopPageBackButton route={routes.sendTip} className="col-span-1" />,
        <LightTopPageTitle className="col-span-3">Scan QR code</LightTopPageTitle>,
      ]}
    >
      <LightTopPageContent>
        <div className="flex flex-col justify-between flex-1">
          <Scanner
            onScan={onScan}
            classNames={{
              container: "flex-1 w-full",
            }}
          />
        </div>
      </LightTopPageContent>
    </LightTopPage>
  );
};

export default ScanQrPage;
