import { Modal, SafeAreaView, Pressable, View, Text } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UploadImageWindow = ({
  title = "",
  chooseImageFromCamera,
  chooseImageFromFiles,
  handleClose,
  showUploadPictureModal,
}) => {
  return (
    <Modal
      animationType="slide"
      className="bg-slate-300 shadow-lg dark:bg-slate-600"
      visible={showUploadPictureModal}
      transparent={true}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View
          style={{ height: "25%", marginTop: "auto" }}
          className="w-full flex justify-center items-center py-2 bg-slate-300"
        >
          <View className="w-full flex flex-row justify-center items-center py-2 bg-slate-300">
            <View className="w-[70px] flex justify-center items-center">
              <View className="w-8 h-8 rounded-full flex justify-center items-center"></View>
            </View>

            <View className="flex-grow flex justify-center items-center">
              <Text className="text-xl text-white font-bold">{title}</Text>
            </View>

            <View className="w-[70px] flex justify-center items-center">
              <View className="w-8 h-8 rounded-full flex justify-center items-center bg-slate-400 shadow-xl dark:bg-slate-500">
                <Pressable onPress={handleClose}>
                  <MaterialCommunityIcons
                    name="close"
                    size={24}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
          </View>
          <View className="w-full p-4 flex flex-col">
            <Pressable
              onPress={chooseImageFromCamera}
              className="w-full flex-grow max-h-[60px] mb-2 p-2 flex justify-center items-center border-2 border-slate-400 bg-slate-400 rounded-xl 
                 active:scale-95 transition dark:bg-slate-500"
            >
              <Text className="text-xl font-bold text-slate-200">
                Take Photo
              </Text>
            </Pressable>
            <Pressable
              onPress={chooseImageFromFiles}
              className="w-full flex-grow max-h-[60px] p-2 flex justify-center items-center border-2 border-slate-400 bg-slate-400 rounded-xl 
                 active:scale-95 transition dark:bg-slate-500"
            >
              <Text className="text-xl font-bold text-slate-200">
                Choose Photo
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default UploadImageWindow;
