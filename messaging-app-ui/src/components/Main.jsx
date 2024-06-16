import Header from "./Header";
import Chats from "./Chats/index";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import useAuthStorage from "../hooks/useAuthStorage";
import useNotify from "../hooks/useNotify";

import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const Main = () => {
  const authStorage = useAuthStorage();
  const notify = useNotify();

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
    <SafeAreaView className="bg-green-600">
      <StatusBar style="light" />
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            data?.me ? (
              <Chats userId={data?.me.id} />
            ) : (
              <SignIn notify={notify} />
            )
          }
        />
        <Route path="/signin" element={<SignIn notify={notify} />} />
        <Route path="/signup" element={<SignUp notify={notify} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SafeAreaView>
  );
};

export default Main;
