import { EstablishmentCard } from "@/components/establishment/establishment-card";
import { useUserStores } from "@/lib/api";

export const StoreList = () => {
  const { data: stores } = useUserStores();

  if (!stores?.length) {
    return (
      <div className="flex flex-col gap-2 py-6">
        <div className="text-base text-light-gray text-center">No establishments yet</div>
        <div className="text-base text-light-gray text-center">
          Show your QR code to merchant to get started
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2.5 mt-5">
      {stores.map((establishment) => (
        <EstablishmentCard
          key={establishment.id}
          id={establishment.id}
          className="w-[calc(33.333%-6.6666px)] relative pb-[calc(33.333%-6.6666px)]"
          name={establishment.name}
          image={establishment.logoUrl ?? null}
        />
      ))}
    </div>
  );
};

StoreList.displayName = "StoreList";
