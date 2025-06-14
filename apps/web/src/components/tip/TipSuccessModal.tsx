import { CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { routes } from "@/lib/router";

interface TipSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  recipient: string;
  transactionId?: string;
}

export const TipSuccessModal = ({
  isOpen,
  onClose,
  amount,
  recipient,
  transactionId,
}: TipSuccessModalProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onClose();
    void navigate(routes.home);
  };

  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md rounded-[30px] p-6" showCloseButton={false}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-black">Tip Sent!</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Your tip has been sent successfully to {formatAddress(recipient)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-6">
          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="text-lg font-semibold text-black">${amount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">To</span>
              <span className="text-sm font-mono text-black">{formatAddress(recipient)}</span>
            </div>
            {transactionId && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Transaction ID</span>
                <span className="text-sm font-mono text-black">{formatAddress(transactionId)}</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="space-y-2">
          <Button onClick={handleGoHome} className="w-full">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
