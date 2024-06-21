import { View, Text, Pressable } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Header = ({ user }) => {
  const handlePress = () => {
    console.log("Plus icon pressed!");
  };

  return (
    <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
      <View className="flex flex-row">
        <View className="flex-grow w-[100px] flex justify-center items-center"></View>
        <View className="flex-grow flex justify-center items-center">
          <Text className="text-xl text-white font-bold">Messaging App</Text>
        </View>
        <View className="flex-grow w-[100px] flex justify-center items-center">
          {user && (
            <Pressable onPress={handlePress}>
              <View className="w-8 h-8 rounded-full flex justify-center items-center bg-green-700 shadow-xl">
                <MaterialCommunityIcons
                  name={"plus"}
                  size={24}
                  color={"white"}
                />
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default Header;
