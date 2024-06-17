import MenuItem from "./MenuItem";

import { animated } from "@react-spring/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const iconSize = 32;

export const items = [
  {
    id: "1",
    title: "Profile",
    positionFromRight: 160,
    backgroundColor: "#0ea5e9",
    icon: (
      <MaterialCommunityIcons
        name="account-box"
        size={iconSize}
        color={"white"}
      />
    ),
  },
  {
    id: "2",
    title: "Chats",
    positionFromRight: 105,
    backgroundColor: "#22c55e",
    icon: (
      <MaterialCommunityIcons
        name="chat-outline"
        size={iconSize}
        color={"white"}
      />
    ),
  },
  {
    id: "3",
    title: "Contacts",
    positionFromRight: 60,
    backgroundColor: "#f59e0b",
    icon: (
      <MaterialCommunityIcons name="contacts" size={iconSize} color={"white"} />
    ),
  },
  {
    id: "4",
    title: "Settings",
    positionFromRight: 25,
    backgroundColor: "#ef4444",
    icon: <MaterialCommunityIcons name="cog" size={iconSize} color={"white"} />,
  },
];

const MenuItems = ({ transitions }) => {
  return transitions((style, item) => (
    <animated.View style={style}>
      <MenuItem item={item} />
    </animated.View>
  ));
};

export default MenuItems;
