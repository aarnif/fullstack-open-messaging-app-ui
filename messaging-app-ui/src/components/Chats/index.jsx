import { GET_CHATS_BY_USER } from "../../graphql/queries";

import Header from "../Header";
import SearchBar from "../SearchBar";
import ChatItem from "./ChatItem";
import LoadingIcon from "../LoadingIcon";
import Menu from "../Menu";

import useSubscriptions from "../../hooks/useSubscriptions";

import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { useDebounce } from "use-debounce";

const ChatsHeader = ({ searchByTitle, handleChange }) => {
  return (
    <View className="w-full bg-white dark:bg-slate-700">
      <Text className="text-2xl font-bold mt-4 mx-4 mb-2 dark:text-slate-200">
        Chats
      </Text>
      <SearchBar
        placeholder={"Search by title..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const ChatsList = ({ user, data }) => {
  if (!data.length) {
    return (
      <View className="flex justify-start items-center">
        <Text className="mt-8 text-2xl font-bold text-slate-200">
          No chats found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="w-full"
      data={data}
      renderItem={({ item }) => {
        return <ChatItem user={user} item={item} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const Chats = ({ user, handleNewChatPress }) => {
  const [searchByTitle, setSearchByTitle] = useState("");
  const [debouncedSearchByTitle] = useDebounce(searchByTitle, 500);
  const { data, loading } = useQuery(GET_CHATS_BY_USER, {
    variables: {
      userId: user.id,
      searchByTitle: debouncedSearchByTitle,
    },
  });

  console.log("Rendering Chats component...");

  useSubscriptions(user);

  // console.log("Chats data:", data);

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByTitle(text);
  };

  return (
    <>
      <Header user={user} handlePress={handleNewChatPress} />
      <ChatsHeader searchByTitle={searchByTitle} handleChange={handleChange} />
      {loading ? (
        <View className="flex justify-end items-center">
          <LoadingIcon />
        </View>
      ) : (
        <ChatsList user={user} data={data?.allChatsByUser} />
      )}
      {user && <Menu />}
    </>
  );
};

export default Chats;
