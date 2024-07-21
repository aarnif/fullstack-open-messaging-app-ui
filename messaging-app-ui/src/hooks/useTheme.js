import AsyncStorage from "@react-native-async-storage/async-storage";

const useTheme = () => {
  const getTheme = async () => {
    return await AsyncStorage.getItem("theme");
  };

  const setTheme = async (theme) => {
    await AsyncStorage.setItem("theme", theme);
  };

  return { getTheme, setTheme };
};

export default useTheme;
