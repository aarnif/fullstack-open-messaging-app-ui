import useNotifyMessage from "../../../hooks/useNotifyMessage";
import useChangeImage from "../../../hooks/useChangeImage";
import imageService from "../../../services/imageService";
import { EDIT_PROFILE } from "../../../graphql/mutations";
import FormikFormField from "../../FormikFormField";
import UploadImageWindow from "../../UploadImageWindow";
import LoadingIconWithOverlay from "../../LoadingIconWithOverlay";
import ChangeImage from "../../ChangeImage";

import { useState } from "react";
import { useMutation } from "@apollo/client";

import { Modal, SafeAreaView, Pressable, View, Text } from "react-native";
import { Formik, useField } from "formik";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const EditProfileForm = ({
  goBack,
  onSubmit,
  handlePressUploadPicture,
  image,
}) => {
  const [nameField, nameMeta, nameHelpers] = useField("name");
  const [aboutField, aboutMeta, aboutHelpers] = useField("about");

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
          <Text className="text-xl text-white font-bold">Edit Profile</Text>
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
          imageType={"profile"}
          onPress={handlePressUploadPicture}
        />

        <FormikFormField
          name="name"
          placeholder="Enter your name..."
          value={nameField.value}
          onChangeText={(text) => nameHelpers.setValue(text)}
        ></FormikFormField>

        <FormikFormField
          name="about"
          placeholder="Enter something about yourself..."
          value={aboutField.value}
          onChangeText={(text) => aboutHelpers.setValue(text)}
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

const EditProfileModal = ({
  user,
  showEditProfileModal,
  setShowEditProfileModal,
}) => {
  const notifyMessage = useNotifyMessage();
  const [editProfile] = useMutation(EDIT_PROFILE);
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadPictureModal, setShowUploadPictureModal] = useState(false);

  const handleCloseUploadPicture = () => {
    console.log("Close edit profile picture window!");
    setShowUploadPictureModal(false);
  };

  const { image, base64Image, chooseImageFromCamera, chooseImageFromFiles } =
    useChangeImage(user.image.thumbnail, (onChange = handleCloseUploadPicture));

  const initialValues = {
    name: user.name,
    about: user.about,
  };

  const goBack = () => {
    console.log("Go back to profile page!");
    setShowEditProfileModal(false);
  };

  const handlePressUploadPicture = () => {
    console.log("Press edit profile picture button!");
    setShowUploadPictureModal(true);
  };

  const onSubmit = async (values) => {
    const { name, about } = values;
    console.log("Edit profile with following values:");
    console.log("Image:", image);
    console.log("Name:", name);
    console.log("About:", about);

    try {
      let result;
      setIsUploading(true);

      if (base64Image) {
        console.log("Uploading profile picture...");
        result = await imageService.uploadImage(user.id, base64Image);
        console.log("Result:", result);
      }

      console.log("Editing profile...");
      const newProfileImage = base64Image
        ? {
            thumbnail: result.data.thumb.url,
            original: result.data.image.url,
          }
        : {
            thumbnail: user.image.thumbnail,
            original: user.image.original,
          };
      await editProfile({
        variables: {
          name,
          about,
          input: newProfileImage,
        },
      });

      notifyMessage.show({
        content: "Edited profile successfully!",
        isError: false,
      });
      setIsUploading(false);
      setShowEditProfileModal(false);

      console.log("Edited profile successfully!");
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  console.log("Is uploading:", isUploading);

  return (
    <Modal animationType="slide" visible={showEditProfileModal}>
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
            title={"Edit Profile Picture"}
            chooseImageFromCamera={chooseImageFromCamera}
            chooseImageFromFiles={chooseImageFromFiles}
            handleClose={handleCloseUploadPicture}
            showUploadPictureModal={showUploadPictureModal}
          />
        )}
      </SafeAreaView>
      {isUploading && (
        <LoadingIconWithOverlay loadingMessage={"Editing profile..."} />
      )}
    </Modal>
  );
};

export default EditProfileModal;
