import MenuItems from "./MenuItems";

import { useState } from "react";
import { View, Pressable } from "react-native";
import { useSpring, animated } from "@react-spring/native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const MenuButton = ({ showMenu, setShowMenu, overlayAnimation }) => {
  const [springs, api] = useSpring(() => ({
    from: {
      rotate: !showMenu ? "0deg" : "45deg",
      backgroundColor: !showMenu ? "#16a34a" : "rgba(220, 38, 38, 0.4)",
    },
  }));

  const handleClick = () => {
    console.log("Menu button clicked");
    setShowMenu(!showMenu);
    overlayAnimation();
    api.start({
      from: {
        rotate: !showMenu ? "0deg" : "45deg",
        backgroundColor: !showMenu ? "#16a34a" : "rgba(220, 38, 38, 0.4)",
      },
      to: {
        rotate: !showMenu ? "45deg" : "0deg",
        backgroundColor: !showMenu ? "rgba(220, 38, 38, 0.4)" : "#16a34a",
      },
      config: { duration: 300 },
    });
  };

  return (
    <Pressable onPress={handleClick}>
      <animated.View
        style={{
          transform: [{ rotate: springs.rotate }],
          backgroundColor: springs.backgroundColor,
          borderColor: !showMenu ? "#16a34a" : "#ef4444",
        }}
        className="w-14 h-14 rounded-full flex justify-center items-center border-2"
      >
        <MaterialCommunityIcons
          name="plus"
          size={50}
          color={!showMenu ? "white" : "#ef4444"}
        />
      </animated.View>
    </Pressable>
  );
};

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const [springs, api] = useSpring(() => ({
    from: {
      translateX: showMenu ? 0 : -1000,
      opacity: showMenu ? 1 : 0,
    },
  }));

  const overlayAnimation = () => {
    console.log("Overlay clicked");
    api.start({
      from: {
        translateX: showMenu ? 0 : -1000,
        opacity: showMenu ? 1 : 0,
      },
      to: {
        translateX: showMenu ? -1000 : 0,
        opacity: showMenu ? 0 : 1,
      },
      config: { duration: 300 },
    });
  };

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
          transform: [{ translateX: springs.translateX }],
          opacity: springs.opacity,
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
        {showMenu && <MenuItems />}
        <MenuButton
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          overlayAnimation={overlayAnimation}
        />
      </View>
    </>
  );
};

export default Menu;
