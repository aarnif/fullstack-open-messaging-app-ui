import ContactCard from "../ContactCard";

import { useNavigate } from "react-router-native";

import { View, Pressable } from "react-native";

const ContactItem = ({ user, item }) => {
  const navigate = useNavigate();

  return (
    <Pressable onPress={() => navigate(`/contacts/${item.id}`)}>
      <View className="flex flex-row items-center my-2 mx-4">
        <ContactCard user={user} item={item} />
      </View>
    </Pressable>
  );
};

export default ContactItem;
