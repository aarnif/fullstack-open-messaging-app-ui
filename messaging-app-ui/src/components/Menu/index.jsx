import MenuButton from "./MenuButton";
import MenuItems from "./MenuItems";
import useAuthStorage from "../../hooks/useAuthStorage";

import { useApolloClient } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-native";
import { View } from "react-native";
import {
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
  animated,
} from "@react-spring/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const reactSpringAnimationDuration = 0.3;
const iconSize = 32;
const iconColor = "white";

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
      handlePress: () => console.log("Profile"),
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
      handlePress: () => console.log("Chats"),
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
      handlePress: () => console.log("Contacts"),
    },
    {
      id: "4",
      title: "Settings",
      positionFromRight: 55,
      backgroundColor: "#a855f7",
      icon: (
        <MaterialCommunityIcons name="cog" size={iconSize} color={iconColor} />
      ),
      handlePress: () => console.log("Settings"),
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
        authStorage.removeAccessToken();
        client.resetStore();
        navigate("/");
      },
    },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const springsOverlayRef = useSpringRef();
  const springsOverlay = useSpring({
    ref: springsOverlayRef,
    from: {
      translateX: !isFirstRender ? -1000 : showMenu ? -1000 : 0,
      opacity: !isFirstRender ? 0 : showMenu ? 0 : 1,
    },
    to: {
      translateX: showMenu ? 0 : -1000,
      opacity: showMenu ? 1 : 0,
    },
    immediate: isFirstRender,
  });

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const springsMenuButtonRef = useSpringRef();
  const springsMenuButton = useSpring({
    ref: springsMenuButtonRef,
    from: {
      rotate: !isFirstRender ? "0deg" : showMenu ? "0deg" : "45deg",
      backgroundColor: !isFirstRender
        ? "#16a34a"
        : showMenu
        ? "#16a34a"
        : "rgba(220, 38, 38, 0.5)",
      borderColor: !isFirstRender
        ? "#16a34a"
        : showMenu
        ? "#16a34a"
        : "#ef4444",
    },
    to: {
      rotate: showMenu ? "45deg" : "0deg",
      backgroundColor: showMenu ? "rgba(220, 38, 38, 0.5)" : "#16a34a",
      borderColor: showMenu ? "#ef4444" : "#16a34a",
    },
  });

  const transRef = useSpringRef();
  const transitions = useTransition(showMenu ? menuItemsData : [], {
    ref: transRef,
    trail: 300 / menuItemsData.length,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useChain(
    showMenu
      ? [springsOverlayRef, springsMenuButtonRef, transRef]
      : [transRef, springsMenuButtonRef, springsOverlayRef],
    [0, reactSpringAnimationDuration, reactSpringAnimationDuration * 2]
  );

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
