import useChangeImage from "../../../hooks/useChangeImage";
import imageService from "../../../services/imageService";
import { EDIT_CHAT } from "../../../graphql/mutations";
import FormikFormField from "../../FormikFormField";
import UploadImageWindow from "../../UploadImageWindow";
import LoadingIconWithOverlay from "../../LoadingIconWithOverlay";
import ChangeImage from "../../ChangeImage";
import AddMembersModal from "../UpdateMembersModal/AddMembersModal";
import RemoveMembersModal from "../UpdateMembersModal/RemoveMembersModal";
import NotifyMessage from "../../NotifyMessage";

import { useState } from "react";
import { useMutation } from "@apollo/client";

import { Modal, SafeAreaView, Pressable, View, Text } from "react-native";
import { Formik, useField } from "formik";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const EditChatForm = ({
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
      <View className="w-full p-8 flex-grow flex flex-col bg-white dark:bg-slate-700">
        <ChangeImage
          currentImage={image}
          imageType={"chat"}
          onPress={handlePressUploadPicture}
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

export const EditChatContainer = ({
  goBack,
  onSubmit,
  handlePressUploadPicture,
  image,
  initialValues,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <EditChatForm
          goBack={goBack}
          onSubmit={handleSubmit}
          handlePressUploadPicture={handlePressUploadPicture}
          image={image}
        />
      )}
    </Formik>
  );
};

const EditChatModal = ({ user, chat, showEditChat, setShowEditChat }) => {
  const [editChat] = useMutation(EDIT_CHAT);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadPictureModal, setShowUploadPictureModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [showRemoveMembersModal, setShowRemoveMembersModal] = useState(false);

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
      setIsUploading(true);

      if (base64Image) {
        console.log("Uploading chat picture...");
        result = await imageService.uploadImage(chat.id, base64Image);
      }
      console.log("Editing chat...");
      const newChatImage = base64Image
        ? {
            thumbnail: result.data.thumb.url,
            original: result.data.image.url,
          }
        : {
            thumbnail: chat.image.thumbnail,
            original: chat.image.original,
          };
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

  const handlePressAddMembers = () => {
    console.log("Add members to chat!");
    setShowAddMembersModal(true);
  };

  const handlePressRemoveMembers = () => {
    console.log("Remove members from chat!");
    setShowRemoveMembersModal(true);
  };

  console.log("Is uploading:", isUploading);

  return (
    <Modal animationType="slide" visible={showEditChat}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <EditChatContainer
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
            setShowUploadPictureModal={setShowUploadPictureModal}
          />
        )}
        <View className="w-full px-4 pt-4 pb-2 flex justify-center items-start bg-white dark:bg-slate-700">
          <Pressable
            onPress={handlePressAddMembers}
            className="mb-2 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
        dark:border-slate-500 dark:bg-slate-500"
          >
            <Text className="text-lg font-bold text-slate-700 dark:text-slate-200">
              Add Members
            </Text>
          </Pressable>
        </View>
        <View className="w-full px-4 py-2 flex justify-center items-start bg-white dark:bg-slate-700">
          <Pressable
            onPress={handlePressRemoveMembers}
            className="mb-2 w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-200 bg-slate-200 rounded-xl 
        dark:border-slate-500 dark:bg-slate-500"
          >
            <Text className="text-lg font-bold text-slate-700 dark:text-slate-200">
              Remove Members
            </Text>
          </Pressable>
        </View>
        {/* Will not currently show notification without adding the component here also */}
        <NotifyMessage />
      </SafeAreaView>
      {showAddMembersModal && (
        <AddMembersModal
          user={user}
          chat={chat}
          showAddMembersModal={showAddMembersModal}
          setShowAddMembersModal={setShowAddMembersModal}
        />
      )}
      {showRemoveMembersModal && (
        <RemoveMembersModal
          user={user}
          chat={chat}
          showRemoveMembersModal={showRemoveMembersModal}
          setShowRemoveMembersModal={setShowRemoveMembersModal}
        />
      )}
      {isUploading && (
        <LoadingIconWithOverlay loadingMessage={"Editing chat..."} />
      )}
    </Modal>
  );
};

export default EditChatModal;
