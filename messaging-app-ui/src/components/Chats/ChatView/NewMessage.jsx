import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useMutation } from "@apollo/client";
import { ADD_MESSAGE_TO_CHAT } from "../../../graphql/mutations";

const NewMessage = ({ chatId }) => {
  const [message, setMessage] = useState("");

  const [mutate] = useMutation(ADD_MESSAGE_TO_CHAT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      notify.show({ content: error.graphQLErrors[0].message, isError: true });
    },
  });

  const handlePress = async () => {
    console.log("Send message:", message);

    if (!message) {
      console.log("Do not send empty message!");
      return;
    }

    try {
      const { data, error } = await mutate({
        variables: { chatId: chatId, content: message },
      });
      setMessage("");
    } catch (error) {
      console.log("Error creating new message:", error);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full flex-row h-[50px] p-2 bg-slate-200 text-slate-800">
          <View className="flex-grow">
            <TextInput
              className="w-full p-2 bg-slate-300 rounded-xl"
              placeholder={"New Message..."}
              value={message}
              onChangeText={(text) => setMessage(text)}
            />
          </View>
          <View className="mx-2 flex justify-center items-center">
            <Pressable onPress={handlePress}>
              <MaterialCommunityIcons name="send" size={26} color="#16a34a" />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewMessage;
