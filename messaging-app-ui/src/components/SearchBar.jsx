import { View, Text, TextInput } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ placeholder, searchByTitle, handleChange }) => {
  return (
    <View className="mx-4 my-2">
      <View className="w-full flex-grow flex-row max-h-[50px] p-2 rounded-lg bg-slate-200 text-slate-800">
        <FontAwesomeIcon color={"#475569"} icon={faMagnifyingGlass} />
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
