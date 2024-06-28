import { GET_CHAT_BY_ID } from "../../../graphql/queries";
import LoadingIcon from "../../LoadingIcon";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatInfoModal from "./ChatInfoModal/index.jsx";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMatch } from "react-router-native";

const ChatView = ({ user }) => {
  const [showChatInfoModal, setShowChatInfoModal] = useState(false);
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
      <ChatHeader
        user={user}
        chat={data.findChatById}
        setShowChatInfoModal={setShowChatInfoModal}
      />
      <Messages
        user={user}
        chatId={match.chatId}
        messages={data?.findChatById.messages}
      />
      {showChatInfoModal && (
        <ChatInfoModal
          user={user}
          chat={data.findChatById}
          showChatInfoModal={showChatInfoModal}
          setShowChatInfoModal={setShowChatInfoModal}
        />
      )}
    </>
  );
};

export default ChatView;
