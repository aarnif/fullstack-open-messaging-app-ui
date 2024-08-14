import { REMOVE_CHAT_MEMBERS } from "../../../graphql/mutations";
import useNotifyMessage from "../../../hooks/useNotifyMessage";

import SearchBar from "../../SearchBar";
import SelectContactsList from "../../SelectContactsList";
import LoadingIconWithOverlay from "../../LoadingIconWithOverlay";

import { Modal, SafeAreaView, View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { useMutation } from "@apollo/client";

import { useNavigate } from "react-router-native";

const SearchBarContainer = ({ searchByTitle, handleChange }) => {
  return (
    <View className="py-2 w-full bg-white dark:bg-slate-700">
      <SearchBar
        placeholder={"Search by name..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const RemoveMembersModal = ({
  user,
  chat,
  showRemoveMembersModal,
  setShowRemoveMembersModal,
}) => {
  const notifyMessage = useNotifyMessage();
  const [chosenUsersIds, setChosenUsersIds] = useState([]);
  const [searchByName, setSearchByName] = useState("");

  console.log("Chosen users:", chosenUsersIds);

  const [mutate, loading] = useMutation(REMOVE_CHAT_MEMBERS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  console.log("Loading:", loading.loading);

  const navigate = useNavigate();

  const goBack = () => {
    console.log("Go back to chats page!");
    setShowRemoveMembersModal(false);
  };

  const handlePress = async () => {
    console.log("Press remove members from the chat!");
    console.log("Chosen users:", chosenUsersIds);

    try {
      await mutate({
        variables: {
          chatId: chat.id,
          participants: chosenUsersIds,
        },
      });
      console.log("Remove members from the chat!");
      setShowRemoveMembersModal(false);
      navigate(`/chats/${chat.id}`);
      notifyMessage.show({
        content: "Members removed from the chat!",
        isError: false,
      });
    } catch (error) {
      console.log("Error removing members from the chat:", error);
    }
  };

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByName(text);
  };

  return (
    <Modal animationType="slide" visible={showRemoveMembersModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
          <View className="w-[70px] flex justify-center items-center">
            <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
              <Pressable onPress={goBack}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </Pressable>
            </View>
          </View>
          <View className="flex-grow flex justify-center items-center">
            <Text className="text-xl text-white font-bold">Remove Members</Text>
          </View>
          <View className="w-[70px] flex justify-center items-center">
            <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
              <Pressable onPress={handlePress}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color="white"
                />
              </Pressable>
            </View>
          </View>
        </View>
        <SearchBarContainer
          searchByTitle={searchByName}
          handleChange={handleChange}
        />

        <SelectContactsList
          user={user}
          data={chat.participants.filter(
            (participant) => participant.id !== user.id
          )}
          chosenUsersIds={chosenUsersIds}
          setChosenUsersIds={setChosenUsersIds}
          setShowRemoveMembersModal={setShowRemoveMembersModal}
        />
      </SafeAreaView>
      {loading.loading && (
        <LoadingIconWithOverlay loadingMessage={"Removing members..."} />
      )}
    </Modal>
  );
};

export default RemoveMembersModal;
