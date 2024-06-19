import { GET_CHAT_BY_ID } from "../../../graphql/queries";
import LoadingIcon from "../../LoadingIcon";
import ChatHeader from "./ChatHeader";

import { View, Text } from "react-native";
import { useQuery } from "@apollo/client";
import { useMatch } from "react-router-native";

const ChatView = ({ user }) => {
  const match = useMatch("/chats/:chatId").params;
  const { data, loading } = useQuery(GET_CHAT_BY_ID, {
    variables: {
      chatId: match.chatId,
    },
    fetchPolicy: "cache-and-network",
  });

  console.log("Match:", match.chatId);
  console.log("Chat view data:", data);

  return (
    <>
      {loading ? (
        <LoadingIcon />
      ) : (
        <ChatHeader user={user} chat={data?.findChatById} />
      )}
    </>
  );
};

export default ChatView;
