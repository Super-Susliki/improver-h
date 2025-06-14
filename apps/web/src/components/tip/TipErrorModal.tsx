import { AlertCircle, RotateCcw, Home } from "lucide-react";
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

interface TipErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  amount: string;
  recipient: string;
  error?: string;
}

export const TipErrorModal = ({
  isOpen,
  onClose,
  onRetry,
  amount,
  recipient,
  error,
}: TipErrorModalProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onClose();
    void navigate(routes.home);
  };

  const handleRetry = () => {
    onClose();
    onRetry();
  };

  const formatAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getErrorMessage = () => {
    if (!error) return "An unexpected error occurred while processing your tip.";

    if (error.includes("rejected")) {
      return "Transaction was rejected. Please try again.";
    }
    if (error.includes("insufficient")) {
      return "Insufficient balance to complete this transaction.";
    }
    if (error.includes("network")) {
      return "Network error. Please check your connection and try again.";
    }

    return error.length > 100 ? "Transaction failed. Please try again." : error;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md rounded-[30px] p-6" showCloseButton={false}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-semibold text-black">Tip Failed</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">{getErrorMessage()}</DialogDescription>
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
          </div>
        </div>

        <DialogFooter className="space-y-2">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              variant="outline"
              onClick={handleGoHome}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button onClick={handleRetry}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
