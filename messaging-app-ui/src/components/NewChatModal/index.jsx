import { GET_CONTACTS_BY_USER } from "../../graphql/queries";
import LoadingIcon from "../LoadingIcon";
import SearchBar from "../SearchBar";
import ContactItem from "../Contacts/ContactItem";

import {
  Modal,
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";

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

const ContactsList = ({ data }) => {
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
        return <ContactItem item={item} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const NewChatModal = ({ user, showNewChatModal, setShowNewChatModal }) => {
  const [searchByName, setSearchByName] = useState("");
  const [debouncedSearchByName] = useDebounce(searchByName, 500);
  const { data, loading } = useQuery(GET_CONTACTS_BY_USER, {
    variables: {
      searchByName: debouncedSearchByName,
    },
    fetchPolicy: "cache-and-network",
  });

  //   console.log("Contacts data:", data);

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByName(text);
  };

  return (
    <Modal animationType="slide" visible={showNewChatModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
          <View className="w-[70px] flex justify-center items-center"></View>
          <View className="flex-grow flex justify-center items-center">
            <Text className="text-xl text-white font-bold">New Chat</Text>
          </View>
          <View className="w-[70px] flex justify-center items-center">
            <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
              <Pressable onPress={() => setShowNewChatModal(!showNewChatModal)}>
                <MaterialCommunityIcons name="close" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
        <ContactsHeader
          searchByTitle={searchByName}
          handleChange={handleChange}
        />
        {loading ? (
          <View className="flex-grow flex justify-start items-center bg-white">
            <LoadingIcon />
          </View>
        ) : (
          <ContactsList
            data={data?.allContactsByUser.contacts}
            backgroundColor={"white"}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default NewChatModal;
