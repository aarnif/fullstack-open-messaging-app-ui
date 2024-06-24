import Header from "./Header";
import Chats from "./Chats/index";
import ChatView from "./Chats/ChatView/index";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Contacts from "./Contacts/index";
import useAuthStorage from "../hooks/useAuthStorage";
import useNotify from "../hooks/useNotify";
import LoadingIcon from "./LoadingIcon";
import NewChatModal from "./NewChatModal";

import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const Main = () => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const authStorage = useAuthStorage();
  const notify = useNotify();

  const { data, error, loading } = useQuery(GET_CURRENT_USER);

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
          <LoadingIcon />
        </View>
      </View>
    );
  }

  console.log("Current user: ", data?.me);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
      <View style={{ flex: 1 }} className="bg-white">
        <StatusBar style="light" />
        <Routes>
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route
            path="/chats"
            element={
              data?.me ? (
                <Chats
                  user={data?.me}
                  setShowNewChatModal={setShowNewChatModal}
                />
              ) : (
                <SignIn notify={notify} />
              )
            }
          />
          <Route path="/chats/:id" element={<ChatView user={data?.me} />} />
          <Route path="/signin" element={<SignIn notify={notify} />} />
          <Route path="/signup" element={<SignUp notify={notify} />} />
          <Route
            path="/contacts"
            element={
              <Contacts
                user={data?.me}
                setShowNewChatModal={setShowNewChatModal}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {showNewChatModal && (
          <NewChatModal
            user={data?.me}
            notify={notify}
            showNewChatModal={showNewChatModal}
            setShowNewChatModal={setShowNewChatModal}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Main;
