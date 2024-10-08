import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { animated } from "@react-spring/native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const reactSpringAnimationDuration = 0.3;

const MenuButton = ({ showMenu, springsMenuButton, handleClick }) => {
  // Change icon color manually during animation because react spring does not work with it
  const [changeIconColor, setChangeIconColor] = useState("white");
  const [iconName, setIconName] = useState("menu");
  const [iconSize, setIconSize] = useState(40);

  useEffect(() => {
    setTimeout(() => {
      setChangeIconColor(showMenu ? "#ef4444" : "white");
      setIconName(showMenu ? "plus" : "menu");
      setIconSize(showMenu ? 50 : 40);
    }, reactSpringAnimationDuration * 1000);
  }, [showMenu]);

  return (
    <Pressable onPress={handleClick}>
      <animated.View
        style={{
          transform: [{ rotate: springsMenuButton.rotate }],
          backgroundColor: springsMenuButton.backgroundColor,
          borderColor: springsMenuButton.borderColor,
        }}
        className="w-14 h-14 rounded-full flex justify-center items-center border-2"
      >
        <MaterialCommunityIcons
          name={iconName}
          size={iconSize}
          color={changeIconColor}
        />
      </animated.View>
    </Pressable>
  );
};

export default MenuButton;
