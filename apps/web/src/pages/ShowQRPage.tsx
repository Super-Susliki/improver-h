import { Copy, Check } from "lucide-react";
import { useState } from "react";
import QRCode from "react-qr-code";

import {
  LightTopPage,
  LightTopPageBackButton,
  LightTopPageContent,
  LightTopPageTitle,
} from "@/components/common/light-top-page";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/lib/router";

const ShowQRPage = () => {
  const { privyUser, privyReady, privyAuthenticated } = useAuth();
  const [copied, setCopied] = useState(false);

  const handleCopyUserId = async () => {
    if (!privyUser?.id) return;

    try {
      await navigator.clipboard.writeText(privyUser.id);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy user ID:", err);
    }
  };

  return (
    <LightTopPage
      top={[
        <LightTopPageBackButton route={routes.home} className="col-span-1" />,
        <LightTopPageTitle className="col-span-3">Show QR</LightTopPageTitle>,
      ]}
    >
      <LightTopPageContent>
        <div className="flex flex-col items-center justify-center gap-6 flex-1">
          {!privyReady && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600">Loading...</p>
            </div>
          )}

          {privyReady && !privyAuthenticated && (
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <div>
                <p className="text-red-600 font-medium">Not authenticated</p>
                <p className="text-gray-600 text-sm mt-1">Please log in to view your QR code</p>
              </div>
            </div>
          )}

          {privyReady && privyAuthenticated && privyUser?.id && (
            <div className="flex flex-col items-center gap-5 w-full max-w-sm">
              {/* QR Code */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <QRCode
                  value={privyUser.id}
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox="0 0 256 256"
                />
              </div>

              {/* User ID Display */}
              <div className="w-full">
                <p className="text-sm text-gray-600 text-center mb-2">Your User ID</p>
                <div className="bg-gray-50 rounded-xl p-4 border">
                  <p className="text-sm font-mono text-center break-all">{privyUser.id}</p>
                </div>
              </div>

              {/* Copy Button */}
              <Button
                onClick={() => {
                  void handleCopyUserId();
                }}
                className="w-full bg-black hover:bg-gray-800 text-white rounded-xl h-12 flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check size={20} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Copy User ID
                  </>
                )}
              </Button>

              {/* Instructions */}
              <div className="text-center text-sm text-gray-600 mt-4">
                <p>Share this QR code to get bonuses from merchants</p>
              </div>
            </div>
          )}
        </div>
      </LightTopPageContent>
    </LightTopPage>
  );
};

export default ShowQRPage;
