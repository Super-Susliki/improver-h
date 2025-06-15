import { useParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

import {
  DarkTopPage,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/common/Loader";
import { EstablishmentDetailsContent } from "@/components/establishment-details/establishment-details-content";
import { useStore } from "@/lib/api";
import { routes } from "@/lib/router";
import { cn } from "@/lib/utils";

const ThemedBackButton = ({ route, isBlackTheme }: { route: string; isBlackTheme: boolean }) => {
  const navigate = useNavigate();
  const onBack = () => {
    return navigate(route);
  };

  return (
    <div className="flex">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "rounded-full bg-transparent size-[44px] p-0",
          isBlackTheme
            ? "border border-black text-black hover:bg-black/10"
            : "border border-white text-white hover:bg-white/10"
        )}
        onClick={() => {
          void onBack();
        }}
      >
        <ChevronLeft size={32} />
      </Button>
    </div>
  );
};

export const EstablishmentDetailsPage = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const { data: store, isLoading, error } = useStore(storeId ?? "");

  if (isLoading) return <Loader />;

  if (error || !store) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load store details</p>
      </div>
    );
  }

  const isBlackTheme = store.theme === "black";

  return (
    <DarkTopPage
      className={"bg-gray-600"}
      style={{
        backgroundPosition: "top center",
        backgroundSize: "auto 382px",
        backgroundRepeat: "no-repeat",
        backgroundColor: "black",
        backgroundImage: store.bannerUrl ? `url(${store.bannerUrl})` : "none",
      }}
      top={[
        <ThemedBackButton route={routes.establishments} isBlackTheme={isBlackTheme} />,
        <DarkTopPageTitle
          className={`col-span-3 text-center ${isBlackTheme ? "text-black" : ""} px-3 py-2 rounded-lg backdrop-blur-xs bg-white/10`}
        >
          {store.name}
        </DarkTopPageTitle>,
        <div></div>,
        <div className="col-span-5 flex items-center pt-5 justify-center">
          <div className="w-[140px] h-[140px] rounded-[30px] p-5 flex items-center justify-center bg-white">
            {store.logoUrl ? (
              <img src={store.logoUrl} alt={store.name} className="w-full h-full object-contain" />
            ) : (
              <div className="text-gray-400 text-center text-sm">No Logo</div>
            )}
          </div>
        </div>,
        <div className="col-span-5 flex flex-col gap-2.5 rounded-[30px] mt-2.5 p-5 bg-[#FFFFFF99] backdrop-blur-[5px] ">
          <p className="font-medium text-xl text-black">{store.name}</p>
          <p className="text-sm text-black">{store.description ?? "No description available."}</p>
        </div>,
      ]}
    >
      <DarkTopPageContent>
        <EstablishmentDetailsContent storeId={storeId} />
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

EstablishmentDetailsPage.displayName = "EstablishmentDetailsPage";

export default EstablishmentDetailsPage;
