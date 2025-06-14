import { useQuery } from "@apollo/client";

import { GET_SUBMITTED_SIGNATURES_QUERY } from "./queries";
import { apolloClient } from "../apollo";

export function useSubmittedSignatures(storeIdHash: string) {
  const { data, loading, error } = useQuery(GET_SUBMITTED_SIGNATURES_QUERY, {
    variables: { storeId: storeIdHash },
    client: apolloClient,
  });

  return { data, loading, error };
}
