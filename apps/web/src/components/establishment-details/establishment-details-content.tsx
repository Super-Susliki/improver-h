import { useState } from "react";

import { SendTipCard } from "../pages/home/SendTipCard";
import { QRCodeIcon } from "../svg";
import { Button } from "../ui/button";

import { ActionButtons } from "./action-buttons";
import { QRScannerModal } from "./qr-scanner-modal";
import { SocialMedia } from "./social-media";

interface Props {
  storeId: string | undefined;
}

export const EstablishmentDetailsContent = ({ storeId }: Props) => {
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        <Button
          className="flex gap-1 items-center"
          onClick={() => {
            setIsQRScannerOpen(true);
          }}
        >
          <QRCodeIcon className="size-[26px]" color="white" />
          Scan QR
        </Button>
        <SendTipCard />
      </div>
      <ActionButtons />
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
