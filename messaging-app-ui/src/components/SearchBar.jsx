import { View, TextInput } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SearchBar = ({ placeholder, searchByTitle, handleChange }) => {
  return (
    <View className="mx-4 my-2">
      <View className="w-full flex-grow flex-row max-h-[50px] p-2 rounded-lg bg-slate-200 text-slate-800">
        <MaterialCommunityIcons size={24} color={"#475569"} name="magnify" />
        <TextInput
          className="w-full pl-2"
          placeholder={placeholder}
          value={searchByTitle}
          onChangeText={handleChange}
        />
      </View>
    </View>
  );
};

export default SearchBar;
