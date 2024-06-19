import helpers from "../../utils/helpers";
import { View, Pressable, Text, Image } from "react-native";

import { useNavigate } from "react-router-native";
import Constants from "expo-constants";

const ChatItem = ({ item }) => {
  const navigate = useNavigate();
  // console.log("Chat item:", item);
  const imageUrl = Constants.expoConfig.extra.apolloUri;
  const latestMessage = item.latestMessage;

  const handlePress = () => {
    console.log("Pressed chat titled:", item.title);
    navigate(`/chats/${item.id}`);
  };

  if (!item.messages.length) {
    return (
      <View className="flex flex-row items-center my-2 mx-4">
        <View className="mr-4">
          <Image
            source={{
              uri: `${imageUrl}/images/chats/${item.id}`,
            }}
            style={{ width: 48, height: 48, borderRadius: 9999 }}
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
    <Pressable onPress={handlePress}>
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
    </Pressable>
  );
};

export default ChatItem;
