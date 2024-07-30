import ContactCard from "../../ContactCard";

import { View, Text } from "react-native";

const ContactItem = ({ item, admin }) => {
  console.log("Contact item:", item);
  return (
    <View className="flex flex-row items-center py-2 px-4 rounded-lg">
      <ContactCard item={item} />
      {admin.id === item.id && (
        <Text className="text-md text-slate-700 font-semibold">Admin</Text>
      )}
    </View>
  );
};

export default ContactItem;
