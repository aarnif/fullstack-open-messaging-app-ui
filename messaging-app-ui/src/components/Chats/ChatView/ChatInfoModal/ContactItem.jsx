import { View, Text, Image } from "react-native";

const ContactItem = ({ user, item, admin }) => {
  console.log("Contact item:", item);
  return (
    <View className="flex flex-row items-center py-2 px-4 rounded-lg">
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
          <Text className="text-md text-slate-700 font-bold dark:text-slate-100">
            {item.id === user.id ? "You" : item.name}
          </Text>
          <Text className="ml-1 text-md text-slate-500 font-bold dark:text-slate-300">
            @{item.username}
          </Text>
        </View>
        <Text className="text-sm text-slate-700 dark:text-slate-100">
          {item.about}
        </Text>
      </View>
      {admin.id === item.id && (
        <Text className="text-md text-slate-700 font-semibold">Admin</Text>
      )}
    </View>
  );
};

export default ContactItem;
