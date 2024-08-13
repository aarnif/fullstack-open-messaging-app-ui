import NotifyMessageContext from "../contexts/NotifyMessageContext";

import useAuthStorage from "../hooks/useAuthStorage";
import useThemeStorage from "../hooks/useThemeStorage";
import useShowNotifyMessage from "../hooks/useShowNotifyMessage";

import Header from "./Header";
import Chats from "./Chats/index";
import ChatView from "./ChatView/index";
import ContactView from "./Contacts/ContactView";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Contacts from "./Contacts/index";
import Profile from "./Profile/index";
import Settings from "./Settings/index";
import LoadingIcon from "./LoadingIcon";
import NewChatModal from "./Modals/NewChatModal";
import NewContactModal from "./Modals/NewContactModal";
import EditProfileModal from "./Modals/EditProfileModal";
import NotifyMessage from "./NotifyMessage";

import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import { useQuery } from "@apollo/client";

import { GET_CURRENT_USER } from "../graphql/queries";

const Main = () => {
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const authStorage = useAuthStorage();
  const themeStorage = useThemeStorage();
  const showNotifyMessage = useShowNotifyMessage();

  const { data, error, loading } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    const fetchToken = async () => {
      console.log("Fetching token...");
      const accessToken = await authStorage.getAccessToken();
      console.log("Access token:", accessToken);
    };
    const fetchTheme = async () => {
      console.log("Fetching theme...");
      const currentTheme = await themeStorage.getTheme();
      if (colorScheme !== currentTheme) {
        console.log("Setting theme to:", currentTheme);
        toggleColorScheme();
      }
    };
    fetchToken();
    fetchTheme();
  }, []);

  useEffect(() => {
    const setTheme = async () => {
      if (colorScheme !== data?.me.settings.theme) {
        console.log("Setting theme to:", data?.me.settings.theme);
        toggleColorScheme();
      }
    };
    if (data?.me) {
      setTheme();
    }
  }, [data]);

  const handleNewChatPress = () => {
    console.log("New Chat modal button pressed!");
    setShowNewChatModal(true);
  };

  const handleNewContactPress = () => {
    console.log("New Contact modal button pressed!");
    setShowNewContactModal(true);
  };

  const handleEditProfilePress = () => {
    console.log("Edit Profile modal button pressed!");
    setShowEditProfileModal(true);
  };

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
    <NotifyMessageContext.Provider value={showNotifyMessage}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <View style={{ flex: 1 }} className="bg-white dark:bg-slate-700">
          <StatusBar style="light" />
          <Routes>
            <Route path="/" element={<Navigate to="/chats" replace />} />
            <Route
              path="/chats"
              element={
                data?.me ? (
                  <Chats
                    user={data?.me}
                    handleNewChatPress={handleNewChatPress}
                  />
                ) : (
                  <SignIn />
                )
              }
            />
            <Route path="/chats/:id" element={<ChatView user={data?.me} />} />
            <Route
              path="/contacts/:id"
              element={<ContactView user={data?.me} />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/contacts"
              element={
                <Contacts
                  user={data?.me}
                  handleNewContactPress={handleNewContactPress}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  user={data?.me}
                  handleEditProfilePress={handleEditProfilePress}
                />
              }
            />
            <Route path="/settings" element={<Settings user={data?.me} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {showNewChatModal && (
            <NewChatModal
              user={data?.me}
              notify={showNotifyMessage}
              showNewChatModal={showNewChatModal}
              setShowNewChatModal={setShowNewChatModal}
            />
          )}
          {showNewContactModal && (
            <NewContactModal
              user={data?.me}
              showNewContactModal={showNewContactModal}
              setShowNewContactModal={setShowNewContactModal}
            />
          )}
          {showEditProfileModal && (
            <EditProfileModal
              user={data?.me}
              showEditProfileModal={showEditProfileModal}
              setShowEditProfileModal={setShowEditProfileModal}
            />
          )}
        </View>
        <NotifyMessage />
      </SafeAreaView>
    </NotifyMessageContext.Provider>
  );
};

export default Main;
