import {
  DarkTopPage,
  DarkTopPageBackButton,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { EstablishmentDetailsContent } from "@/components/establishment-details/establishment-details-content";
import { routes } from "@/lib/router";

export const EstablishmentDetailsPage = () => {
  return (
    <DarkTopPage
      className="bg-[url('https://rau.ua/wp-content/uploads/2018/05/mcdonalds.jpg')] bg-cover bg-center"
      top={[
        <DarkTopPageBackButton route={routes.establishments} />,
        <DarkTopPageTitle className="col-span-3 text-center">McDonald's</DarkTopPageTitle>,
        <div></div>,
        <div className="col-span-5 flex items-center pt-5 justify-center">
          <div className="w-[140px] h-[140px] rounded-[30px] p-5 flex items-center justify-center bg-white">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/640px-McDonald%27s_Golden_Arches.svg.png"
              }
              alt="Mcdonalsd"
            />
          </div>
        </div>,
        <div className="col-span-5 flex flex-col gap-2.5 rounded-[30px] mt-2.5 p-5 bg-[#FFFFFF99] backdrop-blur-[5px] ">
          <p className="text-black font-medium text-xl">McDonalds</p>
          <p className="text-black text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
          </p>
        </div>,
      ]}
    >
      <DarkTopPageContent>
        <EstablishmentDetailsContent />
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

EstablishmentDetailsPage.displayName = "EstablishmentDetailsPage";

export default EstablishmentDetailsPage;
