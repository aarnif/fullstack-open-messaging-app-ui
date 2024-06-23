import Message from "./Message";
import NewMessage from "./NewMessage";

import { Text, FlatList } from "react-native";

const Messages = ({ user, chatId, messages }) => {
  return (
    <>
      {!messages.length ? (
        <FlatList
          className="w-full"
          data={[""]}
          renderItem={({ item }) => {
            return <Text key={"Empty item"}>{item}</Text>;
          }}
          inverted={true}
        />
      ) : (
        <FlatList
          className="w-full"
          data={messages}
          renderItem={({ item }) => {
            return <Message user={user} message={item} />;
          }}
          keyExtractor={({ id }) => id}
          inverted={true}
        />
      )}
      <NewMessage chatId={chatId} user={user} />
    </>
  );
};

export default Messages;
