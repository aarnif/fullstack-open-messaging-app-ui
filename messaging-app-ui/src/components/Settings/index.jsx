import Menu from "../Menu";

import { useColorScheme } from "nativewind";
import { Pressable, View, Text } from "react-native";

const EnableDarkMode = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="mx-4 p-2 flex flex-row justify-between items-center rounded-lg bg-slate-200">
      <Text className="text-md font-semibold text-slate-700">Dark Mode</Text>
      <Pressable onPress={toggleColorScheme}>
        <View
          style={{
            backgroundColor: colorScheme === "dark" ? "#22c55e" : "#94a3b8",
            alignItems: colorScheme === "dark" ? "flex-end" : "flex-start",
          }}
          className="w-16 h-9 flex justify-center rounded-full bg-slate-400"
        >
          <View className="m-[1px] w-8 h-8 rounded-full bg-slate-100"></View>
        </View>
      </Pressable>
    </View>
  );
};

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
      <EnableDarkMode />
      {user && <Menu />}
    </>
  );
};

export default Settings;
