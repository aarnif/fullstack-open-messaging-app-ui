import {
  GET_CONTACTS_BY_USER,
  GET_CHAT_BY_PARTICIPANTS,
} from "../../graphql/queries";
import { CREATE_CHAT } from "../../graphql/mutations";
import LoadingIcon from "../LoadingIcon";
import SearchBar from "../SearchBar";
import ContactItem from "./ContactItem";

import Notify from "../Notify";

import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-native";

const ContactsHeader = ({ searchByTitle, handleChange }) => {
  return (
    <View className="w-full bg-white">
      <SearchBar
        placeholder={"Search by name..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const ContactsList = ({
  user,
  data,
  chosenUsersIds,
  setChosenUsersIds,
  setShowNewChatModal,
}) => {
  if (!data.length) {
    return (
      <View className="flex-1 justify-start items-center bg-white">
        <Text className="mt-8 text-2xl font-bold text-slate-200">
          No contacts found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="w-full bg-white"
      data={data}
      renderItem={({ item }) => {
        return (
          <ContactItem
            user={user}
            item={item}
            chosenUsersIds={chosenUsersIds}
            setChosenUsersIds={setChosenUsersIds}
            setShowNewChatModal={setShowNewChatModal}
          />
        );
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const NewChatModal = ({
  user,
  notify,
  showNewChatModal,
  setShowNewChatModal,
}) => {
  const [chosenUsersIds, setChosenUsersIds] = useState([]);
  const [groupChatTitle, setGroupChatTitle] = useState("");
  const [searchByName, setSearchByName] = useState("");
  const [debouncedSearchByName] = useDebounce(searchByName, 500);

  const res1 = useQuery(GET_CONTACTS_BY_USER, {
    variables: {
      searchByName: debouncedSearchByName,
    },
  });

  const res2 = useQuery(GET_CHAT_BY_PARTICIPANTS, {
    variables: {
      participants: [user.id, ...chosenUsersIds],
    },
  });

  const [mutate] = useMutation(CREATE_CHAT, {
    onError: (error) => {
      console.log("Error creating chat mutation:");
      console.log(error.graphQLErrors[0].message);
      notify.show({ content: error.graphQLErrors[0].message, isError: true });
    },
  });

  const navigate = useNavigate();

  const handlePress = async () => {
    console.log("Press create a new chat!");
    console.log("Chosen users:", chosenUsersIds);

    // Check if user already has a chat with this contact and navigate to it
    if (res2.data?.findChatByParticipants) {
      console.log("Chat exists:", res2.data.findChatByParticipants);
      navigate(`/chats/${res2.data.findChatByParticipants.id}`);
      setShowNewChatModal(false);
      return;
    }

    try {
      const { data, error } = await mutate({
        variables: {
          title: groupChatTitle,
          participants: [user.id, ...chosenUsersIds],
        },
      });
      console.log("Data:", data);

      if (data) {
        console.log("Created chat:", data);
        navigate(`/chats/${data.createChat.id}`);
        setShowNewChatModal(false);
      }
    } catch (error) {
      console.log("Error creating chat:", error);
      console.log(error.message);
    }
  };

  //   console.log("Contacts data:", data);

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByName(text);
  };

  return (
    <Modal animationType="slide" visible={showNewChatModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
          <View className="w-[70px] flex justify-center items-center">
            <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
              <Pressable onPress={() => setShowNewChatModal(!showNewChatModal)}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </Pressable>
            </View>
          </View>
          <View className="flex-grow flex justify-center items-center">
            <Text className="text-xl text-white font-bold">New Chat</Text>
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
        <View className="w-full bg-green-600 flex justify-center items-center py-2">
          <Text className="text-sm text-white font-bold">
            {chosenUsersIds.length} contacts selected
          </Text>
        </View>
        {chosenUsersIds.length > 1 && (
          <View className="w-full bg-white">
            <Notify notify={notify} />
            <View className="mx-4 my-2">
              <View className="w-full flex-grow flex-row max-h-[50px] p-2 rounded-lg bg-slate-200 text-slate-800">
                <TextInput
                  className="w-full pl-2"
                  placeholder={"Enter group chat title..."}
                  onChangeText={(text) => setGroupChatTitle(text)}
                />
              </View>
            </View>
          </View>
        )}
        <ContactsHeader
          searchByTitle={searchByName}
          handleChange={handleChange}
        />
        {res1.loading ? (
          <View className="flex-grow flex justify-start items-center bg-white">
            <LoadingIcon />
          </View>
        ) : (
          <ContactsList
            user={user}
            data={res1.data?.allContactsByUser.contacts}
            chosenUsersIds={chosenUsersIds}
            setChosenUsersIds={setChosenUsersIds}
            setShowNewChatModal={setShowNewChatModal}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default NewChatModal;
