import { View, Text, TextInput } from "react-native";

const SearchBar = ({ searchByTitle, handleChange }) => {
  return (
    <View className="mx-4 my-2">
      <TextInput
        className="w-full flex-grow max-h-[50px] p-2 border rounded-lg bg-slate-200 text-slate-800"
        placeholder="Search by title"
        value={searchByTitle}
        onChangeText={handleChange}
      />
    </View>
  );
};

export default SearchBar;
