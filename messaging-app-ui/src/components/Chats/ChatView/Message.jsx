import baseUrl from "../../../../baseUrl";

import { View, Text, Image } from "react-native";

const MessageByAnotherUser = ({ message }) => {
  return (
    <View className="ml-4 mt-2">
      <View className="max-w-[300px] self-start ml-6 p-2 bg-gray-300 rounded-lg">
        <Text className="mb-1 text-gray-800 font-bold">
          {message.sender.name}
        </Text>
        <Text className="text-gray-800">{message.content}</Text>
      </View>
      <Image
        source={{
          uri: `${baseUrl}/images/contacts/${message.sender.id}`,
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
      <View className="max-w-[300px] self-end mr-6 p-2 bg-green-300 rounded-lg">
        <Text className="mb-1 text-gray-800 font-bold">{"You"}</Text>
        <Text className="text-gray-800">{message.content}</Text>
      </View>
    </View>
  );
};

const Message = ({ user, message }) => {
  //   console.log("Message:", message);
  //   console.log("Sender:", message.sender);
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
