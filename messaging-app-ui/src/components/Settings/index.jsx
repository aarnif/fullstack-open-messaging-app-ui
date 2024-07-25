import useThemeStorage from "../../hooks/useThemeStorage";
import Menu from "../Menu";
import { EDIT_SETTINGS } from "../../graphql/mutations";

import { useState, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { Pressable, View, Text } from "react-native";
import { useMutation } from "@apollo/client";

const EnableDarkMode = ({ theme, setTheme }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const handleToggleColorScheme = () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    console.log("Setting theme to:", newTheme);
    toggleColorScheme();
    setTheme(newTheme);
  };

  return (
    <View className="mt-4 mx-4 py-2 px-4 flex flex-row justify-between items-center rounded-lg bg-slate-200 dark:bg-slate-600">
      <Text className="text-md font-semibold text-slate-700 dark:text-slate-100">
        {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </Text>
      <Pressable onPress={handleToggleColorScheme}>
        <View
          style={{
            backgroundColor: theme === "dark" ? "#22c55e" : "#94a3b8",
            alignItems: theme === "dark" ? "flex-end" : "flex-start",
          }}
          className="w-10 h-6 flex justify-center rounded-full bg-slate-400"
        >
          <View className="m-[1px] w-5 h-5 rounded-full bg-slate-100"></View>
        </View>
      </Pressable>
    </View>
  );
};

const ChangeClockFormat = ({ time, setTime }) => {
  return (
    <View className="mt-4 mx-4 py-2 px-4 flex flex-row justify-between items-center rounded-lg bg-slate-200 dark:bg-slate-600">
      <Text className="text-md font-semibold text-slate-700 dark:text-slate-100">
        24-Hour Clock
      </Text>
      <Pressable
        onPress={() =>
          setTime((prevState) => (prevState === "12h" ? "24h" : "12h"))
        }
      >
        <View
          style={{
            backgroundColor: time === "12h" ? "#94a3b8" : "#22c55e",
            alignItems: time === "12h" ? "flex-start" : "flex-end",
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
  const themeStorage = useThemeStorage();
  const [theme, setTheme] = useState(user.settings.theme);
  const [time, setTime] = useState(user.settings.time);
  const [mutate] = useMutation(EDIT_SETTINGS);

  console.log("User settings:", theme, time);

  useEffect(() => {
    const updateUserSettings = async () => {
      if (theme === user.settings.theme && time === user.settings.time) {
        return;
      }
      const updatedSettings = {
        theme: theme,
        time: time,
      };
      console.log("Updating user settings:", updatedSettings);
      await mutate({
        variables: updatedSettings,
      });
      themeStorage.setTheme(theme);
    };
    updateUserSettings();
  }, [theme, time]);

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
      <EnableDarkMode theme={theme} setTheme={setTheme} />
      <ChangeClockFormat time={time} setTime={setTime} />
      {user && <Menu />}
    </>
  );
};

export default Settings;
