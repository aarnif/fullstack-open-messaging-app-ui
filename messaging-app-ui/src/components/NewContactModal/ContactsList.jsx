import ContactItem from "./ContactItem";

import { View, Text, FlatList } from "react-native";

const ContactsList = ({ user, data, chosenUsersIds, setChosenUsersIds }) => {
  if (!data.length) {
    return (
      <View className="flex-1 justify-start items-center bg-white dark:bg-slate-700">
        <Text className="mt-8 text-2xl font-bold text-slate-200">
          No contacts found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      className="w-full bg-white dark:bg-slate-700"
      data={data}
      renderItem={({ item }) => {
        return (
          <ContactItem
            item={item}
            chosenUsersIds={chosenUsersIds}
            setChosenUsersIds={setChosenUsersIds}
          />
        );
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default ContactsList;
