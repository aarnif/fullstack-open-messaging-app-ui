import { useState, useEffect } from "react";

import {
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
  animated,
} from "@react-spring/native";

const reactSpringAnimationDuration = 0.3;

const useMenuAnimation = (menuItemsData) => {
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
    onRest: () => {
      console.log("Menu animation finished");
    },
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

  return [
    springsOverlay,
    springsMenuButton,
    transitions,
    showMenu,
    setShowMenu,
  ];
};

export default useMenuAnimation;
