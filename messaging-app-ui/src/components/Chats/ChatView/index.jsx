import { GET_CHAT_BY_ID, GET_CHATS_BY_USER } from "../../../graphql/queries";
import LoadingIcon from "../../LoadingIcon";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { NEW_MESSAGE_ADDED } from "../../../graphql/subscriptions";

import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { useMatch } from "react-router-native";

const ChatView = ({ user }) => {
  const client = useApolloClient();
  const match = useMatch("/chats/:chatId").params;
  const { data, loading } = useQuery(GET_CHAT_BY_ID, {
    variables: {
      chatId: match.chatId,
    },
    fetchPolicy: "cache-and-network",
  });

  useSubscription(NEW_MESSAGE_ADDED, {
    onData: ({ data }) => {
      const updatedChat = data.data.messageToChatAdded;
      client.cache.updateQuery(
        { query: GET_CHAT_BY_ID, variables: { chatId: match.chatId } },
        ({ findChatById }) => {
          return {
            findChatById: {
              ...findChatById,
            },
          };
        }
      );
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
