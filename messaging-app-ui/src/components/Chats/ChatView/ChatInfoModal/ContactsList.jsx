import ContactItem from "./ContactItem";

import { FlatList } from "react-native";

const ContactsList = ({ user, data, admin }) => {
  return (
    <FlatList
      className="w-full bg-white"
      data={data}
      renderItem={({ item }) => {
        return <ContactItem user={user} item={item} admin={admin} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ContactsList;
