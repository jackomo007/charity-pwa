import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://84ea-3-89-31-172.ngrok-free.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
