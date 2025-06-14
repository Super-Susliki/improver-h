import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useState, useEffect } from "react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useGrantBonus } from "@/lib/api";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  storeId: string | undefined;
}

type ScannerState = "scanning" | "scanned" | "granting" | "success" | "error";

export const QRScannerModal = ({ isOpen, onClose, storeId }: Props) => {
  const [state, setState] = useState<ScannerState>("scanning");
  const [scannedUserId, setScannedUserId] = useState("");

  const grantBonusMutation = useGrantBonus({
    storeId: storeId ?? "",
    userId: scannedUserId,
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setState("scanning");
      setScannedUserId("");
    }
  }, [isOpen]);

  const handleScan = (result: IDetectedBarcode[]) => {
    const r = result[0];
    if (!r) return;

    setScannedUserId(r.rawValue);
    setState("scanned");
  };

  const handleGrantBonus = async () => {
    if (!scannedUserId || !storeId) return;

    setState("granting");
    try {
      await grantBonusMutation.mutateAsync();
      setState("success");
    } catch (error) {
      console.error("Failed to grant bonus:", error);
      setState("error");
    }
  };

  const handleClose = () => {
    setScannedUserId("");
    onClose();
  };

  const handleRescan = () => {
    setScannedUserId("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {state === "scanning" && (
            <div className="relative">
              <Scanner
                onScan={handleScan}
                classNames={{
                  container: "w-full h-64 rounded-lg overflow-hidden",
                }}
              />
              <div className="text-center text-sm text-gray-600 mt-2">
                Point your camera at the user's QR code
              </div>
            </div>
          )}

          {(state === "scanned" ||
            state === "granting" ||
            state === "success" ||
            state === "error") && (
            <div className="space-y-4">
              {state === "success" && (
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-green-700 font-medium mb-2">
                      🎉 Points Awarded Successfully!
                    </div>
                    <div className="text-green-600 text-sm">Customer earned +1 loyalty point</div>
                  </div>

                  {/* Success Details */}
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <div className="text-sm text-gray-600 text-center">
                      <div className="font-medium text-gray-800">Transaction Complete</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Points have been added to customer's account
                      </div>
                      <div className="text-xs text-green-600 mt-2">
                        Automatically closing in 3 seconds...
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {state === "error" && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-lg text-center">
                  <div className="text-red-700 font-medium">Failed to Grant Bonus</div>
                  <div className="text-red-600 text-sm mt-1">Please try again</div>
                </div>
              )}

              {(state === "scanned" || state === "granting") && (
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-green-700 font-medium">Customer QR Code Scanned!</div>
                    <div className="text-green-600 text-sm mt-1">User ID: {scannedUserId}</div>
                  </div>

                  {/* Loyalty Points Info */}
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Points to Award:</div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-purple-600">+1</span>
                        <span className="text-sm text-gray-500">point</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Customer will earn loyalty points for this visit
                    </div>
                  </div>
                </div>
              )}

              {state !== "success" && (
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleRescan} className="flex-1 h-12">
                    Scan Again
                  </Button>
                  <Button
                    onClick={() => {
                      void handleGrantBonus();
                    }}
                    disabled={state === "granting"}
                    className="flex-1 h-12"
                  >
                    {state === "granting" ? "Granting..." : "Grant Bonus"}
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center border-t border-gray-100">
            <Button variant="ghost" onClick={handleClose} className="px-8">
              {state === "success" ? "Close" : "Cancel"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
