import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://charity-8ba6095og-angels-projects-1a4dcd1f.vercel.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
