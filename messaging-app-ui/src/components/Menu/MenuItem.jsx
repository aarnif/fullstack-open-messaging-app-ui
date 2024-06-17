import { View, Pressable, Text } from "react-native";

const MenuItem = ({ item }) => {
  return (
    <View
      style={{ right: item.positionFromRight }}
      className="mb-2 relative max-w-[180px] flex flex-row justify-start items-center"
    >
      <Text className="text-xl font-bold text-slate-200">{item.title}</Text>
      <Pressable>
        <View
          style={{ backgroundColor: item.backgroundColor }}
          className="ml-4 w-14 h-14 flex justify-center items-center bg-slate-400 border-2 border-slate-200 rounded-full shadow-lg"
        >
          {item.icon}
        </View>
      </Pressable>
    </View>
  );
};

export default MenuItem;
