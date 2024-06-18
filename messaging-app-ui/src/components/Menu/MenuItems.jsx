import MenuItem from "./MenuItem";

import { animated } from "@react-spring/native";

const MenuItems = ({ transitions }) => {
  return transitions((style, item) => (
    <animated.View style={style}>
      <MenuItem item={item} />
    </animated.View>
  ));
};

export default MenuItems;
