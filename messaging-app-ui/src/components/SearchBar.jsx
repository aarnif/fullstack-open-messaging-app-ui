import { useColorScheme } from "nativewind";
import { View, TextInput } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SearchBar = ({ placeholder, searchByTitle, handleChange }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View className="mx-4 my-2">
      <View
        className="w-full flex-grow flex-row max-h-[50px] p-2 rounded-lg bg-slate-200 text-slate-800
       dark:bg-slate-600 dark:text-slate-100"
      >
        <MaterialCommunityIcons
          size={24}
          color={colorScheme === "dark" ? "white" : "#475569"}
          name="magnify"
        />
        <TextInput
          className="w-full pl-2 dark:text-slate-100"
          placeholder={placeholder}
          placeholderTextColor={colorScheme === "dark" ? "white" : "#475569"}
          value={searchByTitle}
          onChangeText={handleChange}
        />
      </View>
    </View>
  );
};

export default SearchBar;
