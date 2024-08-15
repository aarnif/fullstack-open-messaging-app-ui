import ChatCard from "./ChatCard";

import { View, Pressable, Text, Image } from "react-native";
import { useNavigate } from "react-router-native";

const ChatItem = ({ user, item }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    console.log("Pressed chat titled:", item.title);
    navigate(`/chats/${item.id}`);
  };

  if (!item.messages.length) {
    return (
      <Pressable onPress={handlePress}>
        <View className="flex flex-row items-center my-2 mx-4">
          <View className="mr-4">
            <Image
              source={{
                uri: item.displayChatImage.thumbnail,
              }}
              style={{ width: 48, height: 48, borderRadius: 9999 }}
            />
          </View>
          <View className="flex-1">
            <Text className="text-md font-bold">{item.displayChatTitle}</Text>
            <Text className="text-gray-600">No messages</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-row items-start my-2 mx-4">
        <ChatCard user={user} chat={item} />
      </View>
    </Pressable>
  );
};

export default ChatItem;
