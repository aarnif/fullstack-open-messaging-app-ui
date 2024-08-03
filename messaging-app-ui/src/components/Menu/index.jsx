import MenuButton from "./MenuButton";
import MenuItems from "./MenuItems";
import useAuthStorage from "../../hooks/useAuthStorage";
import useMenuAnimation from "../../hooks/useMenuAnimation";

import { useApolloClient } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { View } from "react-native";
import { animated } from "@react-spring/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const iconSize = 32;
const iconColor = "white";
const menuAnimationWaitTime = 900; // Swich routes after menu animation finishes, except when signing out

const Menu = () => {
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const client = useApolloClient();

  const menuItemsData = [
    {
      id: "1",
      title: "Profile",
      positionFromRight: 210,
      backgroundColor: "#0ea5e9",
      icon: (
        <MaterialCommunityIcons
          name="account-box"
          size={iconSize}
          color={iconColor}
        />
      ),
      handlePress: () => {
        setShowMenu(false);
        setTimeout(() => {
          navigate("/profile");
        }, menuAnimationWaitTime);
      },
    },
    {
      id: "2",
      title: "Chats",
      positionFromRight: 155,
      backgroundColor: "#22c55e",
      icon: (
        <MaterialCommunityIcons
          name="chat-outline"
          size={iconSize}
          color={iconColor}
        />
      ),
      handlePress: () => {
        setShowMenu(false);
        setTimeout(() => {
          navigate("/");
        }, menuAnimationWaitTime);
      },
    },
    {
      id: "3",
      title: "Contacts",
      positionFromRight: 100,
      backgroundColor: "#f59e0b",
      icon: (
        <MaterialCommunityIcons
          name="contacts"
          size={iconSize}
          color={iconColor}
        />
      ),
      handlePress: () => {
        setShowMenu(false);
        setTimeout(() => {
          navigate("/contacts");
        }, menuAnimationWaitTime);
      },
    },
    {
      id: "4",
      title: "Settings",
      positionFromRight: 55,
      backgroundColor: "#a855f7",
      icon: (
        <MaterialCommunityIcons name="cog" size={iconSize} color={iconColor} />
      ),
      handlePress: () => {
        setShowMenu(false);
        setTimeout(() => {
          navigate("/settings");
        }, menuAnimationWaitTime);
      },
    },
    {
      id: "5",
      title: "Sign Out",
      positionFromRight: 20,
      backgroundColor: "#ef4444",
      icon: (
        <MaterialCommunityIcons
          name="logout"
          size={iconSize}
          color={iconColor}
        />
      ),
      handlePress: () => {
        console.log("Sign out!");
        setShowMenu(false);
        setTimeout(async () => {
          navigate("/signin");
          try {
            await client.resetStore();
            await authStorage.removeAccessToken();
          } catch (error) {
            console.log("Error signing out:", error.message);
          }
        }, menuAnimationWaitTime);
      },
    },
  ];

  const [
    springsOverlay,
    springsMenuButton,
    transitions,
    showMenu,
    setShowMenu,
  ] = useMenuAnimation(menuItemsData);

  return (
    <>
      <animated.View
        style={{
          flex: 1,
          position: "absolute",
          top: -100,
          left: 0,
          right: 0,
          bottom: -100,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 10,
          transform: [{ translateX: springsOverlay.translateX }],
          opacity: springsOverlay.opacity,
        }}
      ></animated.View>

      <View
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          zIndex: 10,
        }}
        className="flex justify-end items-end"
      >
        <MenuItems transitions={transitions} />
        <MenuButton
          showMenu={showMenu}
          springsMenuButton={springsMenuButton}
          handleClick={() => setShowMenu((showMenu) => !showMenu)}
        />
      </View>
    </>
  );
};

export default Menu;
