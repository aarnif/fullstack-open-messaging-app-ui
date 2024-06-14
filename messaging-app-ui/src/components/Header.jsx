import { View, Text, Pressable } from "react-native";
import { useQuery, useApolloClient } from "@apollo/client";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";

import { GET_CURRENT_USER } from "../graphql/queries";

const Header = () => {
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  });
  const client = useApolloClient();

  const signOut = () => {
    console.log("Sign out!");
    authStorage.removeAccessToken();
    client.resetStore();
    navigate("/");
  };

  return (
    <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
      <View className="flex flex-row">
        <View className="flex-grow w-[100px] flex justify-center items-center"></View>
        <View className="flex-grow flex justify-center items-center">
          <Text className="text-xl text-white font-bold">Messaging App</Text>
        </View>
        <View className="flex-grow w-[100px] flex justify-center items-center">
          {data?.me && (
            <Pressable onPress={signOut}>
              <Text className="text-md text-white font-bold">Sign Out</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;
