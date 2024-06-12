import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

const Header = () => {
  return (
    <View className="w-full flex justify-center items-center py-2 bg-green-600 shadow-lg">
      <View className="mt-12">
        <Text className="text-xl text-white font-bold">Messaging App</Text>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default Header;
