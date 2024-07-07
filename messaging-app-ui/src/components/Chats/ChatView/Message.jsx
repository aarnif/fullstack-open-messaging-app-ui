import baseUrl from "../../../../baseUrl";
import helpers from "../../../utils/helpers";

import { View, Text, Image } from "react-native";

const NotificationMessage = ({ message }) => {
  return (
    <View className="my-2">
      <View className="min-w-[80px] max-w-[300px] self-center flex flex-row pt-2 px-2 pb-1 bg-gray-300 rounded-lg">
        <Text className="text-gray-800 text-sm">{`${message.content}`}</Text>
      </View>
    </View>
  );
};

const MessageByAnotherUser = ({ message }) => {
  return (
    <View className="ml-4 mt-2">
      <View className="max-w-[300px] self-start ml-6 p-2 bg-gray-300 rounded-lg">
        <Text className="mb-1 text-gray-800 font-bold">
          {message.sender.name}
        </Text>
        <Text className="text-gray-800">{message.content}</Text>
        <Text className="mt-1 self-end text-xs text-gray-800">
          {helpers.formatMessageTime(message.createdAt)}
        </Text>
      </View>
      <Image
        source={{
          uri: message.sender.profilePicture,
        }}
        style={{
          width: 32,
          height: 32,
          borderRadius: 9999,
        }}
      />
    </View>
  );
};

const MessageByCurrentUser = ({ message }) => {
  return (
    <View className="mr-2 my-2">
      <View className="min-w-[80px] max-w-[300px] self-end mr-6 pt-2 px-2 pb-1 bg-green-300 rounded-lg">
        <Text className="text-gray-800">{message.content}</Text>
        <Text className="mt-1 self-end text-xs text-gray-800">
          {helpers.formatMessageTime(message.createdAt)}
        </Text>
      </View>
    </View>
  );
};

const Message = ({ user, message }) => {
  //   console.log("Message:", message);
  //   console.log("Sender:", message.sender);

  if (message.type === "notification") {
    return <NotificationMessage message={message} />;
  }

  return (
    <>
      {message.sender.id === user.id ? (
        <MessageByCurrentUser message={message} />
      ) : (
        <MessageByAnotherUser message={message} />
      )}
    </>
  );
};

export default Message;
