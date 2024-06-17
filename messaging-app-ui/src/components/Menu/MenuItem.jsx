import { View, Text } from "react-native";

const MenuItem = ({ item }) => {
  return (
    <View className="flex justify-start items-center">
      <Text className="text-2xl font-bold text-slate-200">{item.title}</Text>
    </View>
  );
};

export default MenuItem;
