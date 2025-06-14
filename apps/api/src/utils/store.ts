import type { Store } from '@prisma/client';
import { keccak256 } from 'viem';

export const storeWithHashedId = <TStore extends Store>(
  store: TStore,
): TStore & { idHash: `0x${string}` } => {
  return {
    ...store,
    idHash: keccak256(`0x${Buffer.from(store.id, 'utf-8').toString('hex')}`),
  };
};

export const storesWithHashedId = <TStore extends Store>(
  stores: TStore[],
): (TStore & { idHash: `0x${string}` })[] => {
  return stores.map((store) => ({
    ...store,
    idHash: keccak256(`0x${Buffer.from(store.id, 'utf-8').toString('hex')}`),
  }));
};
