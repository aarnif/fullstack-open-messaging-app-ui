import { Pressable, View, Text, Image, TextInput } from "react-native";
import baseUrl from "../../../baseUrl";

import { useState } from "react";

const ContactItem = ({ user, item, setChosenUsersIds }) => {
  const [choose, setChoose] = useState(false);

  const handlePress = () => {
    console.log("Contact pressed:", item.id);
    if (choose) {
      setChosenUsersIds((prev) => [...prev.filter((id) => id !== item.id)]);
    } else {
      setChosenUsersIds((prev) => [...prev, item.id]);
    }
    setChoose(!choose);
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="flex flex-row items-center my-2 mx-4">
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
        <View>
          {choose && <Text className="text-sm text-slate-700">Chosen</Text>}
        </View>
      </View>
    </Pressable>
  );
};

export default ContactItem;
