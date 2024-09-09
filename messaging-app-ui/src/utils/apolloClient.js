import Constants from "expo-constants";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = createHttpLink({
  uri: Constants.expoConfig.extra.apolloUri,
});

const getContext = async (authStorage) => {
  const accessToken = await authStorage.getAccessToken();
  return {
    headers: {
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
};

const createWsLink = (authStorage) =>
  new GraphQLWsLink(
    createClient({
      url: Constants.expoConfig.extra.wsUri,
      connectionParams: async () => {
        return await getContext(authStorage);
      },
    })
  );

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      return await getContext(authStorage);
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    createWsLink(authStorage),
    authLink.concat(httpLink)
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
