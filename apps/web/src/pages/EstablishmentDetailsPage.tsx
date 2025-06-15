import { useParams } from "react-router";

import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { Loader } from "@/components/common/Loader";
import { EstablishmentDetailsContent } from "@/components/establishment-details/establishment-details-content";
import { useStore } from "@/lib/api";
import { routes } from "@/lib/router";

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
        <DarkTopPageBackButton route={routes.establishments} />,
        <DarkTopPageTitle className="col-span-3 text-center">{store.name}</DarkTopPageTitle>,
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
          <p className="text-black font-medium text-xl">{store.name}</p>
          <p className="text-black text-sm">{store.description ?? "No description available."}</p>
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
