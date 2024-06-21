import { GET_CHATS_BY_USER } from "../../graphql/queries";
import { NEW_MESSAGE_ADDED } from "../../graphql/subscriptions";
import Header from "../Header";
import SearchBar from "../SearchBar";
import ChatItem from "./ChatItem";
import LoadingIcon from "../LoadingIcon";
import Menu from "../Menu";

import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { useDebounce } from "use-debounce";

const ChatsHeader = ({ searchByTitle, handleChange }) => {
  return (
    <View className="w-full bg-white">
      <Text className="text-2xl font-bold mt-4 mx-4 mb-2">Chats</Text>
      <SearchBar
        placeholder={"Search by title..."}
        searchByTitle={searchByTitle}
        handleChange={handleChange}
      />
    </View>
  );
};

const ChatsList = ({ data }) => {
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
        return <ChatItem item={item} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

const Chats = ({ user, setShowNewChatModal }) => {
  const client = useApolloClient();
  const [searchByTitle, setSearchByTitle] = useState("");
  const [debouncedSearchByTitle] = useDebounce(searchByTitle, 500);
  const { data, loading } = useQuery(GET_CHATS_BY_USER, {
    variables: {
      userId: user.id,
      searchByTitle: debouncedSearchByTitle,
    },
    fetchPolicy: "cache-and-network",
  });

  useSubscription(NEW_MESSAGE_ADDED, {
    onData: ({ data }) => {
      const updatedChat = data.data.messageToChatAdded;
      client.cache.updateQuery(
        {
          query: GET_CHATS_BY_USER,
          variables: { userId: user.id, searchByTitle: searchByTitle },
        },
        ({ allChatsByUser }) => {
          return {
            allChatsByUser: allChatsByUser
              .map((chat) => {
                return chat.id === updatedChat.id ? updatedChat : chat;
              })
              .sort((a, b) => {
                return (
                  new Date(b.messages[0].createdAt) -
                  new Date(a.messages[0].createdAt)
                );
              }),
          };
        }
      );
    },
  });

  // console.log("Chats data:", data);

  const handleChange = (text) => {
    console.log("Search value:", text);
    setSearchByTitle(text);
  };

  return (
    <>
      <Header user={user} setShowNewChatModal={setShowNewChatModal} />
      <ChatsHeader searchByTitle={searchByTitle} handleChange={handleChange} />
      {loading ? (
        <View className="flex justify-end items-center">
          <LoadingIcon />
        </View>
      ) : (
        <ChatsList data={data?.allChatsByUser} />
      )}
      {user && <Menu />}
    </>
  );
};

export default Chats;
