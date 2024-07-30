import { View, Text, Image } from "react-native";

const ContactCard = ({ item }) => {
  return (
    <>
      <View className="mr-4">
        <Image
          source={{
            uri: item.image.thumbnail,
          }}
          style={{ width: 48, height: 48, borderRadius: 9999 }}
        />
      </View>
      <View className="flex-1">
        <View className="flex flex-row">
          <Text className="text-md text-slate-700 font-bold dark:text-slate-100">
            {item.name}
          </Text>
          <Text className="ml-1 text-md text-slate-500 font-bold dark:text-slate-300">
            @{item.username}
          </Text>
        </View>
        <Text className="text-sm text-slate-700 dark:text-slate-100">
          {item.about}
        </Text>
      </View>
    </>
  );
};

export default ContactCard;
