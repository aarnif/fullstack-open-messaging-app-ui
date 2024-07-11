import { Pressable, View, Text } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UploadChatPictureWindow = ({
  chooseImageFromCamera,
  chooseImageFromFiles,
  handleCloseUploadPicture,
}) => {
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

export default UploadChatPictureWindow;
