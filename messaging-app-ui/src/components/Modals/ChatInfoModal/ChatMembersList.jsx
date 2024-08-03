import ChatMember from "./ChatMember";

import { FlatList } from "react-native";

const ChatMembersList = ({ data, admin }) => {
  return (
    <FlatList
      className="w-full bg-white dark:bg-slate-700"
      data={data}
      renderItem={({ item }) => {
        return <ChatMember item={item} admin={admin} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ChatMembersList;
