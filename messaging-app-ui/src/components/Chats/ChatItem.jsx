import helpers from "../../utils/helpers";
import { View, Text, Image } from "react-native";

import Constants from "expo-constants";

const ChatItem = ({ item }) => {
  // console.log("Chat item:", item);
  const imageUrl = Constants.expoConfig.extra.expressUri;
  const latestMessage = item.latestMessage;

  if (!item.messages.length) {
    return (
      <View className="flex flex-row items-center my-2 mx-4">
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
          <Text className="text-gray-600">No messages</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex flex-row items-center my-2 mx-4">
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

        <Text className="text-gray-600">
          {latestMessage.sender.name}:{" "}
          {helpers.sliceLatestMessage(latestMessage.content)}
        </Text>
      </View>
      <Text className="text-gray-400">
        {helpers.getLatestMessageTime(latestMessage?.createdAt)}
      </Text>
    </View>
  );
};

export default ChatItem;
