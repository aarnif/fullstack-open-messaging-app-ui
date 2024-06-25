import { useEffect } from "react";
import { useSpring } from "@react-spring/native";

const useNewChatModalHeaderAnimation = ({
  chosenUsersIds,
  isChatTypeGroup,
  setChatType,
}) => {
  const [springs, api] = useSpring(() => ({
    from: { translateX: 0 },
  }));

  useEffect(() => {
    if (chosenUsersIds.length > 1 && !isChatTypeGroup) {
      console.log("Start header animation!");
      api.start({
        from: { translateX: -100 },
        to: { translateX: 0 },
      });
      setChatType(true);
    } else if (chosenUsersIds.length <= 1 && isChatTypeGroup) {
      console.log("Reverse header animation!");
      api.start({
        from: { translateX: 100 },
        to: { translateX: 0 },
      });
      setChatType(false);
    }
  }, [chosenUsersIds]);

  return { springs, api };
};

export default useNewChatModalHeaderAnimation;
