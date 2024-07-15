import useChangeImage from "../../../../hooks/useChangeImage";
import imageService from "../../../../services/imageService";
import { EDIT_CHAT } from "../../../../graphql/mutations";
import FormikFormField from "../../../FormikFormField";
import UploadImageWindow from "../../../UploadImageWindow";
import LoadingIcon from "../../../LoadingIcon";

import { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Modal,
  SafeAreaView,
  Pressable,
  View,
  Text,
  Image,
} from "react-native";
import { Formik, useField } from "formik";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UploadProfilePicture = ({ handlePressUploadPicture, image }) => {
  return (
    <Pressable className="mb-[20px]" onPress={handlePressUploadPicture}>
      <Text className="text-md font-medium text-slate-700">CHAT PICTURE:</Text>
      <View className="w-full p-2 flex justify-center items-center rounded-lg bg-slate-200 text-slate-800">
        <Image
          source={{
            uri: image,
          }}
          style={{ width: 80, height: 80, borderRadius: 9999 }}
        />
        <Text className="my-2 text-md font-semibold text-slate-700">
          Change chat picture
        </Text>
      </View>
    </Pressable>
  );
};

const EditProfileForm = ({
  goBack,
  onSubmit,
  handlePressUploadPicture,
  image,
}) => {
  const [titleField, titleMeta, titleHelpers] = useField("title");
  const [descriptionField, descriptionMeta, descriptionHelpers] =
    useField("description");

  return (
    <>
      <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
        <View className="w-[70px] flex justify-center items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
            <Pressable onPress={goBack}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </Pressable>
          </View>
        </View>
        <View className="flex-grow flex justify-center items-center">
          <Text className="text-xl text-white font-bold">Edit Chat</Text>
        </View>
        <View className="w-[70px] flex justify-center items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
            <Pressable onPress={onSubmit}>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color="white"
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View className="w-full p-8 flex-grow flex flex-col bg-white">
        <UploadProfilePicture
          handlePressUploadPicture={handlePressUploadPicture}
          image={image}
        />

        <FormikFormField
          name="title"
          placeholder="Enter chat title..."
          value={titleField.value}
          onChangeText={(text) => titleHelpers.setValue(text)}
        ></FormikFormField>

        <FormikFormField
          name="description"
          placeholder="Enter chat description..."
          value={descriptionField.value}
          onChangeText={(text) => descriptionHelpers.setValue(text)}
        ></FormikFormField>
      </View>
    </>
  );
};

export const EditProfileContainer = ({
  goBack,
  onSubmit,
  handlePressUploadPicture,
  image,
  initialValues,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <EditProfileForm
          goBack={goBack}
          onSubmit={handleSubmit}
          handlePressUploadPicture={handlePressUploadPicture}
          image={image}
        />
      )}
    </Formik>
  );
};

const EditChatModal = ({ chat, showEditChat, setShowEditChat }) => {
  const [editChat] = useMutation(EDIT_CHAT);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadPictureModal, setShowUploadPictureModal] = useState(false);

  const handleCloseUploadPicture = () => {
    console.log("Close edit chat picture window!");
    setShowUploadPictureModal(false);
  };

  const { image, base64Image, chooseImageFromCamera, chooseImageFromFiles } =
    useChangeImage(chat.image.thumbnail, (onChange = handleCloseUploadPicture));

  const initialValues = {
    title: chat.title,
    description: chat.description,
  };

  const goBack = () => {
    console.log("Go back to chat page!");
    setShowEditChat(false);
  };

  const handlePressUploadPicture = () => {
    console.log("Press edit chat picture button!");
    setShowUploadPictureModal(true);
  };

  const onSubmit = async (values) => {
    const { title, description } = values;
    console.log("Edit chat with following values:");
    console.log("Image:", image);
    console.log("Title:", title);
    console.log("Description:", description);

    try {
      let result;

      if (base64Image) {
        setIsUploading(true);
        console.log("Uploading chat picture...");
        result = await imageService.uploadImage(chat.id, base64Image);
      }
      console.log("Editing chat...");
      const newChatImage = base64Image
        ? {
            thumbnail: result.data.thumb.url,
            original: result.data.image.url,
          }
        : chat.image;
      console.log("New chat image:", newChatImage);
      await editChat({
        variables: {
          chatId: chat.id,
          title,
          description,
          input: newChatImage,
        },
      });

      setIsUploading(false);
      setShowEditChat(false);

      console.log("Edited chat successfully!");
    } catch (error) {
      console.error("Error editing chat:", error);
    }
  };

  console.log("Is uploading:", isUploading);

  return (
    <Modal animationType="slide" visible={showEditChat}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <EditProfileContainer
          goBack={goBack}
          onSubmit={onSubmit}
          handlePressUploadPicture={handlePressUploadPicture}
          image={image}
          initialValues={initialValues}
        />
        {showUploadPictureModal && (
          <UploadImageWindow
            title={"Edit Chat Picture"}
            chooseImageFromCamera={chooseImageFromCamera}
            chooseImageFromFiles={chooseImageFromFiles}
            handleClose={handleCloseUploadPicture}
          />
        )}
      </SafeAreaView>
      {isUploading && (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          className="absolute w-full h-full flex justify-center items-center"
        >
          <LoadingIcon />
          <Text className="text-white text-lg font-semibold">Editing chat</Text>
        </View>
      )}
    </Modal>
  );
};

export default EditChatModal;
