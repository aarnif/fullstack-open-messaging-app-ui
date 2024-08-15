import helpers from "../../utils/helpers";

import { useColorScheme } from "nativewind";
import { View, Text, Image } from "react-native";

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

const ChatCard = ({ user, chat }) => {
  const { colorScheme } = useColorScheme();

  const latestMessage = chat.messages[0];
  const newMessagesCount = helpers.newMessagesCount(user, chat.messages);

  return (
    <>
      <View className="mr-4">
        <Image
          className="w-12 h-12 rounded-full"
          source={{
            uri: chat.displayChatImage.thumbnail,
          }}
        />
      </View>
      <View className="flex-1">
        <Text className="text-md font-bold dark:text-slate-100">
          {chat.displayChatTitle}
        </Text>

        <LatestMessage user={user} latestMessage={latestMessage} />
      </View>
      <View className="w-[100px] flex justify-start items-center">
        <View className="w-full flex justify-center items-center">
          <Text className="text-gray-400 dark:text-slate-200">
            {helpers.formatMessageTime(
              latestMessage?.createdAt,
              user.settings.time === "24h"
            )}
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
    </>
  );
};

export default ChatCard;
