import Header from "./Header";
import Chats from "./Chats";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import useAuthStorage from "../hooks/useAuthStorage";

import { useEffect } from "react";
import { View, Text } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const Main = () => {
  const authStorage = useAuthStorage();

  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const fetchToken = async () => {
      console.log("Fetching token...");
      const accessToken = await authStorage.getAccessToken();
      console.log("Access token:", accessToken);
    };
    fetchToken();
  }, []);

  if (loading) {
    return (
      <View className="flex flex-grow justify-center items-center">
        <Header />
        <View className="flex flex-grow justify-center items-center">
          <Text className="text-4xl font-bold text-slate-200">Loading...</Text>
        </View>
      </View>
    );
  }

  console.log("Current user: ", data?.me);

  return (
    <View className="flex flex-grow justify-center items-center">
      <Header />
      <Routes>
        <Route path="/" element={data?.me ? <Chats /> : <SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
