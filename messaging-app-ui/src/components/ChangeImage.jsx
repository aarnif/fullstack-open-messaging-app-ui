import { Pressable, View, Text, Image } from "react-native";

const ChangeImage = ({ currentImage, imageType, onPress }) => {
  return (
    <Pressable className="mb-[20px]" onPress={onPress}>
      <Text className="text-md font-medium text-slate-700 dark:text-slate-200">
        {imageType.toUpperCase()} IMAGE:
      </Text>
      <View className="w-full p-2 flex justify-center items-center rounded-lg bg-slate-200 dark:bg-slate-600">
        <Image
          source={{
            uri: currentImage,
          }}
          style={{ width: 80, height: 80, borderRadius: 9999 }}
        />
        <Text className="my-2 text-md font-semibold text-slate-700 dark:text-slate-100">
          Change {imageType} image
        </Text>
      </View>
    </Pressable>
  );
};

export default ChangeImage;
