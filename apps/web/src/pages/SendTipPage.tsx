import { BadgeDollarSign, ChevronRight, Loader2, QrCode, Wallet, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { TipSuccessModal, TipErrorModal } from "@/components/tip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useSendTip } from "@/hooks/use-send-tip";
import { useTipBalance } from "@/hooks/use-tip-balance";
import { routes } from "@/lib/router";

const SendTipPage = () => {
  const { balance, setBalance, to, setTo } = useTipBalance();
  const navigate = useNavigate();
  const { intMaxState, isFullyConnected } = useAuth();
  const { mutateAsync, isPending, error, reset } = useSendTip();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [lastTransactionHash, setLastTransactionHash] = useState<string | undefined>();

  const [fieldErrors, setFieldErrors] = useState<{
    to?: string;
    balance?: string;
  }>({});

  const validateForm = () => {
    const errors: typeof fieldErrors = {};

    // Validate recipient address
    if (!to.trim()) {
      errors.to = "Recipient address is required";
    } else if (to.length < 10) {
      errors.to = "Please enter a valid address";
    }

    // Validate amount
    const amount = parseFloat(balance);
    if (!balance.trim()) {
      errors.balance = "Amount is required";
    } else if (isNaN(amount) || amount <= 0) {
      errors.balance = "Please enter a valid amount";
    } else if (amount > 1000) {
      errors.balance = "Amount cannot exceed $1000";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendTip = async () => {
    // Reset previous errors
    reset();
    setFieldErrors({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Check IntMax connection
    if (!isFullyConnected) {
      setShowErrorModal(true);
      return;
    }

    try {
      const response = await mutateAsync({ address: to, value: balance });
      console.log("Tip response:", response);

      setLastTransactionHash(response.txHash);

      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Tip failed:", error);
      setShowErrorModal(true);
    }
  };

  const handleRetryTip = () => {
    setShowErrorModal(false);
    // Reset any previous errors
    reset();
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Reset form after successful tip
    setTo("");
    setBalance("15");
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const isFormValid = to.trim() && balance.trim() && parseFloat(balance) > 0;

  return (
    <>
      <DarkTopPage
        top={[
          <DarkTopPageBackButton route="/" className="col-span-1" />,
          <DarkTopPageTitle className="col-span-3">Send a tip</DarkTopPageTitle>,
        ]}
      >
        <DarkTopPageContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <Wallet />
                Send to
              </div>
              <div>
                <Input
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    // Clear error when user starts typing
                    if (fieldErrors.to) {
                      setFieldErrors((prev) => ({ ...prev, to: undefined }));
                    }
                  }}
                  className={`py-[20px] pl-[20px] rounded-[30px] text-[18px] ${
                    fieldErrors.to ? "border-red-500 focus-visible:border-red-500" : ""
                  }`}
                  placeholder="Enter recipient address"
                />
                {fieldErrors.to && (
                  <div className="flex items-center gap-2 mt-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{fieldErrors.to}</span>
                  </div>
                )}
              </div>
            </div>
            <Button onClick={() => void navigate(routes.scanQrCode)}>
              Or scan QR <QrCode />
            </Button>
          </div>
          <div className="flex flex-col gap-4 flex-1 justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <BadgeDollarSign />
                Leave a tip
              </div>
              <div className="border flex flex-col p-[20px] rounded-[30px] shadow-xs gap-[20px]">
                <div className="flex items-center justify-center">
                  <div className="text-black font-medium text-[40px]">$</div>
                  <div className="flex justify-items items-center">
                    <Input
                      value={balance}
                      onChange={(e) => {
                        const { value } = e.target;
                        // Only allow numbers and decimal point
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          setBalance(value);
                          // Clear error when user starts typing
                          if (fieldErrors.balance) {
                            setFieldErrors((prev) => ({ ...prev, balance: undefined }));
                          }
                        }
                      }}
                      className={`self-end text-center border-none shadow-none !text-[40px] font-medium my-0 ${
                        fieldErrors.balance ? "text-red-600" : ""
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                {fieldErrors.balance && (
                  <div className="flex items-center justify-center gap-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{fieldErrors.balance}</span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-[8px]">
                  <Button
                    className="bg-[#E0DBFC] text-black font-normal hover:bg-[#E0DBFC]/50"
                    onClick={() => {
                      setBalance("5");
                      if (fieldErrors.balance) {
                        setFieldErrors((prev) => ({ ...prev, balance: undefined }));
                      }
                    }}
                  >
                    $5
                  </Button>
                  <Button
                    className="bg-[#E0DBFC] text-black font-normal hover:bg-[#E0DBFC]/50"
                    onClick={() => {
                      setBalance("10");
                      if (fieldErrors.balance) {
                        setFieldErrors((prev) => ({ ...prev, balance: undefined }));
                      }
                    }}
                  >
                    $10
                  </Button>
                  <Button
                    className="bg-[#E0DBFC] text-black font-normal hover:bg-[#E0DBFC]/50"
                    onClick={() => {
                      setBalance("15");
                      if (fieldErrors.balance) {
                        setFieldErrors((prev) => ({ ...prev, balance: undefined }));
                      }
                    }}
                  >
                    $15
                  </Button>
                </div>
              </div>

              {/* Connection status warning */}
              {!isFullyConnected && (
                <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <p className="text-amber-600 text-sm">
                    {intMaxState.error ?? "Connecting to IntMax..."}
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={() => void handleSendTip()}
              disabled={isPending || !isFormValid || !isFullyConnected}
              className={
                !isFormValid || !isFullyConnected
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              }
            >
              {isPending && <Loader2 className="animate-spin" />}
              {isPending ? "Sending..." : "Send a Tip"}
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>
        </DarkTopPageContent>
      </DarkTopPage>

      {/* Success Modal */}
      <TipSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        amount={balance}
        recipient={to}
        transactionId={lastTransactionHash}
      />

      {/* Error Modal */}
      <TipErrorModal
        isOpen={showErrorModal}
        onClose={handleCloseErrorModal}
        onRetry={handleRetryTip}
        amount={balance}
        recipient={to}
        error={error?.message ?? (!isFullyConnected ? "IntMax not connected" : undefined)}
      />
    </>
  );
};

SendTipPage.displayName = "SendTipPage";

export default SendTipPage;
