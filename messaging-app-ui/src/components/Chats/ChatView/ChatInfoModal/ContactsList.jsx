import ContactItem from "./ContactItem";

import { FlatList } from "react-native";

const ContactsList = ({ data, admin }) => {
  return (
    <FlatList
      className="w-full bg-white dark:bg-slate-700"
      data={data}
      renderItem={({ item }) => {
        return <ContactItem item={item} admin={admin} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ContactsList;
