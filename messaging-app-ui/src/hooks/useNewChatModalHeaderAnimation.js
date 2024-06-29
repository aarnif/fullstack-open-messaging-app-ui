import { useEffect } from "react";
import { useSpring, useTransition } from "@react-spring/native";

const useNewChatModalHeaderAnimation = ({
  chosenUsersIds,
  isChatTypeGroup,
  setChatType,
}) => {
  const [springsHeader, apiHeader] = useSpring(() => ({
    from: { translateX: 0 },
  }));

  const [springsTextInput, apiTextInput] = useSpring(() => ({
    from: { opacity: 0, display: "none", translateY: 20 },
  }));

  useEffect(() => {
    if (chosenUsersIds.length > 1 && !isChatTypeGroup) {
      console.log("Start header animation!");
      apiHeader.start({
        from: { translateX: -100 },
        to: { translateX: 0 },
      });
      apiTextInput.start({
        from: { opacity: 0, display: "none", translateY: 20 },
        to: { opacity: 1, display: "flex", translateY: 0 },
      });
      setChatType(true);
    } else if (chosenUsersIds.length <= 1 && isChatTypeGroup) {
      console.log("Reverse header animation!");
      apiHeader.start({
        from: { translateX: 100 },
        to: { translateX: 0 },
      });
      apiTextInput.start({
        from: { opacity: 1, display: "flex", translateY: 0 },
        to: { opacity: 0, display: "none", translateY: 20 },
      });
      setChatType(false);
    }
  }, [chosenUsersIds]);

  return { springsHeader, springsTextInput };
};

export default useNewChatModalHeaderAnimation;
