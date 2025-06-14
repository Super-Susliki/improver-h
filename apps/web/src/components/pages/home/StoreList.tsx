import { useUserStores } from "@/lib/api";

export const StoreList = () => {
  const { data: stores } = useUserStores();
  return (
    <div className="grid grid-cols-3 gap-[10px]">
      {stores?.map((store) => <div key={store.id}>{store.name}</div>)}
    </div>
  );
};

StoreList.displayName = "StoreList";
