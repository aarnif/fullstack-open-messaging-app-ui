import helpers from "../../../utils/helpers";
import MessageBubbleEdge from "./MessageBubbleEdge";

import { View, Text, Image, Pressable } from "react-native";

const NotificationMessage = ({ message }) => {
  return (
    <View className="my-2">
      <View className="min-w-[80px] max-w-[300px] self-center flex flex-row pt-2 px-2 pb-1 bg-gray-300 rounded-lg">
        <Text className="text-gray-800 text-sm">{`${message.content}`}</Text>
      </View>
    </View>
  );
};

const MessageByAnotherUser = ({ message, handlePressImage }) => {
  return (
    <View className="ml-4 mt-2">
      <View className="min-w-[80px] max-w-[300px] self-start ml-8 p-2 bg-gray-300 rounded-lg">
        <Text className="mb-1 text-gray-800 font-bold">
          {message.sender.name}
        </Text>
        {message.image.thumbnail && (
          <View>
            <Pressable onPress={handlePressImage}>
              <Image
                source={{ uri: message.image.thumbnail }}
                style={{ width: 100, height: 100 }}
              />
            </Pressable>
          </View>
        )}
        {message.content && (
          <Text
            style={{
              marginTop: message.image.thumbnail && 2,
              fontSize: message.type === "singleEmoji" && 32,
              textAlign: message.type === "singleEmoji" && "center",
            }}
            className="text-gray-800"
          >
            {message.content}
          </Text>
        )}
        <Text className="mt-1 self-end text-xs text-gray-800">
          {helpers.formatMessageTime(message.createdAt)}
        </Text>
        <View className="absolute bottom-[-2px] left-[-8px]">
          <MessageBubbleEdge color={"#d1d5db"} />
        </View>
      </View>
      <Image
        source={{
          uri: message.sender.profilePicture.thumbnail,
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

const MessageByCurrentUser = ({ message, handlePressImage }) => {
  return (
    <View className="mr-2 my-2">
      <View className="min-w-[80px] max-w-[300px] self-end mr-8 pt-2 px-2 pb-1 bg-green-300 rounded-lg">
        {message.image.thumbnail && (
          <View>
            <Pressable onPress={handlePressImage}>
              <Image
                source={{ uri: message.image.thumbnail }}
                style={{ width: 100, height: 100 }}
              />
            </Pressable>
          </View>
        )}
        {message.content && (
          <Text
            style={{
              marginTop: message.image.thumbnail && 2,
              fontSize: message.type === "singleEmoji" && 32,
              textAlign: message.type === "singleEmoji" && "center",
            }}
            className="text-gray-800"
          >
            {message.content}
          </Text>
        )}
        <Text className="mt-1 self-end text-xs text-gray-800">
          {helpers.formatMessageTime(message.createdAt)}
        </Text>
        <View className="absolute bottom-[-2px] right-[-8px]">
          <MessageBubbleEdge color={"#86efac"} />
        </View>
      </View>
    </View>
  );
};

const Message = ({ user, message, handlePressImage }) => {
  if (message.type === "notification") {
    return <NotificationMessage message={message} />;
  }

  return (
    <>
      {message.sender.id === user.id ? (
        <MessageByCurrentUser
          message={message}
          handlePressImage={handlePressImage}
        />
      ) : (
        <MessageByAnotherUser
          message={message}
          handlePressImage={handlePressImage}
        />
      )}
    </>
  );
};

export default Message;
