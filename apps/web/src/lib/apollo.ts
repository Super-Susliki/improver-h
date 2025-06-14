import { env } from "@/env";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: env.VITE_SUBGRAPH_URL,
  headers: {
    Authorization: `Bearer ${env.VITE_SUBGRAPH_API_KEY}`,
  },
});

// Create the Apollo Client instance with read-only configuration
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
