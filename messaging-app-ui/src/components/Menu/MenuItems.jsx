import MenuItem from "./MenuItem";

import { View, Text, Pressable, FlatList } from "react-native";

const items = [
  {
    id: "1",
    title: "Home",
  },
  {
    id: "2",
    title: "Profile",
  },
  {
    id: "3",
    title: "Contacts",
  },
  {
    id: "4",
    title: "Settings",
  },
  {
    id: "5",
    title: "Help",
  },
];

const MenuItems = () => {
  return (
    <FlatList
      data={items}
      renderItem={({ item, index }) => {
        return <MenuItem item={item} index={index} />;
      }}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MenuItems;
