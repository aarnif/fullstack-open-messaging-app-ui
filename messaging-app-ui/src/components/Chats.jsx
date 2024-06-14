import { View, Text, FlatList } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_CHATS_BY_USER } from "../graphql/queries";

const ChatItem = ({ item }) => {
  return (
    <View className="w-full p-4 flex justify-center items-center">
      <Text className="text-md">{item.title}</Text>
    </View>
  );
};

const Chats = ({ userId }) => {
  const { data, loading } = useQuery(GET_CHATS_BY_USER, {
    variables: {
      userId: userId,
    },
    fetchPolicy: "cache-and-network",
  });

  console.log("Chats data:", data);

  if (loading) {
    return (
      <View className="flex flex-grow justify-center items-center">
        <Text className="text-4xl font-bold text-slate-200">Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      className="w-full bg-white"
      data={data?.allChatsByUser}
      renderItem={({ item }) => {
        return <ChatItem item={item} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default Chats;
