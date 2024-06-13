import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://87.92.93.239:4000/",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
