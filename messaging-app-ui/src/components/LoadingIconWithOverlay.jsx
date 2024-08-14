import LoadingIcon from "./LoadingIcon";
import { Text, View } from "react-native";

const LoadingIconWithOverlay = ({ loadingMessage }) => {
  return (
    <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="absolute w-full h-full flex justify-center items-center"
    >
      <LoadingIcon />
      <Text className="text-white text-lg font-semibold">{loadingMessage}</Text>
    </View>
  );
};

export default LoadingIconWithOverlay;
