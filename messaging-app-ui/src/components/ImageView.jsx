import { View, Image, Dimensions } from "react-native";

const windowDimensions = Dimensions.get("window");

const ImageView = ({ ImageUri }) => {
  return (
    <View className="w-full h-full flex justify-center items-center bg-black">
      <View className="flex justify-center items-center">
        <Image
          source={{ uri: ImageUri }}
          style={{
            width: windowDimensions.width - 40,
            aspectRatio: 1,
          }}
        />
      </View>
    </View>
  );
};

export default ImageView;
