import { gql } from "@apollo/client";

export const GET_SUBMITTED_SIGNATURES_QUERY = gql`
  query GetSubmittedSignatures($storeId: String!) {
    signatureSubmitteds(
      first: 1000
      where: { storeId: $storeId }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      merchant
      user
      storeId
      signature
      transactionHash
      blockTimestamp
    }
  }
`;
