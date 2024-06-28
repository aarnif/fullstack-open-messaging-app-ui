import baseUrl from "../../../../baseUrl";
import {
  DELETE_CHAT,
  MARK_MESSAGES_IN_CHAT_READ,
} from "../../../graphql/mutations";

import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { useNavigate } from "react-router-native";
import { useMutation } from "@apollo/client";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ChatHeader = ({ user, chat, setShowChatInfoModal }) => {
  const navigate = useNavigate();

  const [mutateDeleteChat] = useMutation(DELETE_CHAT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const [mutateMarkMessagesInChatRead] = useMutation(
    MARK_MESSAGES_IN_CHAT_READ,
    {
      onError: (error) => {
        console.log(error.graphQLErrors[0].message);
      },
    }
  );

  const chatParticipantsString = chat.participants
    .map((participant) =>
      participant.username === user.username ? "You" : participant.name
    )
    .join(", ");

  const goBack = async () => {
    console.log("Go back to chats page!");
    // Delete chat if user does not post any messages after creating it
    if (!chat.messages.length) {
      console.log("Delete chat:", chat.id);
      await mutateDeleteChat({ variables: { chatId: chat.id } });
    }

    console.log("Mark messages in chat read:", chat.id);
    await mutateMarkMessagesInChatRead({
      variables: { chatId: chat.id },
    });

    navigate("/chats");
  };

  const getInfo = () => {
    console.log("Clicked chat info!");
    setShowChatInfoModal(true);
  };

  return (
    <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
      <View className="flex flex-row">
        <View className="w-[50px] mr-4 flex-grow flex justify-center items-center">
          <Pressable onPress={goBack}>
            <MaterialCommunityIcons
              name={"chevron-left"}
              size={36}
              color={"white"}
            />
          </Pressable>
        </View>
        <Pressable onPress={getInfo}>
          <View className="max-w-[250px] flex-grow flex flex-row justify-center items-center">
            <View className="mr-2">
              <Image
                source={{
                  uri: `${baseUrl}/images/chats/${chat.id}`,
                }}
                style={{ width: 48, height: 48, borderRadius: 9999 }}
              />
            </View>
            <View>
              <Text className="text-base text-white font-bold">
                {chat.title}
              </Text>
              <Text className="text-sm text-white">
                {chatParticipantsString}
              </Text>
            </View>
          </View>
        </Pressable>
        <View className="w-[50px] ml-4 flex-grow flex justify-center items-center"></View>
      </View>
    </View>
  );
};

export default ChatHeader;
