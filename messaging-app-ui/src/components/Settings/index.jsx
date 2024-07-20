import Menu from "../Menu";

import { View, Text } from "react-native";

const Settings = ({ user }) => {
  return (
    <>
      <View className="w-full flex flex-row justify-center items-center py-2 bg-green-600 shadow-lg">
        <View className="flex flex-row">
          <View className="w-[70px] flex justify-center items-center"></View>
          <View className="flex-grow flex justify-center items-center">
            <Text className="text-xl text-white font-bold">Messaging App</Text>
          </View>
          <View className="w-[70px] flex justify-center items-center"></View>
        </View>
      </View>
      <Text className="text-2xl font-bold mt-4 mx-4 mb-2">Settings</Text>

      {user && <Menu />}
    </>
  );
};

export default Settings;
