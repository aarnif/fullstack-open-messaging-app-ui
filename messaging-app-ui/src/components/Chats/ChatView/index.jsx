import { GET_CHAT_BY_ID } from "../../../graphql/queries";
import LoadingIcon from "../../LoadingIcon";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

import { useQuery } from "@apollo/client";
import { useMatch } from "react-router-native";

const ChatView = ({ user }) => {
  const match = useMatch("/chats/:chatId").params;
  const { data, loading } = useQuery(GET_CHAT_BY_ID, {
    variables: {
      chatId: match.chatId,
    },
  });

  if (loading) {
    return <LoadingIcon />;
  }

  return (
    <>
      <ChatHeader user={user} chat={data.findChatById} />
      <Messages
        user={user}
        chatId={match.chatId}
        messages={data?.findChatById.messages}
      />
    </>
  );
};

export default ChatView;
