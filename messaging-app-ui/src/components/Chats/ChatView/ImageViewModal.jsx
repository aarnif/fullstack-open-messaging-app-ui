import helpers from "../../../utils/helpers";
import useDownloadImage from "../../../hooks/useDownloadImage";
import LoadingIcon from "../../LoadingIcon";

import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  Pressable,
  View,
  Text,
  Image,
  Dimensions,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const ImageViewModal = ({
  chosenMessage,
  showImageViewModal,
  setShowImageViewModal,
}) => {
  const [fullScreen, setFullScreen] = useState(false);
  const { saveFile, loading } = useDownloadImage(chosenMessage.image.original);

  const handleDownloadImage = async () => {
    console.log("Download image pressed.");
    await saveFile();
    setShowImageViewModal(false);
  };

  return (
    <Modal animationType="slide" visible={showImageViewModal}>
      <SafeAreaView style={{ flex: 1 }} className="bg-green-600">
        <Pressable onPress={() => setFullScreen(!fullScreen)}>
          {!fullScreen && (
            <View className="absolute z-10 w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
              <View className="flex flex-row">
                <View className="w-[50px] mr-4 flex-grow flex justify-center items-center">
                  <Pressable onPress={() => setShowImageViewModal(false)}>
                    <MaterialCommunityIcons
                      name={"chevron-left"}
                      size={36}
                      color={"white"}
                    />
                  </Pressable>
                </View>
                <Pressable>
                  <View className="max-w-[250px] flex-grow flex justify-center items-center">
                    <Text className="text-base text-white font-bold">
                      {chosenMessage.sender.name}
                    </Text>
                    <Text className="text-sm text-white">
                      {helpers.formatMessageTime(chosenMessage.createdAt)}
                    </Text>
                  </View>
                </Pressable>
                <View className="w-[50px] ml-4 flex-grow flex justify-center items-center">
                  <Pressable onPress={handleDownloadImage}>
                    <MaterialCommunityIcons
                      name={"download"}
                      size={30}
                      color={"white"}
                    />
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          <View className="w-full h-full flex justify-center items-center bg-black">
            <View className="flex justify-center items-center">
              <Image
                source={{ uri: chosenMessage.image.original }}
                style={{
                  width: windowDimensions.width - 40,
                  aspectRatio: 1,
                }}
              />
            </View>
          </View>
        </Pressable>
        {loading && (
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
            className="absolute w-full h-full flex justify-center items-center"
          >
            <LoadingIcon />
            <Text className="text-white text-lg font-semibold">
              Saving image...
            </Text>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default ImageViewModal;
