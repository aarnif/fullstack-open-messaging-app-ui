import baseUrl from "../../../baseUrl";
import helpers from "../../utils/helpers";

import { View, Pressable, Text, Image } from "react-native";
import { useNavigate } from "react-router-native";

const ChatItem = ({ user, item }) => {
  const navigate = useNavigate();
  // console.log("Chat item:", item);
  const latestMessage = item.messages[0];

  const handlePress = () => {
    console.log("Pressed chat titled:", item.title);
    navigate(`/chats/${item.id}`);
  };

  const newMessagesCount = item.messages.filter((message) =>
    message.isReadBy.find(
      (member) => member.member.id === user.id && !member.isRead
    )
  ).length;

  if (!item.messages.length) {
    return (
      <Pressable onPress={handlePress}>
        <View className="flex flex-row items-center my-2 mx-4">
          <View className="mr-4">
            <Image
              source={{
                uri: `${baseUrl}/images/chats/${item.id}`,
              }}
              style={{ width: 48, height: 48, borderRadius: 9999 }}
            />
          </View>
          <View className="flex-1">
            <Text className="text-md font-bold">{item.title}</Text>
            <Text className="text-gray-600">No messages</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-row items-start my-2 mx-4">
        <View className="mr-4">
          <Image
            className="w-12 h-12 rounded-full"
            source={{
              uri: `${baseUrl}/images/chats/${item.id}`,
            }}
          />
        </View>
        <View className="flex-1">
          <Text className="text-md font-bold">{item.title}</Text>

          <Text className="text-gray-600">
            {latestMessage.sender.id === user.id
              ? "You"
              : latestMessage.sender.name}
            : {helpers.sliceLatestMessage(latestMessage.content)}
          </Text>
        </View>
        <View className="w-[100px] flex justify-start items-center">
          <View className="w-full flex justify-center items-center">
            <Text className="text-gray-400">
              {helpers.getLatestMessageTime(latestMessage?.createdAt)}
            </Text>
          </View>
          <View className="w-full flex justify-center items-center">
            <View
              style={{
                backgroundColor: newMessagesCount > 0 ? "#16a34a" : "white",
              }}
              className="mt-1 w-[20px] h-[20px] flex justify-center items-center bg-green-500 rounded-full"
            >
              <Text className="text-white font-semibold">
                {newMessagesCount > 0 && newMessagesCount}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
