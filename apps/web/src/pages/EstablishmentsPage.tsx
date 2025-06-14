import { useMemo, useState } from "react";

import {
  DarkTopPage,
  DarkTopPageContent,
  DarkTopPageTitle,
} from "@/components/common/dark-top-page";
import { DarkTopSearch } from "@/components/common/dark-top-search";
import { EstablishmentCard } from "@/components/establishment/establishment-card";
import { Button } from "@/components/ui/button";
import { useMerchantStores, useUserStores } from "@/lib/api";

const EstablishmentsPage = () => {
  const [search, setSearch] = useState("");
  const { data: userStores } = useUserStores();
  const { data: merchantStores } = useMerchantStores();

  const userEstablishmentsToShow = useMemo(() => {
    if (!userStores) return [];
    return userStores.filter((store) => store.name.toLowerCase().includes(search.toLowerCase()));
  }, [userStores, search]);

  const merchantEstablishmentsToShow = useMemo(() => {
    if (!merchantStores) return [];
    return merchantStores.filter((store) =>
      store.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [merchantStores, search]);

  return (
    <DarkTopPage
      topClassName="relative"
      top={[
        <DarkTopPageTitle className="col-span-4 text-left">Establishments</DarkTopPageTitle>,
        <div className="h-11">
          <DarkTopSearch value={search} onChange={setSearch} />
        </div>,
      ]}
    >
      <DarkTopPageContent>
        {!merchantEstablishmentsToShow.length && !userEstablishmentsToShow.length && (
          <div className="flex flex-col gap-4">
            <div className="text-xl text-center">No establishments yet</div>
            <Button>Add establishment</Button>
          </div>
        )}
        {merchantEstablishmentsToShow.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="text-md text-center">Merchant</div>
            <div className="flex flex-wrap gap-2.5">
              {merchantEstablishmentsToShow.map((establishment) => (
                <EstablishmentCard
                  key={establishment.id}
                  className="w-[calc(33.333%-6.6666px)] relative pb-[calc(33.333%-6.6666px)]"
                  name={establishment.name}
                  image={establishment.logoUrl ?? null}
                />
              ))}
            </div>
          </div>
        )}
        {userEstablishmentsToShow.length > 0 && (
          <div className="flex flex-col gap-4">
            <div className="text-md text-center">Customer</div>
            <div className="flex flex-wrap gap-2.5">
              {userEstablishmentsToShow.map((establishment) => (
                <EstablishmentCard
                  key={establishment.id}
                  className="w-[calc(33.333%-6.6666px)] relative pb-[calc(33.333%-6.6666px)]"
                  name={establishment.name}
                  image={establishment.logoUrl ?? null}
                />
              ))}
            </div>
          </div>
        )}
      </DarkTopPageContent>
    </DarkTopPage>
  );
};

EstablishmentsPage.displayName = "EstablishmentsPage";

export default EstablishmentsPage;
