import { GET_CHATS_BY_USER } from "../graphql/queries";
import getLatestMessageTime from "../utils/getLatestMessageTime";

import { View, Text, FlatList, Image } from "react-native";
import { useQuery } from "@apollo/client";

import Constants from "expo-constants";

const imageUrl = Constants.expoConfig.extra.expressUri;

const ChatItem = ({ item }) => {
  // console.log("Chat item:", item);

  const latestMessage = item?.latestMessage ? item.latestMessage : null;

  return (
    <View className="flex-row items-center p-4">
      <View className="mr-4">
        <Image
          className="w-12 h-12 rounded-full"
          source={{
            uri: `${imageUrl}/images/chats/${item.id}`,
          }}
        />
      </View>
      <View className="flex-1">
        <Text className="text-md font-bold">{item.title}</Text>
        {latestMessage ? (
          <Text className="text-gray-600">
            {latestMessage.sender.name}: {latestMessage.content}
          </Text>
        ) : (
          <Text className="text-gray-600">No messages</Text>
        )}
      </View>
      <Text className="text-gray-400">
        {getLatestMessageTime(latestMessage?.createdAt)}
      </Text>
    </View>
  );
};

const ChatsHeader = () => {
  return (
    <View className="w-full">
      <Text className="text-2xl font-bold p-4">Chats</Text>
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

  // console.log("Chats data:", data);

  if (loading) {
    return (
      <View className="w-full flex flex-grow justify-center items-center bg-white">
        <Text className="text-4xl font-bold text-slate-200">Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={<ChatsHeader />}
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
