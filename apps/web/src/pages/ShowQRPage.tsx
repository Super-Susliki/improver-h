import QRCode from "react-qr-code";

import {
  LightTopPage,
  LightTopPageBackButton,
  LightTopPageContent,
  LightTopPageTitle,
} from "@/components/common/light-top-page";
import { useAuth } from "@/contexts/AuthContext";
import { routes } from "@/lib/router";

const ShowQRPage = () => {
  const { privyUser, privyReady, privyAuthenticated } = useAuth();

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
