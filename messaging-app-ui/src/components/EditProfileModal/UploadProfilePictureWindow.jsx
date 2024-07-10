import { Pressable, View, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useCameraPermissions } from "expo-camera";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UploadProfilePictureWindow = ({
  image,
  setImage,
  setBase64Image,
  handleCloseUploadPicture,
}) => {
  const [permission, requestPermission] = useCameraPermissions();

  const chooseImageFromCamera = async () => {
    if (!permission.granted) {
      console.log("Request camera permission");
      const { granted } = await requestPermission();
      if (!granted) {
        console.log("Permission not granted");
        return;
      }
    }

    console.log("Permission granted");

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64);
      handleCloseUploadPicture();
    }

    requestPermission();
  };

  const chooseImageFromFiles = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64);
      handleCloseUploadPicture();
    }
  };

  console.log("Image:", image);

  return (
    <View className="bg-slate-300 shadow-lg">
      <View className="w-full flex flex-row justify-center items-center py-2">
        <View className="w-[70px] flex justify-center items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center"></View>
        </View>
        <View className="flex-grow flex justify-center items-center">
          <Text className="text-xl text-white font-bold">
            Edit Profile Picture
          </Text>
        </View>
        <View className="w-[70px] flex justify-center items-center">
          <View className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 shadow-xl">
            <Pressable onPress={handleCloseUploadPicture}>
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
      <View className="w-full p-4 flex flex-col">
        <Pressable
          onPress={chooseImageFromCamera}
          className="w-full flex-grow max-h-[60px] mb-2 p-2 flex justify-center items-center border-2 border-slate-400 bg-slate-400 rounded-xl 
                 active:scale-95 transition"
        >
          <Text className="text-xl font-bold text-slate-200">Take Photo</Text>
        </Pressable>
        <Pressable
          onPress={chooseImageFromFiles}
          className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-400 bg-slate-400 rounded-xl 
                 active:scale-95 transition"
        >
          <Text className="text-xl font-bold text-slate-200">Choose Photo</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UploadProfilePictureWindow;
