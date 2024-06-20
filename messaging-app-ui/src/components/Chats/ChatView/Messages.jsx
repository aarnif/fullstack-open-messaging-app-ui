import Message from "./Message";
import NewMessage from "./NewMessage";

import { View, Text, FlatList } from "react-native";

const Messages = ({ user, chatId, messages }) => {
  if (!messages.length) {
    return (
      <View className="flex justify-start items-center">
        <Text className="mt-8 text-2xl font-bold text-slate-400">
          No messages yet
        </Text>
      </View>
    );
  }
  return (
    <>
      <FlatList
        className="w-full"
        data={messages}
        renderItem={({ item }) => {
          return <Message user={user} message={item} />;
        }}
        keyExtractor={({ id }) => id}
        inverted={true}
      />
      <NewMessage chatId={chatId} />
    </>
  );
};

export default Messages;
