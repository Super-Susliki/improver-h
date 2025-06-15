import { useMemo, useState } from "react";

import { SendTipCard } from "../pages/home/SendTipCard";
import { QRCodeIcon } from "../svg";
import { Button } from "../ui/button";

import { ActionButtons } from "./action-buttons";
import { QRScannerModal } from "./qr-scanner-modal";
import { SocialMedia } from "./social-media";
import { useMerchantStores } from "@/lib/api";

interface Props {
  storeId: string | undefined;
}

export const EstablishmentDetailsContent = ({ storeId }: Props) => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  const { data: stores } = useMerchantStores();

  const store = useMemo(() => {
    return stores?.find((store) => store.id === storeId);
  }, [stores, storeId]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        {store && (
          <Button
            className="flex gap-1 items-center mb-5 "
            onClick={() => {
              setIsQRScannerOpen(true);
            }}
          >
            <QRCodeIcon className="size-[26px]" color="white" />
            Scan customer&apos;s QR
          </Button>
        )}
        <SendTipCard />
      </div>
      <ActionButtons storeId={storeId} />
      <SocialMedia />

      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => {
          setIsQRScannerOpen(false);
        }}
        storeId={storeId}
      />
    </div>
  );
};
