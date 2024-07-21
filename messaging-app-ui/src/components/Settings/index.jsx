import useTheme from "../../hooks/useTheme";
import Menu from "../Menu";

import { useColorScheme } from "nativewind";
import { Pressable, View, Text } from "react-native";

const EnableDarkMode = () => {
  const theme = useTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const handleToggleColorScheme = () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    console.log("Setting theme to:", newTheme);
    toggleColorScheme();
    theme.setTheme(newTheme);
  };

  return (
    <View className="mx-4 py-2 px-4 flex flex-row justify-between items-center rounded-lg bg-slate-200 dark:bg-slate-600">
      <Text className="text-md font-semibold text-slate-700 dark:text-slate-100">
        Dark Mode
      </Text>
      <Pressable onPress={handleToggleColorScheme}>
        <View
          style={{
            backgroundColor: colorScheme === "dark" ? "#22c55e" : "#94a3b8",
            alignItems: colorScheme === "dark" ? "flex-end" : "flex-start",
          }}
          className="w-10 h-6 flex justify-center rounded-full bg-slate-400"
        >
          <View className="m-[1px] w-5 h-5 rounded-full bg-slate-100"></View>
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
      <Text className="text-2xl font-bold mt-4 mx-4 mb-2 dark:text-slate-200">
        Settings
      </Text>
      <EnableDarkMode />
      {user && <Menu />}
    </>
  );
};

export default Settings;
