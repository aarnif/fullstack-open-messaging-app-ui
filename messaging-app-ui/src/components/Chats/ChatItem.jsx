import helpers from "../../utils/helpers";

import { useColorScheme } from "nativewind";
import { View, Pressable, Text, Image } from "react-native";
import { useNavigate } from "react-router-native";

const LatestMessage = ({ user, latestMessage }) => {
  if (latestMessage.type === "notification") {
    return (
      <Text className="text-gray-600 dark:text-slate-200">
        {latestMessage.content}
      </Text>
    );
  }

  return (
    <Text className="text-gray-600 dark:text-slate-200">
      {latestMessage.sender.id === user.id
        ? "You:"
        : `${latestMessage.sender.name}:`}{" "}
      {helpers.sliceLatestMessage(latestMessage.content)}
    </Text>
  );
};

const ChatItem = ({ user, item }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigate = useNavigate();
  // console.log("Chat item:", item);
  const latestMessage = item.messages[0];

  const handlePress = () => {
    console.log("Pressed chat titled:", item.title);
    navigate(`/chats/${item.id}`);
  };

  const newMessagesCount = helpers.newMessagesCount(user, item.messages);

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
        <View className="mr-4">
          <Image
            className="w-12 h-12 rounded-full"
            source={{
              uri: item.displayChatImage.thumbnail,
            }}
          />
        </View>
        <View className="flex-1">
          <Text className="text-md font-bold dark:text-slate-100">
            {item.displayChatTitle}
          </Text>

          <LatestMessage user={user} latestMessage={latestMessage} />
        </View>
        <View className="w-[100px] flex justify-start items-center">
          <View className="w-full flex justify-center items-center">
            <Text className="text-gray-400 dark:text-slate-200">
              {helpers.formatMessageTime(latestMessage?.createdAt)}
            </Text>
          </View>
          <View className="w-full flex justify-center items-center">
            <View
              style={{
                backgroundColor:
                  newMessagesCount > 0
                    ? "#16a34a"
                    : colorScheme === "dark"
                    ? "#334155"
                    : "white",
              }}
              className="mt-1 w-[20px] h-[20px] flex justify-center items-center rounded-full"
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
