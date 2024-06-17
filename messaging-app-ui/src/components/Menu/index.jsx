import { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import {
  useChain,
  useSpring,
  useSpringRef,
  animated,
} from "@react-spring/native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";

const reactSpringAnimationDuration = 0.3;

const MenuButton = ({ showMenu, springsMenuButton, handleClick }) => {
  // Change icon color manually during animation because react spring does not work with it
  const [changeIconColor, setChangeIconColor] = useState("white");

  useEffect(() => {
    setTimeout(() => {
      setChangeIconColor(showMenu ? "#ef4444" : "white");
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
        <FontAwesomeIcon
          icon={faPlus}
          size={36}
          style={{ color: changeIconColor }}
        />
      </animated.View>
    </Pressable>
  );
};

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const springsOverlayRef = useSpringRef();
  const springsOverlay = useSpring({
    ref: springsOverlayRef,
    from: {
      translateX: showMenu ? -1000 : 0,
      opacity: showMenu ? 0 : 1,
    },
    to: {
      translateX: showMenu ? 0 : -1000,
      opacity: showMenu ? 1 : 0,
    },
  });

  const springsMenuButtonRef = useSpringRef();
  const springsMenuButton = useSpring({
    ref: springsMenuButtonRef,
    from: {
      rotate: showMenu ? "0deg" : "45deg",
      backgroundColor: showMenu ? "#16a34a" : "rgba(220, 38, 38, 0.5)",
      borderColor: showMenu ? "#16a34a" : "#ef4444",
    },
    to: {
      rotate: showMenu ? "45deg" : "0deg",
      backgroundColor: showMenu ? "rgba(220, 38, 38, 0.5)" : "#16a34a",
      borderColor: showMenu ? "#ef4444" : "#16a34a",
    },
  });

  useChain(
    showMenu
      ? [springsOverlayRef, springsMenuButtonRef]
      : [springsMenuButtonRef, springsOverlayRef],
    [0, reactSpringAnimationDuration]
  );

  const handleClick = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  console.log("showMenu", showMenu);

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
        <MenuButton
          showMenu={showMenu}
          springsMenuButton={springsMenuButton}
          handleClick={handleClick}
        />
      </View>
    </>
  );
};

export default Menu;
