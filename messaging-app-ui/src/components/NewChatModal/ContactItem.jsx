import { Pressable, View, Text, Image, TextInput } from "react-native";
import baseUrl from "../../../baseUrl";

import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSpring, animated } from "@react-spring/native";

const ContactItem = ({ user, item, setChosenUsersIds }) => {
  const [choose, setChoose] = useState(false);
  const [springs, api] = useSpring(() => ({
    from: {
      scale: choose ? 0.95 : 1,
    },
  }));

  const handlePress = () => {
    console.log("Contact pressed:", item.id);
    if (choose) {
      setChosenUsersIds((prev) => [...prev.filter((id) => id !== item.id)]);
    } else {
      setChosenUsersIds((prev) => [...prev, item.id]);
    }
    setChoose(!choose);
    api.start({
      from: {
        scale: choose ? 0.95 : 1,
      },
      to: {
        scale: choose ? 1 : 0.95,
      },
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <animated.View
        style={{
          transform: [{ scale: springs.scale }],
        }}
        className="flex flex-row items-center my-2 mx-4"
      >
        <View className="mr-4">
          <Image
            source={{
              uri: `${baseUrl}/images/contacts/${item.id}`,
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

        {choose ? (
          <View className="mr-4 w-6 h-6 flex justify-center items-center border border-green-600 bg-green-600 rounded-full">
            <MaterialCommunityIcons name="check" size={20} color="white" />
          </View>
        ) : (
          <View className="mr-4 w-6 h-6 flex justify-center items-center border border-slate-300 rounded-full">
            <MaterialCommunityIcons name="check" size={20} color="white" />
          </View>
        )}
      </animated.View>
    </Pressable>
  );
};

export default ContactItem;
