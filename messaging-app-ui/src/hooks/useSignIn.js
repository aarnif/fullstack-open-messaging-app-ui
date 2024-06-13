import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const [mutate, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });
    await authStorage.setAccessToken(data.login.value);
    client.resetStore();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;
