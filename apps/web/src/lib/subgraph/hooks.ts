import { useQuery } from "@apollo/client";

import { GET_SUBMITTED_SIGNATURES_QUERY } from "./queries";
import { apolloClient } from "../apollo";
import { getAddress } from "viem";

export function useSubmittedSignatures(storeIdHash: string) {
  const { data, loading, error } = useQuery(GET_SUBMITTED_SIGNATURES_QUERY, {
    variables: { storeId: storeIdHash },
    client: apolloClient,
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
    })),
    loading,
    error,
  };
}
