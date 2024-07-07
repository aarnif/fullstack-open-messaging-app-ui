import { Pressable, View, Text, Image, TextInput } from "react-native";
import baseUrl from "../../../../../baseUrl";

import { useState, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ContactItem = ({ user, item, chosenUsersIds, setChosenUsersIds }) => {
  const [isChosen, setIsChosen] = useState(false);

  useEffect(() => {
    const checkIfUserIsChosen = chosenUsersIds.includes(item.id);
    if (checkIfUserIsChosen) setIsChosen(true);
  }, []);

  const handlePress = () => {
    console.log("Contact pressed:", item.id);
    if (isChosen) {
      setChosenUsersIds((prev) => [...prev.filter((id) => id !== item.id)]);
    } else {
      setChosenUsersIds((prev) => [...prev, item.id]);
    }
    setIsChosen(!isChosen);
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-row items-center py-2 px-4 rounded-lg">
        <View className="mr-4">
          <Image
            source={{
              uri: item.profilePicture,
            }}
            style={{ width: 48, height: 48, borderRadius: 9999 }}
          />
        </View>
        <View className="flex-1">
          <View className="flex flex-row">
            <Text className="text-md text-slate-700 font-bold">
              {item.name}
            </Text>
            <Text className="ml-1 text-md text-slate-500 font-bold">
              @{item.username}
            </Text>
          </View>
          <Text className="text-sm text-slate-700">{item.about}</Text>
        </View>

        {isChosen ? (
          <View className="mr-4 w-6 h-6 flex justify-center items-center border border-green-600 bg-green-600 rounded-full">
            <MaterialCommunityIcons name="check" size={20} color="white" />
          </View>
        ) : (
          <View className="mr-4 w-6 h-6 flex justify-center items-center border border-slate-300 rounded-full">
            <MaterialCommunityIcons name="check" size={20} color="white" />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ContactItem;
