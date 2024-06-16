import { GET_CHATS_BY_USER } from "../../graphql/queries";
import SearchBar from "./SearchBar";
import ChatItem from "./ChatItem";

import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { Formik } from "formik";

const ChatsHeader = ({ setTitle }) => {
  return (
    <View className="w-full">
      <Text className="text-2xl font-bold p-4">Chats</Text>
      <Formik initialValues={{ search: "" }}>
        <SearchBar setTitle={setTitle} />
      </Formik>
    </View>
  );
};

const Chats = ({ userId }) => {
  const [title, setTitle] = useState("");
  const { data, loading } = useQuery(GET_CHATS_BY_USER, {
    variables: {
      userId: userId,
    },
    fetchPolicy: "cache-and-network",
  });

  // console.log("Chats data:", data);

  const filteredChats = data?.allChatsByUser.filter((chat) =>
    chat.title.toLowerCase().includes(title.toLowerCase())
  );

  if (loading) {
    return (
      <View className="w-full flex flex-grow justify-center items-center bg-white">
        <Text className="text-4xl font-bold text-slate-200">Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={<ChatsHeader setTitle={setTitle} />}
      className="w-full bg-white"
      data={filteredChats}
      renderItem={({ item }) => {
        return <ChatItem item={item} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default Chats;
