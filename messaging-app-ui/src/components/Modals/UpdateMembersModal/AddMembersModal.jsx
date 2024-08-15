import { GET_CONTACTS_BY_USER } from "../../../graphql/queries";

import useNotifyMessage from "../../../hooks/useNotifyMessage";
import SearchBar from "../../SearchBar";
import SelectContactsList from "../../SelectContactsList";
import LoadingIcon from "../../LoadingIcon";

import { Modal, SafeAreaView, View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";
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

const AddMembersModal = ({
  user,
  chat,
  showAddMembersModal,
  setShowAddMembersModal,
  addChatMembers,
  setIsLoading,
}) => {
  const notifyMessage = useNotifyMessage();
  const [chosenUsersIds, setChosenUsersIds] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [debouncedSearchByName] = useDebounce(searchByName, 500);

  console.log("Chosen users:", chosenUsersIds);

  const data = useQuery(GET_CONTACTS_BY_USER, {
    variables: {
      searchByName: debouncedSearchByName,
    },
  });

  const navigate = useNavigate();

  const goBack = () => {
    console.log("Go back to edit chat page!");
    setShowAddMembersModal(false);
  };

  const handlePress = async () => {
    console.log("Press add new members to the chat!");
    console.log("Chosen users:", chosenUsersIds);

    try {
      console.log("Added new members to the chat!");
      setIsLoading(true);
      setShowAddMembersModal(false);
      navigate(`/chats/${chat.id}`);
      await addChatMembers({
        variables: {
          chatId: chat.id,
          participants: chosenUsersIds,
        },
      });
      setIsLoading(false);
      notifyMessage.show({
        content: "Members added!",
        isError: false,
      });
    } catch (error) {
      console.log("Error adding new members to the chat:", error);
    }
  };

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByName(text);
  };

  return (
    <Modal animationType="slide" visible={showAddMembersModal}>
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
            <Text className="text-xl text-white font-bold">Add Members</Text>
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
        {data.loading ? (
          <View className="flex-grow flex justify-start items-center bg-white dark:bg-slate-700">
            <LoadingIcon />
          </View>
        ) : (
          <SelectContactsList
            user={user}
            data={data.data?.allContactsByUser.contacts
              .map((contact) => {
                const checkIfUserAlreadyInChat = chat.participants.find(
                  (participant) => participant.id === contact.id
                );

                if (checkIfUserAlreadyInChat) return null;

                return contact;
              })
              .filter((contact) => contact !== null)}
            chosenUsersIds={chosenUsersIds}
            setChosenUsersIds={setChosenUsersIds}
            setShowAddMembersModal={setShowAddMembersModal}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default AddMembersModal;
