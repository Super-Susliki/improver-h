import { useUserStores } from "@/lib/api";
import { useAccount } from "wagmi";

export const StoreList = () => {
  const { address } = useAccount();
  const { data: stores } = useUserStores(address);

  return (
    <div className="grid grid-cols-3 gap-[10px]">
      {stores?.stores?.map((store) => <div key={store.storeId}>{store.store.name}</div>)}
    </div>
  );
};

StoreList.displayName = "StoreList";
