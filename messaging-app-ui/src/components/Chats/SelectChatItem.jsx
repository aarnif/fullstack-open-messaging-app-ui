import ChatCard from "./ChatCard";

import { Pressable, View } from "react-native";

import { useColorScheme } from "nativewind";
import { useState, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SelectChatItem = ({ user, item, chosenChatIds, setChosenChatIds }) => {
  const { colorScheme } = useColorScheme();
  const [isChosen, setIsChosen] = useState(false);

  useEffect(() => {
    const checkIfUserIsChosen = chosenChatIds.includes(item.id);
    if (checkIfUserIsChosen) setIsChosen(true);
  }, []);

  const handlePress = () => {
    console.log("Contact pressed:", item.id);
    if (isChosen) {
      setChosenChatIds((prev) => [...prev.filter((id) => id !== item.id)]);
    } else {
      setChosenChatIds((prev) => [...prev, item.id]);
    }
    setIsChosen(!isChosen);
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-row items-start my-2 mx-4">
        <ChatCard user={user} chat={item} />
        {isChosen ? (
          <View className="mr-4 w-6 h-6 flex justify-center items-center border border-green-600 bg-green-600 rounded-full">
            <MaterialCommunityIcons name="check" size={20} color="white" />
          </View>
        ) : (
          <View className="mr-4 w-6 h-6 flex justify-center items-center border border-slate-300 rounded-full">
            <MaterialCommunityIcons
              name="check"
              size={20}
              color={colorScheme === "dark" ? "#334155" : "white"}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default SelectChatItem;
