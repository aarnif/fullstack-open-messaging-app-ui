import useSubscriptions from "../../../hooks/useSubscriptions";
import useChangeImage from "../../../hooks/useChangeImage";
import imageService from "../../../services/imageService";
import UploadImageWindow from "../../UploadImageWindow";

import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Image,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useMutation } from "@apollo/client";
import { GET_CHAT_BY_ID } from "../../../graphql/queries";
import { ADD_MESSAGE_TO_CHAT } from "../../../graphql/mutations";

const MessageImage = ({ source, reset }) => {
  return (
    <View className="w-full flex justify-center items-center bg-slate-300">
      <View className="w-full flex flex-row justify-center items-center pt-2">
        <View className="w-[70px] flex justify-center items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center"></View>
        </View>

        <View className="flex-grow flex justify-center items-center">
          <View className="pb-2">
            <Image
              source={{ uri: source }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>

        <View className="w-[70px] h-full flex justify-start items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 shadow-xl">
            <Pressable onPress={reset}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const NewMessage = ({ chatId, user }) => {
  const [message, setMessage] = useState("");
  const [showUploadPictureModal, setShowUploadPictureModal] = useState(false);

  const handleCloseUploadPicture = () => {
    console.log("Close edit profile picture window!");
    setShowUploadPictureModal(false);
  };

  const {
    image,
    base64Image,
    reset,
    chooseImageFromCamera,
    chooseImageFromFiles,
  } = useChangeImage(null, (onChange = handleCloseUploadPicture));

  useSubscriptions(user);

  const [mutate] = useMutation(ADD_MESSAGE_TO_CHAT, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      notify.show({ content: error.graphQLErrors[0].message, isError: true });
    },
    refetchQueries: [{ query: GET_CHAT_BY_ID, variables: { chatId: chatId } }],
  });

  const handleAddImage = () => {
    console.log("Add image to message.");
    setShowUploadPictureModal(true);
  };

  const handleSendMessage = async () => {
    console.log("Send message:", message);

    if (!message && !image) {
      console.log("Do not send empty message!");
      return;
    }

    try {
      if (base64Image) {
        console.log("Uploading picture...");
        result = await imageService.uploadImage(user.id, base64Image);
      }
      const { data, error } = await mutate({
        variables: {
          chatId: chatId,
          content: message,
          input: {
            thumbnail: base64Image ? result.data.thumb.url : null,
            original: base64Image ? result.data.image.url : null,
          },
        },
      });
      setMessage("");
      reset();
      setShowUploadPictureModal(false);
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
      {image && <MessageImage source={image} reset={reset} />}

      {showUploadPictureModal && (
        <UploadImageWindow
          chooseImageFromCamera={chooseImageFromCamera}
          chooseImageFromFiles={chooseImageFromFiles}
          handleClose={handleCloseUploadPicture}
        />
      )}
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
            <Pressable onPress={handleAddImage}>
              <MaterialCommunityIcons name="camera" size={26} color="#16a34a" />
            </Pressable>
          </View>

          <View className="mx-2 flex justify-center items-center">
            <Pressable onPress={handleSendMessage}>
              <MaterialCommunityIcons name="send" size={26} color="#16a34a" />
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewMessage;
