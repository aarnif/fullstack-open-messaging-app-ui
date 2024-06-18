import { View, Text, Image } from "react-native";

import Constants from "expo-constants";

const ContactItem = ({ item }) => {
  // console.log("Chat item:", item);
  const imageUrl = Constants.expoConfig.extra.apolloUri;

  return (
    <View className="flex flex-row items-center my-2 mx-4">
      <View className="mr-4">
        <Image
          source={{
            uri: `${imageUrl}/images/contacts/${item.id}`,
          }}
          style={{ width: 48, height: 48, borderRadius: 9999 }}
        />
      </View>
      <View className="flex-1">
        <View className="flex flex-row">
          <Text className="text-md text-slate-700 font-bold">{item.name}</Text>
          <Text className="ml-1 text-md text-slate-500 font-bold">
            @{item.username}
          </Text>
        </View>
        <Text className="text-sm text-slate-700">{item.about}</Text>
      </View>
    </View>
  );
};

export default ContactItem;
