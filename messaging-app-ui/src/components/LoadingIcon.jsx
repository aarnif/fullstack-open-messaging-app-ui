import { useSpring, animated } from "@react-spring/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const LoadingIcon = () => {
  const springs = useSpring({
    from: { rotate: "0deg" },
    to: { rotate: "360deg" },
    loop: true,
    config: { duration: 500 },
  });

  const iconSize = 50;

  return (
    <animated.View
      style={{
        transform: [{ rotate: springs.rotate }],
      }}
      className="mt-8 relative"
    >
      <MaterialCommunityIcons
        name="circle-outline"
        size={iconSize}
        color="#16a34a"
        style={{ position: "absolute" }}
      />
      <MaterialCommunityIcons name="loading" size={iconSize} color="#4ade80" />
    </animated.View>
  );
};

export default LoadingIcon;
