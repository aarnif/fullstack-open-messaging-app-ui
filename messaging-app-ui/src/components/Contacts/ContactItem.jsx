import { View, Text, Image, Pressable } from "react-native";
import baseUrl from "../../../baseUrl";

const ContactItem = ({ item, handleShowContactInfoModal }) => {
  return (
    <Pressable onPress={() => handleShowContactInfoModal(item.id)}>
      <View className="flex flex-row items-center my-2 mx-4">
        <View className="mr-4">
          <Image
            source={{
              uri: item.profilePicture.thumbnail,
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
      </View>
    </Pressable>
  );
};

export default ContactItem;
