import { GET_CHAT_BY_ID } from "../../graphql/queries";
import LoadingIcon from "../LoadingIcon.jsx";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import ChatInfoModal from "./ChatInfoModal/index.jsx";
import EditChatModal from "./EditChatModal/index.jsx";
import AddMembersModal from "./UpdateMembersModal/AddMembersModal.jsx";
import RemoveMembersModal from "./UpdateMembersModal/RemoveMembersModal.jsx";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMatch } from "react-router-native";
import { View } from "react-native";

const ChatView = ({ user }) => {
  const [showChatInfoModal, setShowChatInfoModal] = useState(false);
  const [showEditChat, setShowEditChat] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showRemoveMembersModal, setShowRemoveMembersModal] = useState(false);
  const match = useMatch("/chats/:chatId").params;
  const { data, loading } = useQuery(GET_CHAT_BY_ID, {
    variables: {
      chatId: match.chatId,
    },
  });

  if (loading) {
    return (
      <View className="absolute w-full h-full flex justify-center items-center">
        <LoadingIcon />
      </View>
    );
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
          setShowEditChat={setShowEditChat}
          setShowChatInfoModal={setShowChatInfoModal}
          setShowAddMembersModal={setShowAddMembersModal}
          setShowRemoveMembersModal={setShowRemoveMembersModal}
        />
      )}
      {showEditChat && (
        <EditChatModal
          chat={data.findChatById}
          showEditChat={showEditChat}
          setShowEditChat={setShowEditChat}
        />
      )}
      {showAddMembersModal && (
        <AddMembersModal
          user={user}
          chat={data.findChatById}
          showAddMembersModal={showAddMembersModal}
          setShowAddMembersModal={setShowAddMembersModal}
        />
      )}
      {showRemoveMembersModal && (
        <RemoveMembersModal
          user={user}
          chat={data.findChatById}
          showRemoveMembersModal={showRemoveMembersModal}
          setShowRemoveMembersModal={setShowRemoveMembersModal}
        />
      )}
    </>
  );
};

export default ChatView;
