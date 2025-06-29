import { useQuery } from "@apollo/client";

import { GET_SUBMITTED_SIGNATURES_QUERY } from "./queries";
import { apolloClient } from "../apollo";
import { getAddress } from "viem";

export interface UseSubmittedSignature {
  id: string;
  merchant: string;
  user: string;
  storeIdHash: string;
  signature: string;
  transactionHash: string;
  blockTimestamp: number;
}

export function useSubmittedSignatures(storeIdHash?: string) {
  const { data, loading, error } = useQuery(GET_SUBMITTED_SIGNATURES_QUERY, {
    variables: { storeId: storeIdHash },
    client: apolloClient,
    skip: !storeIdHash,
  });

  return {
    data: data?.signatureSubmitteds?.map((v: any) => ({
      id: v.id,
      merchant: getAddress(v.merchant),
      user: getAddress(v.user),
      storeIdHash: v.storeId,
      signature: v.signature,
      transactionHash: v.transactionHash,
      blockTimestamp: +v.blockTimestamp,
    })) as UseSubmittedSignature[],
    loading,
    error,
  };
}
