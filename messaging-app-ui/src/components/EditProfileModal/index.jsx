import baseUrl from "../../../baseUrl";
import FormikFormField from "../FormikFormField";

import { useState } from "react";

import {
  Modal,
  SafeAreaView,
  Pressable,
  View,
  Text,
  Image,
} from "react-native";
import { Formik, useField } from "formik";
import * as ImagePicker from "expo-image-picker";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UploadProfilePicture = ({ image, setImage }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log("Result:", result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log("Image:", image);

  return (
    <Pressable className="mb-[20px]" onPress={pickImage}>
      <Text className="text-md font-medium text-slate-700">
        PROFILE PICTURE:
      </Text>
      <View className="w-full p-2 flex justify-center items-center rounded-lg bg-slate-200 text-slate-800">
        <Image
          source={{
            uri: image,
          }}
          style={{ width: 80, height: 80, borderRadius: 9999 }}
        />
        <Text className="my-2 text-md font-semibold text-slate-700">
          Change profile picture
        </Text>
      </View>
    </Pressable>
  );
};

const EditProfileForm = ({ goBack, onSubmit, image, setImage }) => {
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
      <View className="w-full p-8 flex-grow flex flex-col bg-white">
        <UploadProfilePicture image={image} setImage={setImage} />

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
  image,
  setImage,
  initialValues,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <EditProfileForm
          goBack={goBack}
          onSubmit={handleSubmit}
          image={image}
          setImage={setImage}
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
  const [image, setImage] = useState(`${baseUrl}/images/contacts/${user.id}`);
  const initialValues = {
    name: user.name,
    about: user.about,
  };

  const goBack = () => {
    console.log("Go back to profile page!");
    setShowEditProfileModal(false);
  };

  const onSubmit = async (values) => {
    const { name, about } = values;
    console.log("Edit profile with following values:");
    console.log("Image:", image);
    console.log("Name:", name);
    console.log("About:", about);
  };

  return (
    <Modal animationType="slide" visible={showEditProfileModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <EditProfileContainer
          goBack={goBack}
          onSubmit={onSubmit}
          image={image}
          setImage={setImage}
          initialValues={initialValues}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default EditProfileModal;
