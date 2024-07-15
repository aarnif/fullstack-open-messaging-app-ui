import Message from "./Message";
import NewMessage from "./NewMessage";
import helpers from "../../../utils/helpers";
import MessageImageViewModal from "./MessageImageViewModal";

import { useState } from "react";
import { View, Text, FlatList } from "react-native";

const NewMessages = ({ newMessagesCount }) => {
  return (
    <View className="px-4 w-full flex justify-center items-center">
      <View className="w-full flex justify-center items-center border-b border-slate-800">
        <Text key={"New messages"} className="font-semibold text-slate-800">
          {newMessagesCount} new messages
        </Text>
      </View>
    </View>
  );
};

const RenderMessages = ({
  user,
  item,
  index,
  newMessagesCount,
  handlePressImage,
}) => {
  const newMessagesAfterIndex = index === newMessagesCount;
  const senderIsCurrentUser = item.sender.id === user.id;

  return (
    <>
      {newMessagesCount > 0 && newMessagesAfterIndex && senderIsCurrentUser && (
        <NewMessages newMessagesCount={newMessagesCount} />
      )}
      <Message
        user={user}
        message={item}
        index={index}
        handlePressImage={handlePressImage}
      />
    </>
  );
};

const Messages = ({ user, chatId, messages }) => {
  const [showImageViewModal, setShowImageViewModal] = useState(false);
  const [chosenMessage, setChosenMessage] = useState(null);
  const newMessagesCount = helpers.newMessagesCount(user, messages);

  const handlePressImage = (message) => {
    console.log("Message image pressed:");
    setChosenMessage(message);
    setShowImageViewModal(true);
  };

  console.log("New messages count:", newMessagesCount);
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
          renderItem={({ item, index }) => {
            return (
              <RenderMessages
                user={user}
                item={item}
                index={index}
                newMessagesCount={newMessagesCount}
                handlePressImage={() => handlePressImage(item)}
              />
            );
          }}
          keyExtractor={({ id }) => id}
          inverted={true}
        />
      )}
      <NewMessage chatId={chatId} user={user} />
      {showImageViewModal && (
        <MessageImageViewModal
          chosenMessage={chosenMessage}
          showImageViewModal={showImageViewModal}
          setShowImageViewModal={setShowImageViewModal}
        />
      )}
    </>
  );
};

export default Messages;
