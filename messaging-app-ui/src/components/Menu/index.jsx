import MenuButton from "./MenuButton";
import { items } from "./MenuItems";
import MenuItems from "./MenuItems";

import { useState, useEffect } from "react";
import { View } from "react-native";
import {
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
  animated,
} from "@react-spring/native";

const reactSpringAnimationDuration = 0.3;

const Menu = () => {
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

  console.log("First render: ", isFirstRender);

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
  const transitions = useTransition(showMenu ? items : [], {
    ref: transRef,
    trail: 300 / items.length,
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

  const handleClick = () => {
    setShowMenu((showMenu) => !showMenu);
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
          handleClick={handleClick}
        />
      </View>
    </>
  );
};

export default Menu;
