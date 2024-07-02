import { GET_CONTACTS_BY_USER } from "../../../../graphql/queries";
import { REMOVE_CHAT_MEMBERS } from "../../../../graphql/mutations";
import LoadingIcon from "../../../LoadingIcon";
import SearchBar from "../../../SearchBar";
import ContactsList from "./ContactsList";

import { Modal, SafeAreaView, View, Text, Pressable } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";

const SearchBarContainer = ({ searchByTitle, handleChange }) => {
  return (
    <View className="py-2 w-full bg-white">
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
  const [chosenUsersIds, setChosenUsersIds] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [debouncedSearchByName] = useDebounce(searchByName, 500);

  console.log("Chosen users:", chosenUsersIds);

  const data = useQuery(GET_CONTACTS_BY_USER, {
    variables: {
      searchByName: debouncedSearchByName,
    },
  });

  const [mutate] = useMutation(REMOVE_CHAT_MEMBERS, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

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
        {data.loading ? (
          <View className="flex-grow flex justify-start items-center bg-white">
            <LoadingIcon />
          </View>
        ) : (
          <ContactsList
            user={user}
            data={data.data?.allContactsByUser.contacts
              .map((contact) => {
                const checkIfUserAlreadyInChat = chat.participants.find(
                  (participant) => participant.id === contact.id
                );

                if (checkIfUserAlreadyInChat) return contact;

                return null;
              })
              .filter((contact) => contact !== null)}
            chosenUsersIds={chosenUsersIds}
            setChosenUsersIds={setChosenUsersIds}
            setShowRemoveMembersModal={setShowRemoveMembersModal}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default RemoveMembersModal;
